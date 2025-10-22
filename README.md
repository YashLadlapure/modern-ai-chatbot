# Modern AI Chatbot Platform

A comprehensive, production-ready AI chatbot platform featuring modern UI/UX, full-stack architecture, containerized deployment, and extensive customization options. Built with best practices and designed to be completely free and open-source.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## ✨ Key Features

### 🎨 User Interface
- **Dark Mode Support**: Elegant dark/light theme toggle with system preference detection
- **Syntax Highlighting**: Code blocks with syntax highlighting for multiple programming languages
- **Mobile Responsiveness**: Fully responsive design that works seamlessly on all devices
- **Modern UI Components**: Clean, intuitive interface with smooth animations and transitions

### 🏗️ Architecture
- **Frontend/Backend Separation**: Clean separation of concerns with RESTful API
- **Scalable Design**: Microservices-ready architecture
- **Real-time Communication**: WebSocket support for instant messaging
- **State Management**: Efficient state handling and data flow

### 🐳 Deployment & DevOps
- **Docker Support**: Complete containerization with Docker and Docker Compose
- **Easy Setup**: One-command deployment for local development
- **CI/CD Ready**: Configuration templates for continuous integration/deployment
- **Environment Configuration**: Flexible environment-based configuration

### 🤖 AI & Integration
- **Multiple AI Provider Support**: Compatible with OpenAI, Anthropic, Google AI, and more
- **API Integration**: RESTful API for easy integration with external services
- **Webhook Support**: Real-time event notifications
- **Plugin System**: Extensible architecture for custom functionality

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized deployment)
- An API key from your preferred AI provider (OpenAI, Anthropic, etc.)

### Quick Start

1. Clone the repository:
```bash
git clone https://github.com/YashLadlapure/modern-ai-chatbot.git
cd modern-ai-chatbot
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Docker Build

```bash
# Build the image
docker build -t modern-ai-chatbot .

# Run the container
docker run -p 3000:3000 -e API_KEY=your_key modern-ai-chatbot
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Application
NODE_ENV=development
PORT=3000

# AI Provider Configuration
AI_PROVIDER=openai # Options: openai, anthropic, google
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
GOOGLE_AI_KEY=your_google_key

# Database (if applicable)
DATABASE_URL=postgresql://user:password@localhost:5432/chatbot

# Redis (for session management)
REDIS_URL=redis://localhost:6379

# Security
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:3000
```

### Theme Customization

Modify `src/styles/theme.js` to customize colors, fonts, and UI elements:

```javascript
export const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    dark: '#1a1a1a',
    light: '#ffffff'
  },
  fonts: {
    main: 'Inter, sans-serif',
    code: 'Fira Code, monospace'
  }
};
```

## 📖 Usage

### Basic Chat Interface

```javascript
import { ChatInterface } from './components/ChatInterface';

function App() {
  return (
    <ChatInterface 
      theme="dark"
      aiProvider="openai"
      enableSyntaxHighlighting={true}
    />
  );
}
```

### API Integration

```javascript
// Send a message
const response = await fetch('http://localhost:3000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Hello, chatbot!',
    conversationId: 'unique-id'
  })
});

const data = await response.json();
console.log(data.reply);
```

## 🔌 API Documentation

### Endpoints

#### POST /api/chat
Send a message to the chatbot

**Request Body:**
```json
{
  "message": "Your message here",
  "conversationId": "optional-conversation-id",
  "context": {}
}
```

**Response:**
```json
{
  "reply": "Chatbot response",
  "conversationId": "conversation-id",
  "timestamp": "2025-10-22T16:51:00Z"
}
```

#### GET /api/conversations/:id
Retrieve conversation history

#### DELETE /api/conversations/:id
Delete a conversation

## 🏗️ Project Structure

```
modern-ai-chatbot/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatInterface.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   └── CodeBlock.jsx
│   │   ├── styles/
│   │   │   ├── theme.js
│   │   │   └── global.css
│   │   ├── utils/
│   │   └── App.jsx
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   │   └── aiProvider.js
│   │   ├── middleware/
│   │   └── server.js
│   └── package.json
├── docker/
│   ├── Dockerfile.frontend
│   └── Dockerfile.backend
├── docker-compose.yml
├── .env.example
├── .gitignore
├── LICENSE
├── CONTRIBUTING.md
└── README.md
```

## 🤝 Contributing

We welcome contributions from the community! This project is completely open-source and free to use.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

For detailed contribution guidelines, please read [CONTRIBUTING.md](CONTRIBUTING.md).

### Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please be respectful and professional in all interactions.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**What this means:**
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❌ Liability and warranty not provided

## 🌟 Features Roadmap

- [ ] Voice input/output support
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Custom AI model training
- [ ] Enhanced security features
- [ ] Mobile app (React Native)
- [ ] Browser extension

## 🛠️ Tech Stack

### Frontend
- React 18+
- TypeScript
- Tailwind CSS
- Vite
- WebSocket client

### Backend
- Node.js
- Express.js
- WebSocket (ws)
- PostgreSQL
- Redis

### DevOps
- Docker
- Docker Compose
- GitHub Actions

## 📚 Documentation

For more detailed documentation:

- [API Reference](docs/api-reference.md)
- [Deployment Guide](docs/deployment.md)
- [Customization Guide](docs/customization.md)
- [Troubleshooting](docs/troubleshooting.md)

## 💬 Support

- **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/YashLadlapure/modern-ai-chatbot/issues)
- **Discussions**: Join community discussions on [GitHub Discussions](https://github.com/YashLadlapure/modern-ai-chatbot/discussions)
- **Email**: Contact maintainers for sensitive issues

## 🙏 Acknowledgments

- Thanks to all contributors who help improve this project
- Inspired by modern chat interfaces and AI assistants
- Built with open-source tools and libraries

## 📊 Project Status

![GitHub stars](https://img.shields.io/github/stars/YashLadlapure/modern-ai-chatbot?style=social)
![GitHub forks](https://img.shields.io/github/forks/YashLadlapure/modern-ai-chatbot?style=social)
![GitHub issues](https://img.shields.io/github/issues/YashLadlapure/modern-ai-chatbot)
![GitHub pull requests](https://img.shields.io/github/issues-pr/YashLadlapure/modern-ai-chatbot)

---

**Made with ❤️ by the open-source community**

Free to use, modify, and distribute. Star ⭐ this repository if you find it helpful!
