#!/usr/bin/env node

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { initProject } from '../src/init.js';
import { askProjectName, askProjectType, askOptionalSpecs } from '../src/prompts.js';
import { requiredSpecs } from '../src/specs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkg = JSON.parse(readFileSync(path.join(__dirname, '..', 'package.json'), 'utf-8'));

const args = process.argv.slice(2);
const command = args[0];
const projectNameArg = args[1];

// --version / -v
if (command === '--version' || command === '-v') {
  console.log(pkg.version);
  process.exit(0);
}

// --help / -h
if (command === '--help' || command === '-h' || !command) {
  console.log('');
  console.log(chalk.cyan.bold('  SPAC-KIT') + chalk.dim(` v${pkg.version}`));
  console.log(chalk.dim('  Spec-Driven Development Kit by Pi R Square Co., LTD'));
  console.log('');
  console.log('  Usage:');
  console.log('    spac-kit init [project-name]');
  console.log('');
  console.log('  Commands:');
  console.log('    init [name]     Create a new project with spec templates');
  console.log('');
  console.log('  Options:');
  console.log('    -v, --version   Show version');
  console.log('    -h, --help      Show this help message');
  console.log('');
  console.log('  Examples:');
  console.log(chalk.dim('    $ npx @pirsquare.auto/spac-kit init my-project'));
  console.log(chalk.dim('    $ npx @pirsquare.auto/spac-kit init'));
  console.log('');
  process.exit(0);
}

async function main() {
  console.log('');
  console.log(chalk.cyan.bold('  ┌────────────────────────────────────────────┐'));
  console.log(chalk.cyan.bold('  │  SPAC-KIT - Spec-Driven Development Kit    │'));
  console.log(chalk.cyan.bold('  │  by Pi R Square Co., LTD                   │'));
  console.log(chalk.cyan.bold('  └────────────────────────────────────────────┘'));
  console.log('');

  if (command !== 'init') {
    console.log(chalk.yellow('Unknown command. Use --help to see available commands.'));
    process.exit(1);
  }

  // 1. Project name
  const projectName = await askProjectName(projectNameArg);

  // 2. Project type
  const preset = await askProjectType();
  console.log(chalk.dim(`  → ${preset.name}`));

  // 3. Optional specs (pre-checked based on preset)
  const selectedSpecs = await askOptionalSpecs(preset);

  // 4. Confirmation
  const requiredFiles = requiredSpecs.map((s) => s.file);
  const allFiles = [
    '00-SCOPE-OF-WORK.md',
    ...requiredFiles,
    ...selectedSpecs,
  ];

  console.log('');
  console.log(chalk.bold('  Summary:'));
  console.log(chalk.white(`    Project:  ${projectName}`));
  console.log(chalk.white(`    Type:     ${preset.name}`));
  console.log('');
  console.log(chalk.dim('    Required:'));
  console.log(chalk.white(`      00-SCOPE-OF-WORK.md`));
  for (const f of requiredFiles) {
    console.log(chalk.white(`      ${f}`));
  }
  if (selectedSpecs.length > 0) {
    console.log(chalk.dim('    Optional:'));
    for (const f of selectedSpecs) {
      console.log(chalk.dim(`      ${f}`));
    }
  }
  console.log(chalk.dim(`    Total: ${allFiles.length} files`));
  console.log('');

  const { confirmed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmed',
      message: 'Create project?',
      default: true,
    },
  ]);

  if (!confirmed) {
    console.log(chalk.yellow('  Cancelled.'));
    process.exit(0);
  }

  // 5. Create with progress
  console.log('');
  console.log(chalk.dim('  Creating specs...'));

  const { spacDir } = await initProject(projectName, selectedSpecs, preset);

  // Show progress for each file
  for (let i = 0; i < allFiles.length; i++) {
    const isLast = i === allFiles.length - 1;
    const prefix = isLast ? '└──' : '├──';
    const isRequired = allFiles[i].startsWith('0') && parseInt(allFiles[i]) <= 4;
    const label = isRequired
      ? chalk.white(allFiles[i])
      : chalk.dim(allFiles[i]);
    console.log(chalk.green(`    ${prefix} `) + label + chalk.green(' ✓'));
  }

  // 6. Success + Next steps
  console.log('');
  console.log(chalk.green.bold(`  ✅ Project "${projectName}" created successfully!`));
  console.log('');
  console.log(chalk.bold('  Next steps:'));
  console.log(chalk.white(`    1. ${chalk.cyan(`cd ${projectName}`)}`));
  console.log(chalk.white(`    2. Open ${chalk.cyan('spac/00-SCOPE-OF-WORK.md')} as the entry point`));
  console.log(chalk.white(`    3. Fill in specs following the reading order:`));
  console.log(chalk.dim('         01-PRD → 02-TECH-STACK → 03-DATABASE-SCHEMA → 04-PROJECT-STRUCTURE'));
  console.log(chalk.white(`    4. Hand off ${chalk.cyan('spac/')} folder to your AI tool of choice`));
  console.log('');
}

main().catch((err) => {
  console.error(chalk.red('Error:'), err.message);
  if (process.env.DEBUG) {
    console.error(chalk.dim(err.stack));
  }
  process.exit(1);
});
