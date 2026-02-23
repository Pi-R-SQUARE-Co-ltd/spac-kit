#!/usr/bin/env node

import chalk from 'chalk';
import { initProject } from '../src/init.js';
import { askProjectName, askProjectType, askOptionalSpecs } from '../src/prompts.js';
import { requiredSpecs } from '../src/specs.js';

const args = process.argv.slice(2);
const command = args[0];
const projectNameArg = args[1];

async function main() {
  console.log('');
  console.log(
    chalk.cyan.bold('  ┌──────────────────────────────────────────────────┐')
  );
  console.log(
    chalk.cyan.bold('  │  🚀 SPAC-KIT — Spec-Driven Development Kit     │')
  );
  console.log(
    chalk.cyan.bold('  │  by Pi R Square Co., LTD                        │')
  );
  console.log(
    chalk.cyan.bold('  └──────────────────────────────────────────────────┘')
  );
  console.log('');

  if (command !== 'init') {
    console.log(chalk.yellow('Usage: spac-kit init [project-name]'));
    console.log('');
    console.log('Commands:');
    console.log('  init [name]  Create a new project with spec templates');
    process.exit(1);
  }

  // 1. Project name
  const projectName = await askProjectName(projectNameArg);

  // 2. Project type
  const preset = await askProjectType();
  console.log(chalk.dim(`  → ${preset.name}`));

  // 3. Optional specs (pre-checked based on preset)
  const selectedSpecs = await askOptionalSpecs(preset);

  console.log('');

  const { spacDir } = await initProject(projectName, selectedSpecs, preset);

  // Display result
  console.log(chalk.green.bold(`✅ Project ${projectName} created successfully!`));
  console.log(chalk.dim(`   Type: ${preset.name}`));
  console.log('');
  console.log(chalk.white(`  ${projectName}/`));
  console.log(chalk.white('  └── spac/'));

  const allFiles = [
    ...requiredSpecs.map((s) => s.file),
    ...selectedSpecs,
    '00-SCOPE-OF-WORK.md',
  ];

  for (let i = 0; i < allFiles.length; i++) {
    const prefix = i === allFiles.length - 1 ? '└──' : '├──';
    console.log(chalk.white(`      ${prefix} ${allFiles[i]}`));
  }

  console.log('');
  console.log(chalk.dim('  💡 Use spac/00-SCOPE-OF-WORK.md as the entry point for your team & AI'));
  console.log('');
}

main().catch((err) => {
  console.error(chalk.red('Error:'), err.message);
  process.exit(1);
});
