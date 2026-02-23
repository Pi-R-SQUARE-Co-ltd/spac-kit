# Contributing to SPAC-KIT

Thank you for your interest in contributing to SPAC-KIT! We welcome contributions from the community.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/spac-kit.git
   cd spac-kit
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Project Structure

```
spac-kit/
├── bin/
│   ├── cli.js            # CLI entry point
│   └── mcp-server.js     # MCP server
├── src/
│   ├── core.js           # Programmatic API (no UI dependencies)
│   ├── init.js           # CLI wrapper over core.js
│   ├── specs.js          # Spec registry + project type presets
│   ├── prompts.js        # Interactive prompts (inquirer)
│   ├── versions.js       # npm version fetcher
│   └── fill/
│       ├── fill.js       # AI auto-fill logic
│       └── prompts-fill.js  # AI system prompts per spec
├── templates/spac/       # Markdown template files
└── n8n-nodes-spac-kit/   # n8n community node (separate package)
```

## Development

```bash
# Run CLI locally
node bin/cli.js init test-project

# Test MCP server
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}' | node bin/mcp-server.js

# Test core API
node -e "import('./src/core.js').then(m => m.createProject('test', {preset:'api',targetDir:'/tmp'}).then(console.log))"
```

## Making Changes

### Templates (`templates/spac/`)
- Use `{{PLACEHOLDER_NAME}}` for dynamic values
- Use `<!-- TODO -->` for sections users need to fill in
- Keep templates practical and actionable

### Core API (`src/core.js`)
- No UI dependencies (no inquirer, no chalk, no console.log)
- All functions should be pure and testable
- Return structured results

### CLI (`bin/cli.js`)
- UI logic only — delegate to `core.js` for business logic

## Submitting Changes

1. Commit your changes with a clear message:
   ```bash
   git commit -m "feat: add new project type preset for AI/ML projects"
   ```
2. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
3. Open a Pull Request against the `main` branch

## Commit Message Convention

- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation only
- `refactor:` — Code refactoring
- `test:` — Tests
- `bump:` — Version bump

## Reporting Issues

Use [GitHub Issues](https://github.com/Pi-R-SQUARE-Co-ltd/spac-kit/issues) to report bugs or suggest features.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
