import fs from 'fs-extra';
import inquirer from 'inquirer';
import { createProject } from './core.js';

/**
 * CLI wrapper — adds inquirer overwrite prompt on top of core.createProject()
 */
export async function initProject(projectName, selectedOptionalFiles, preset) {
  const projectDir = (await import('path')).resolve(process.cwd(), projectName);
  const spacDir = (await import('path')).join(projectDir, 'spac');

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
  }

  return createProject(projectName, {
    preset: preset?.value,
    optionalSpecs: selectedOptionalFiles,
    overwrite: true, // already confirmed above or doesn't exist
  });
}
