# Modern AI Chatbot - Deployment Guide

## 🚀 Quick Start Deployment

This guide provides comprehensive instructions for deploying the Modern AI Chatbot platform using Docker and various deployment methods.

## 📋 Prerequisites

- Docker Desktop (v20.10 or higher) or Docker Engine
- Docker Compose (v2.0 or higher)
- OpenAI API Key
- Git
- Node.js 18+ (for local development)

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YashLadlapure/modern-ai-chatbot.git
cd modern-ai-chatbot
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Required
OPENAI_API_KEY=your_openai_api_key_here

# Optional
NODE_ENV=production
PORT=3000
```

**Important:** Never commit your `.env` file to version control!

## 🐳 Docker Deployment

### Method 1: Docker Compose (Recommended)

The easiest way to deploy the chatbot:

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

The application will be available at `http://localhost:3000`

### Method 2: Docker CLI

For more control over the deployment:

```bash
# Build the Docker image
docker build -t modern-ai-chatbot:latest .

# Run the container
docker run -d \
  --name chatbot \
  -p 3000:3000 \
  -e OPENAI_API_KEY=your_api_key \
  -v $(pwd)/logs:/app/logs \
  --restart unless-stopped \
  modern-ai-chatbot:latest

# View logs
docker logs -f chatbot

# Stop the container
docker stop chatbot
```

## 🌐 Production Deployment Options

### Option 1: Cloud Platforms

#### Deploy to Heroku

```bash
# Install Heroku CLI
heroku login

# Create a new app
heroku create your-chatbot-app

# Set environment variables
heroku config:set OPENAI_API_KEY=your_api_key

# Deploy
heroku container:push web
heroku container:release web
heroku open
```

#### Deploy to Railway

1. Visit [Railway.app](https://railway.app)
2. Create a new project from GitHub repository
3. Add environment variables in the Railway dashboard
4. Railway will automatically deploy from your Dockerfile

#### Deploy to Render

1. Visit [Render.com](https://render.com)
2. Create a new Web Service from your GitHub repository
3. Set build command: `docker build -t chatbot .`
4. Set start command: `docker run chatbot`
5. Add environment variables in Render dashboard

### Option 2: Self-Hosted VPS

#### Using Docker on Ubuntu/Debian

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Clone and deploy
git clone https://github.com/YashLadlapure/modern-ai-chatbot.git
cd modern-ai-chatbot
cp .env.example .env
# Edit .env with your API key
docker-compose up -d
```

#### Using PM2 (Without Docker)

```bash
# Install dependencies
npm install

# Install PM2
npm install -g pm2

# Start application
pm2 start server.js --name "chatbot"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### Option 3: Kubernetes Deployment

For scalable production deployments:

```bash
# Build and push to container registry
docker build -t your-registry/modern-ai-chatbot:latest .
docker push your-registry/modern-ai-chatbot:latest

# Apply Kubernetes manifests
kubectl create secret generic chatbot-secrets \
  --from-literal=openai-api-key=your_api_key

kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

## 🔄 CI/CD with GitHub Actions

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

- ✅ Runs tests on every push
- 🔨 Builds Docker images automatically
- 🚀 Can deploy to container registries
- 📊 Provides build status

### Configure Automated Deployment

1. Add repository secrets in GitHub Settings:
   - `DOCKER_USERNAME`: Your Docker Hub username
   - `DOCKER_PASSWORD`: Your Docker Hub password

2. Uncomment the `push-docker` job in `.github/workflows/deploy.yml`

3. Push to main branch - your image will be automatically built and pushed!

## 📊 Monitoring & Health Checks

### Health Check Endpoint

The application includes a health check endpoint:

```bash
curl http://localhost:3000/health
```

Expected response: `{"status":"ok"}`

### View Docker Logs

```bash
# Using Docker Compose
docker-compose logs -f --tail=100

# Using Docker CLI
docker logs -f --tail=100 chatbot
```

### Container Statistics

```bash
docker stats chatbot
```

## 🔒 Security Best Practices

1. **API Keys**: Always use environment variables, never hardcode
2. **HTTPS**: Use reverse proxy (Nginx/Caddy) with SSL certificates
3. **Updates**: Regularly update dependencies and base images
4. **Secrets**: Use Docker secrets or cloud provider secret managers
5. **Network**: Limit container network exposure

## 🐛 Troubleshooting

### Container Won't Start

```bash
# Check container logs
docker logs chatbot

# Check if port is already in use
sudo lsof -i :3000

# Rebuild image from scratch
docker-compose build --no-cache
```

### Environment Variables Not Loading

```bash
# Verify .env file exists
ls -la .env

# Check environment inside container
docker exec chatbot env | grep OPENAI
```

### High Memory Usage

```bash
# Limit container memory
docker run -m 512m modern-ai-chatbot:latest

# Or in docker-compose.yml:
deploy:
  resources:
    limits:
      memory: 512M
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 🆘 Support

If you encounter issues:

1. Check existing [GitHub Issues](https://github.com/YashLadlapure/modern-ai-chatbot/issues)
2. Review the [CONTRIBUTING.md](CONTRIBUTING.md) guide
3. Open a new issue with detailed information

## 📝 Quick Reference

### Common Commands

```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# Restart
docker-compose restart

# View logs
docker-compose logs -f

# Rebuild
docker-compose up -d --build

# Clean up
docker system prune -a
```

### Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| OPENAI_API_KEY | Yes | - | Your OpenAI API key |
| PORT | No | 3000 | Server port |
| NODE_ENV | No | production | Environment mode |

---

**🎉 Congratulations!** Your Modern AI Chatbot is now deployed and ready to use!
