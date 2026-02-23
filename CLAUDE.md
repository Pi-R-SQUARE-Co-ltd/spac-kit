# CLAUDE.md — SPAC-KIT

## Project Overview

SPAC-KIT is a CLI tool for generating spec templates using Spec-Driven Development.
Users enter a project name and get a `spac/` folder with ready-to-fill markdown templates.

## Architecture

- `bin/cli.js` — CLI entry point, parse args, show UI
- `src/specs.js` — Registry of required/optional specs and project type presets
- `src/prompts.js` — Interactive prompts (inquirer)
- `src/init.js` — Copy templates, replace placeholders, create folders, generate SOW
- `templates/spac/` — Template markdown files (8 files)

## Key Conventions

- ESM modules (`"type": "module"` in package.json)
- Templates use `{{PROJECT_NAME}}`, `{{DATE}}`, and `{{*_HINT}}` as placeholders
- Required specs (01-04) are always created, Optional specs (05-08) are user-selected
- All content is in English

## Commands

```bash
# Run CLI
node bin/cli.js init <project-name>

# Show help
node bin/cli.js --help

# Show version
node bin/cli.js --version

# Test
npm test
```

## Dependencies

- `inquirer` — Interactive prompts
- `chalk` — Terminal colors
- `fs-extra` — File operations
