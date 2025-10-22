// Modern AI Chatbot - Main Server
require('dotenv').config();

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const winston = require('winston');

const { OpenAI } = require('openai');

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'ai-chatbot' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "ws:", "wss:"]
    }
  }
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});

app.use('/api/', limiter);

// Serve static files
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Store active connections and conversation history
const activeConnections = new Map();
const conversationHistory = new Map();

// AI Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationId, userId } = req.body;
    
    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    logger.info('Chat request received', { userId, conversationId, message: message.substring(0, 50) });

    // Get or create conversation history
    const historyKey = `${userId}_${conversationId}`;
    let history = conversationHistory.get(historyKey) || [];
    
    // Add user message to history
    history.push({ role: 'user', content: message });
    
    // Prepare messages for OpenAI API
    const messages = [
      {
        role: 'system',
        content: `You are a helpful, friendly, and knowledgeable AI assistant. You provide accurate, helpful responses while being conversational and engaging. You can discuss a wide range of topics including technology, science, literature, current events, and more. Always be respectful and professional.`
      },
      ...history.slice(-10) // Keep last 10 messages for context
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;
    
    // Add AI response to history
    history.push({ role: 'assistant', content: aiResponse });
    conversationHistory.set(historyKey, history);

    // Log successful response
    logger.info('AI response generated', { 
      userId, 
      conversationId, 
      responseLength: aiResponse.length 
    });

    res.json({ 
      response: aiResponse,
      conversationId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Error in chat endpoint', { error: error.message, stack: error.stack });
    
    if (error.code === 'insufficient_quota') {
      res.status(429).json({ error: 'API quota exceeded. Please try again later.' });
    } else if (error.code === 'rate_limit_exceeded') {
      res.status(429).json({ error: 'Rate limit exceeded. Please wait a moment.' });
    } else {
      res.status(500).json({ error: 'Internal server error. Please try again.' });
    }
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    activeConnections: activeConnections.size,
    uptime: process.uptime()
  });
});

// Conversation history endpoint
app.get('/api/conversations/:userId/:conversationId', (req, res) => {
  const { userId, conversationId } = req.params;
  const historyKey = `${userId}_${conversationId}`;
  const history = conversationHistory.get(historyKey) || [];
  
  res.json({ 
    conversationId,
    messages: history,
    messageCount: history.length
  });
});

// Clear conversation endpoint
app.delete('/api/conversations/:userId/:conversationId', (req, res) => {
  const { userId, conversationId } = req.params;
  const historyKey = `${userId}_${conversationId}`;
  conversationHistory.delete(historyKey);
  
  logger.info('Conversation cleared', { userId, conversationId });
  res.json({ message: 'Conversation cleared successfully' });
});

// Socket.IO real-time communication
io.on('connection', (socket) => {
  logger.info('New socket connection', { socketId: socket.id });
  
  // Store connection
  activeConnections.set(socket.id, {
    socketId: socket.id,
    connectedAt: new Date(),
    userId: null
  });

  // Handle user identification
  socket.on('identify', (userData) => {
    const connection = activeConnections.get(socket.id);
    if (connection) {
      connection.userId = userData.userId;
      connection.username = userData.username;
      activeConnections.set(socket.id, connection);
      logger.info('User identified', { socketId: socket.id, userId: userData.userId });
    }
  });

  // Handle typing indicators
  socket.on('typing', (data) => {
    socket.broadcast.emit('user-typing', {
      userId: data.userId,
      username: data.username,
      isTyping: data.isTyping
    });
  });

  // Handle real-time chat messages
  socket.on('send-message', async (data) => {
    try {
      const { message, userId, conversationId, username } = data;
      
      // Broadcast user message to all connected clients
      io.emit('new-message', {
        message,
        sender: 'user',
        userId,
        username,
        timestamp: new Date().toISOString(),
        conversationId
      });

      // Generate AI response (similar to REST endpoint)
      const historyKey = `${userId}_${conversationId}`;
      let history = conversationHistory.get(historyKey) || [];
      history.push({ role: 'user', content: message });

      const messages = [
        {
          role: 'system',
          content: 'You are a helpful AI assistant in a real-time chat environment. Be concise but helpful.'
        },
        ...history.slice(-8)
      ];

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 300,
        temperature: 0.7,
      });

      const aiResponse = completion.choices[0].message.content;
      history.push({ role: 'assistant', content: aiResponse });
      conversationHistory.set(historyKey, history);

      // Broadcast AI response
      io.emit('new-message', {
        message: aiResponse,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        conversationId
      });

    } catch (error) {
      logger.error('Error in socket message handling', { error: error.message });
      socket.emit('error', { message: 'Failed to process message' });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const connection = activeConnections.get(socket.id);
    if (connection) {
      logger.info('Socket disconnected', { 
        socketId: socket.id, 
        userId: connection.userId,
        connectedDuration: Date.now() - connection.connectedAt.getTime()
      });
    }
    activeConnections.delete(socket.id);
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  logger.error('Unhandled error', { error: error.message, stack: error.stack });
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  logger.info(`Modern AI Chatbot server running on port ${PORT}`);
  logger.info('Environment:', {
    nodeEnv: process.env.NODE_ENV || 'development',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

module.exports = app;
