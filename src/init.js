import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import { requiredSpecs, optionalSpecs } from './specs.js';
import { fetchLatestVersions } from './versions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates', 'spac');

export async function initProject(projectName, selectedOptionalFiles, preset) {
  const projectDir = path.resolve(process.cwd(), projectName);
  const spacDir = path.join(projectDir, 'spac');

  if (await fs.pathExists(spacDir)) {
    const { overwrite } = await inquirer.prompt([{
      type: 'confirm',
      name: 'overwrite',
      message: `Directory "${projectName}/spac" already exists. Overwrite?`,
      default: false,
    }]);
    if (!overwrite) {
      console.log('Cancelled.');
      process.exit(0);
    }
    await fs.remove(spacDir);
  }

  await fs.ensureDir(spacDir);

  const today = new Date().toISOString().split('T')[0];
  const hints = preset ? preset.hints : {};

  // Fetch latest package versions from npm
  const versions = await fetchLatestVersions();
  Object.assign(hints, versions);

  // Copy required specs
  for (const spec of requiredSpecs) {
    await copyTemplate(spec.file, spacDir, projectName, today, hints);
  }

  // Copy selected optional specs
  const optionalFiles = selectedOptionalFiles || optionalSpecs.map((s) => s.file);
  for (const file of optionalFiles) {
    await copyTemplate(file, spacDir, projectName, today, hints);
  }

  // Generate 00-SCOPE-OF-WORK.md
  const allSpecFiles = [
    ...requiredSpecs.map((s) => s.file),
    ...optionalFiles,
  ];
  await generateScopeOfWork(spacDir, projectName, preset, allSpecFiles);

  return { projectDir, spacDir };
}

async function copyTemplate(fileName, destDir, projectName, date, hints) {
  const srcPath = path.join(TEMPLATES_DIR, fileName);
  const destPath = path.join(destDir, fileName);

  let content = await fs.readFile(srcPath, 'utf-8');
  content = content.replaceAll('{{PROJECT_NAME}}', projectName);
  content = content.replaceAll('{{DATE}}', date);

  // Replace preset hints
  for (const [key, value] of Object.entries(hints)) {
    content = content.replaceAll(`{{${key}}}`, value);
  }

  // Clear any remaining unreplaced hint placeholders
  // Clear any remaining unreplaced placeholders
  content = content.replace(/\{\{[A-Z_]+\}\}/g, '<!-- TODO -->');

  await fs.writeFile(destPath, content, 'utf-8');
}

async function generateScopeOfWork(spacDir, projectName, preset, specFiles) {
  const requiredFileNames = requiredSpecs.map((s) => s.file);
  const specList = specFiles.map((f) => {
    const type = requiredFileNames.includes(f) ? 'Required' : 'Optional';
    return `| \`${f}\` | ${type} |`;
  }).join('\n');
  const presetLabel = preset ? preset.name : 'General';
  const today = new Date().toISOString().split('T')[0];

  const content = `# 📑 ${projectName} — Scope of Work (SOW)

## Project Type: ${presetLabel}
## Date: ${today}
## Prepared by: Pi R Square Co., LTD

---

# 1. Project Overview

<!-- TODO: Describe the project in 2-3 sentences -->

---

# 2. Specification Documents

All project specifications are in this folder. Read them in order before starting any work.

### Reading Order

| Order | File | Purpose |
|-------|------|---------|
| 1 | \`01-PRD.md\` | Understand what this project is, its goals and scope |
| 2 | \`02-TECH-STACK.md\` | Technologies used — must follow this stack |
| 3 | \`03-DATABASE-SCHEMA.md\` | Database structure, tables, relations |
| 4 | \`04-PROJECT-STRUCTURE.md\` | Folder and file organization |

### All Spec Files

| File | Type |
|------|------|
${specList}

---

# 3. Constraints & Rules

- **Follow the tech stack** defined in \`02-TECH-STACK.md\` — do not change without approval
- **Follow the database schema** defined in \`03-DATABASE-SCHEMA.md\` — do not modify without approval
- **Create files and folders** according to \`04-PROJECT-STRUCTURE.md\`
- **Update relevant spec files** whenever significant changes are made

---

# 4. How to Use with AI Tools

## Quick Setup

| AI Tool | Setup | Then Say |
|---------|-------|---------|
| **Claude Code** | Copy this file into \`CLAUDE.md\` at project root | \`Read all files in spac/ and build the project\` |
| **Cursor / Windsurf** | Add \`spac/\` as context folder in settings | \`@spac Follow the specs to build this project\` |
| **ChatGPT** | Paste this file + spec files as context | Use the prompt below |
| **Other AI** | Attach this file + relevant spec files | Use the prompt below |

## Step-by-Step: Claude Code

\`\`\`bash
# 1. Copy this SOW as CLAUDE.md
cp spac/00-SCOPE-OF-WORK.md CLAUDE.md

# 2. Open Claude Code in the project
claude

# 3. Tell Claude to build:
\`\`\`
> Read all files in spac/ folder. Follow the specs strictly to build this project. Start with setup based on 02-TECH-STACK.md and 04-PROJECT-STRUCTURE.md.

## Step-by-Step: Cursor / Windsurf / AI IDE

1. Open the project in your IDE
2. Go to **Settings → Context** (or equivalent)
3. Add the \`spac/\` folder as context
4. In the AI chat, type:

> Read 00-SCOPE-OF-WORK.md first, then follow all spec files in spac/ to build this project step by step.

## Ready-to-Use Prompt (Copy & Paste)

\`\`\`
You are building the "${projectName}" project. Read all spec files in the spac/ folder.
These are the project specifications — follow them strictly:

- 01-PRD.md → What to build (features, goals, users)
- 02-TECH-STACK.md → What tools to use (do NOT change without asking)
- 03-DATABASE-SCHEMA.md → Database structure (do NOT modify without asking)
- 04-PROJECT-STRUCTURE.md → Folder structure (follow exactly)
- 05-08 → Additional specs (API, user stories, roadmap, sitemap)

Build the project step by step:
1. Set up the project structure per 04-PROJECT-STRUCTURE.md
2. Install dependencies per 02-TECH-STACK.md
3. Create database schema per 03-DATABASE-SCHEMA.md
4. Build features from 01-PRD.md
5. Follow API design from 05-API-DESIGN.md (if available)

Rules:
- Do NOT change the tech stack without approval
- Do NOT modify the database schema without approval
- Update spec files when making significant changes
- Ask before making architectural decisions not covered in specs
\`\`\`

---

*Generated by [@pirsquare.auto/spac-kit](https://github.com/Pi-R-SQUARE-Co-ltd/spac-kit) — Spec-Driven Development by Pi R Square Co., LTD*
`;

  await fs.writeFile(path.join(spacDir, '00-SCOPE-OF-WORK.md'), content, 'utf-8');
}
