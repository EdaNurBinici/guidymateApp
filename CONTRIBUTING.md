# Contributing to AI-Powered Career Assistant

Thank you for your interest in contributing! 🎉

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Your environment (OS, browser, Node version)

### Suggesting Features

Feature suggestions are welcome! Please open an issue with:
- Clear description of the feature
- Use case and benefits
- Possible implementation approach

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed
4. **Test your changes**
   ```bash
   npm test
   ```
5. **Commit your changes**
   ```bash
   git commit -m "feat: Add some AmazingFeature"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/AmazingFeature
   ```
7. **Open a Pull Request**

## Code Style

### JavaScript/React
- Use ES6+ features
- Use functional components with hooks
- Use meaningful variable names
- Add JSDoc comments for functions
- Keep components small and focused

### CSS
- Use BEM naming convention
- Avoid !important (use specificity)
- Mobile-first approach
- Use CSS variables for theming

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

## Development Setup

1. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/online-not-defteri.git
   cd online-not-defteri
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd web-app-api
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Fill in your API keys

4. **Run development servers**
   ```bash
   # Backend (in web-app-api folder)
   npm start

   # Frontend (in frontend folder)
   npm run dev
   ```

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Test on multiple browsers (Chrome, Firefox, Safari)
- Test responsive design on mobile devices

## Questions?

Feel free to open an issue or contact me:
- GitHub: [@EdaNurBinici](https://github.com/EdaNurBinici)
- Email: edanurbinici@example.com

Thank you for contributing! 🚀
