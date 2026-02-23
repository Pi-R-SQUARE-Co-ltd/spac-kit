import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { requiredSpecs, optionalSpecs, projectTypes } from './specs.js';
import { fetchLatestVersions } from './versions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates', 'spac');

/**
 * Create a project with spec templates — pure programmatic API (no inquirer, no console.log)
 *
 * @param {string} projectName
 * @param {object} options
 * @param {string} [options.preset] — preset value (e.g. 'fullstack', 'api')
 * @param {string[]} [options.optionalSpecs] — optional spec filenames to include
 * @param {boolean} [options.overwrite] — overwrite existing spac/ dir (default false)
 * @param {string} [options.targetDir] — base directory (default process.cwd())
 * @returns {Promise<{projectDir: string, spacDir: string, files: string[]}>}
 */
export async function createProject(projectName, options = {}) {
  const {
    preset: presetValue,
    optionalSpecs: selectedOptionalFiles,
    overwrite = false,
    targetDir = process.cwd(),
  } = options;

  const preset = presetValue ? getPresetByValue(presetValue) : null;
  const projectDir = path.resolve(targetDir, projectName);
  const spacDir = path.join(projectDir, 'spac');

  if (await fs.pathExists(spacDir)) {
    if (!overwrite) {
      throw new Error(`Directory "${projectName}/spac" already exists. Set overwrite: true to replace.`);
    }
    await fs.remove(spacDir);
  }

  await fs.ensureDir(spacDir);

  const today = new Date().toISOString().split('T')[0];
  const hints = preset ? { ...preset.hints } : {};

  const versions = await fetchLatestVersions();
  Object.assign(hints, versions);

  // Copy required specs
  for (const spec of requiredSpecs) {
    await copyTemplate(spec.file, spacDir, projectName, today, hints);
  }

  // Copy selected optional specs
  const optFiles = selectedOptionalFiles
    || (preset ? preset.defaultOptionalSpecs : optionalSpecs.map((s) => s.file));
  for (const file of optFiles) {
    await copyTemplate(file, spacDir, projectName, today, hints);
  }

  // Generate 00-SCOPE-OF-WORK.md
  const allSpecFiles = [
    ...requiredSpecs.map((s) => s.file),
    ...optFiles,
  ];
  await generateScopeOfWork(spacDir, projectName, preset, allSpecFiles);

  const files = ['00-SCOPE-OF-WORK.md', ...allSpecFiles];

  return { projectDir, spacDir, files };
}

export async function copyTemplate(fileName, destDir, projectName, date, hints) {
  const srcPath = path.join(TEMPLATES_DIR, fileName);
  const destPath = path.join(destDir, fileName);

  let content = await fs.readFile(srcPath, 'utf-8');
  content = content.replaceAll('{{PROJECT_NAME}}', projectName);
  content = content.replaceAll('{{DATE}}', date);

  for (const [key, value] of Object.entries(hints)) {
    content = content.replaceAll(`{{${key}}}`, value);
  }

  content = content.replace(/\{\{[A-Z_]+\}\}/g, '<!-- TODO -->');

  await fs.writeFile(destPath, content, 'utf-8');
}

export async function generateScopeOfWork(spacDir, projectName, preset, specFiles) {
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

// --- Helper functions ---

export function getPresets() {
  return projectTypes.map(({ value, name, description, defaultOptionalSpecs }) => ({
    value, name, description, defaultOptionalSpecs,
  }));
}

export function getPresetByValue(value) {
  const preset = projectTypes.find((pt) => pt.value === value);
  if (!preset) {
    throw new Error(`Unknown preset: "${value}". Available: ${projectTypes.map(p => p.value).join(', ')}`);
  }
  return preset;
}

export function getRequiredSpecs() {
  return requiredSpecs;
}

export function getOptionalSpecs() {
  return optionalSpecs;
}

export async function readSpecFile(spacDir, filename) {
  const filePath = path.join(spacDir, filename);
  if (!(await fs.pathExists(filePath))) {
    throw new Error(`Spec file not found: ${filePath}`);
  }
  return fs.readFile(filePath, 'utf-8');
}
