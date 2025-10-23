// Vercel Serverless Function for DeepSeek Chat API
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Build messages array with conversation history
    const messages = [
      {
        role: 'system',
        content: 'You are a helpful AI assistant. Provide clear, concise, and accurate responses.'
      },
      ...conversationHistory,
      {
        role: 'user',
        content: message
      }
    ];

    // Make request to DeepSeek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`DeepSeek API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    // Return the response
    return res.status(200).json({
      success: true,
      reply: reply,
      usage: data.usage
    });

  } catch (error) {
    console.error('DeepSeek API Error:', error);
    return res.status(500).json({
      error: 'Failed to process chat request',
      details: error.message
    });
  }
}
