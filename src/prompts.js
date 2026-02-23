import inquirer from 'inquirer';
import { optionalSpecs, projectTypes } from './specs.js';

export async function askProjectName(defaultName) {
  if (defaultName) return defaultName;

  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'ชื่อโปรเจค:',
      validate: (input) => {
        if (!input.trim()) return 'กรุณาใส่ชื่อโปรเจค';
        if (!/^[a-zA-Z0-9_-]+$/.test(input.trim())) {
          return 'ชื่อโปรเจคใช้ได้เฉพาะ a-z, 0-9, - และ _';
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
      message: 'ประเภทโปรเจค:',
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
      message: 'เลือก spec เพิ่มเติม (required specs จะรวมอยู่แล้ว):',
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
