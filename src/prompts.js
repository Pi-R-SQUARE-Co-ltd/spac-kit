import inquirer from 'inquirer';
import { optionalSpecs, projectTypes } from './specs.js';

export async function askProjectName(defaultName) {
  if (defaultName) return defaultName;

  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      validate: (input) => {
        const name = input.trim();
        if (!name) return 'Please enter a project name';
        if (name.length > 100) return 'Project name is too long (max 100 characters)';
        if (!/^[a-z0-9][a-z0-9_-]*$/.test(name)) {
          return 'Project name must start with a-z or 0-9, and contain only a-z, 0-9, - and _ (lowercase)';
        }
        return true;
      },
    },
  ]);

  return projectName.trim();
}

export async function askProjectType() {
  const { projectType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'projectType',
      message: 'Project type:',
      choices: projectTypes.map((pt) => ({
        name: `${pt.name}  —  ${pt.description}`,
        value: pt.value,
      })),
    },
  ]);

  return projectTypes.find((pt) => pt.value === projectType);
}

export async function askOptionalSpecs(preset) {
  const { selectedSpecs } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedSpecs',
      message: 'Select additional specs (required specs are always included):',
      choices: optionalSpecs.map((spec) => ({
        name: spec.name,
        value: spec.file,
        checked: preset
          ? preset.defaultOptionalSpecs.includes(spec.file)
          : true,
      })),
    },
  ]);

  return selectedSpecs;
}
