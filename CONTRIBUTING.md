# Contributing to Modern AI Chatbot Platform

First off, thank you for considering contributing to the Modern AI Chatbot Platform! It's people like you that make this project such a great tool for everyone.

## 💖 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Pledge

We are committed to making participation in this project a harassment-free experience for everyone, regardless of:
- Age, body size, disability, ethnicity
- Gender identity and expression
- Level of experience
- Nationality, personal appearance, race, religion
- Sexual identity and orientation

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues as you might find that you don't need to create one. When creating a bug report, please include as many details as possible:

**Bug Report Template:**

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. iOS, Windows, Linux]
 - Browser: [e.g. chrome, safari]
 - Version: [e.g. 22]

**Additional context**
Add any other context about the problem here.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Provide specific examples** to demonstrate the steps
- **Describe the current behavior** and explain the behavior you expected
- **Explain why this enhancement would be useful**

### Your First Code Contribution

Unsure where to begin? You can start by looking through these issues:

- `good-first-issue` - issues which should only require a few lines of code
- `help-wanted` - issues which should be a bit more involved

### Pull Requests

The process described here has several goals:
- Maintain project quality
- Fix problems that are important to users
- Engage the community in working toward the best possible product
- Enable a sustainable system for maintainers to review contributions

**Please follow these steps:**

1. **Fork the repository** and create your branch from `main`
2. **Follow the coding style** of the project
3. **Add tests** if you've added code that should be tested
4. **Ensure the test suite passes**
5. **Update documentation** as necessary
6. **Write a good commit message**
7. **Create a pull request**

## 📝 Style Guides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - ✨ `:sparkles:` when adding a new feature
  - 🐛 `:bug:` when fixing a bug
  - 📝 `:memo:` when writing docs
  - 🚀 `:rocket:` when improving performance
  - ⚙️ `:gear:` when updating configuration
  - ♻️ `:recycle:` when refactoring code
  - ✅ `:white_check_mark:` when adding tests
  - 🔒 `:lock:` when dealing with security

### JavaScript/TypeScript Style Guide

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Prefer const over let, avoid var
- Use meaningful variable names
- Add comments for complex logic
- Use async/await over raw promises
- Follow ESLint rules defined in the project

**Example:**

```javascript
// Good
const getUserData = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// Avoid
var getUserData = function(userId) {
  return fetch("/api/users/" + userId).then(function(response) {
    return response.json()
  })
}
```

### React/Component Style Guide

- Use functional components with hooks
- Keep components small and focused
- Use PropTypes or TypeScript for type checking
- Extract reusable logic into custom hooks
- Follow component naming conventions

**Example:**

```javascript
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ChatMessage = ({ message, sender, timestamp }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`message ${sender} ${isVisible ? 'fade-in' : ''}`}>
      <p>{message}</p>
      <span className="timestamp">{timestamp}</span>
    </div>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.string.isRequired,
  sender: PropTypes.oneOf(['user', 'bot']).isRequired,
  timestamp: PropTypes.string.isRequired
};

export default ChatMessage;
```

### CSS/Styling Guide

- Use Tailwind CSS utilities when possible
- Follow BEM naming convention for custom CSS
- Keep styles modular and reusable
- Ensure responsive design for all screen sizes
- Support both light and dark themes

## 🛠️ Development Process

### Setting Up Your Development Environment

1. **Clone your fork:**
```bash
git clone https://github.com/YOUR-USERNAME/modern-ai-chatbot.git
cd modern-ai-chatbot
```

2. **Add upstream remote:**
```bash
git remote add upstream https://github.com/YashLadlapure/modern-ai-chatbot.git
```

3. **Install dependencies:**
```bash
npm install
```

4. **Create a branch:**
```bash
git checkout -b feature/your-feature-name
```

### Making Changes

1. Make your changes in your feature branch
2. Add or update tests as necessary
3. Run tests: `npm test`
4. Run linting: `npm run lint`
5. Format code: `npm run format`
6. Test locally: `npm run dev`

### Submitting Changes

1. **Commit your changes:**
```bash
git add .
git commit -m "✨ Add amazing feature"
```

2. **Push to your fork:**
```bash
git push origin feature/your-feature-name
```

3. **Create a Pull Request:**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template
   - Submit the pull request

## 📊 Pull Request Review Process

### What to Expect

1. **Automated checks** will run (linting, tests, build)
2. **Maintainers will review** your code
3. **Feedback** may be provided for improvements
4. **Iterations** - you may need to make changes
5. **Approval** - once approved, your PR will be merged!

### PR Checklist

Before submitting, make sure:

- [ ] Code follows the project's style guidelines
- [ ] Self-review of code has been performed
- [ ] Comments added for hard-to-understand areas
- [ ] Documentation has been updated
- [ ] Changes generate no new warnings
- [ ] Tests added that prove the fix is effective or feature works
- [ ] New and existing unit tests pass locally
- [ ] Dependent changes have been merged

## 🏆 Recognition

Contributors will be recognized in the following ways:

- Listed in the project's README.md
- Mentioned in release notes
- Added to the Contributors page
- Invited to join the core team (for significant contributions)

## 💬 Community

### Where to Get Help

- **GitHub Discussions**: For questions and discussions
- **GitHub Issues**: For bug reports and feature requests
- **Documentation**: Check the `/docs` folder
- **README**: Start with the project README

### Communication Guidelines

- Be kind and courteous
- Respect everyone's time and effort
- Stay on topic
- Provide constructive feedback
- Help others when you can

## 📦 Project Structure

Understanding the project structure will help you contribute effectively:

```
modern-ai-chatbot/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── utils/       # Utility functions
│   │   ├── styles/      # Global styles and themes
│   │   └── api/         # API client functions
│   └── tests/       # Frontend tests
├── backend/           # Node.js backend application
│   ├── src/
│   │   ├── controllers/ # Request handlers
│   │   ├── models/      # Data models
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   ├── middleware/  # Express middleware
│   │   └── config/      # Configuration files
│   └── tests/       # Backend tests
├── docs/              # Documentation
├── docker/            # Docker configurations
└── .github/           # GitHub specific files (CI/CD, templates)
```

## 🖊️ Issue and PR Labels

We use labels to organize and prioritize:

### Type
- `bug` - Something isn't working
- `feature` - New feature or request
- `documentation` - Documentation improvements
- `enhancement` - Improvement to existing feature

### Priority
- `priority: high` - Needs immediate attention
- `priority: medium` - Important but not urgent
- `priority: low` - Nice to have

### Status
- `status: needs-review` - Awaiting review
- `status: in-progress` - Currently being worked on
- `status: blocked` - Blocked by other issues

### Difficulty
- `good-first-issue` - Good for newcomers
- `help-wanted` - Extra attention needed
- `difficult` - Requires significant effort

## ❓ Questions?

Don't hesitate to ask questions! You can:

1. Open an issue with the `question` label
2. Start a discussion on GitHub Discussions
3. Check existing documentation and issues

## 🙏 Thank You!

Your contributions, whether big or small, make a significant difference. Thank you for being part of this open-source project!

---

**Happy Coding! 🚀**

*This project is completely free and open-source. We believe in the power of community-driven development.*
