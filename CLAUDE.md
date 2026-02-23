# CLAUDE.md — SPAC-KIT

## Project Overview

SPAC-KIT เป็น CLI tool สำหรับสร้าง spec templates แบบ Spec-Driven Development
ผู้ใช้กรอกชื่อโปรเจค → ได้โฟลเดอร์ `spac/` พร้อม markdown templates

## Architecture

- `bin/cli.js` — CLI entry point, parse args, show UI
- `src/specs.js` — Registry ของ required/optional specs
- `src/prompts.js` — Interactive prompts (inquirer)
- `src/init.js` — Copy templates, replace placeholders, create folders
- `templates/spac/` — Template markdown files (8 ไฟล์)

## Key Conventions

- ESM modules (`"type": "module"` in package.json)
- Templates ใช้ `{{PROJECT_NAME}}` และ `{{DATE}}` เป็น placeholder
- Required specs (01-04) สร้างเสมอ, Optional specs (05-08) เลือกได้
- Template files ใช้ภาษาไทย+อังกฤษ

## Commands

```bash
# Run CLI
node bin/cli.js init <project-name>

# Test
npm test
```

## Dependencies

- `inquirer` — Interactive prompts
- `chalk` — Terminal colors
- `fs-extra` — File operations
