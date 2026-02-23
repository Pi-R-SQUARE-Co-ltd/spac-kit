import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function runSpacKit(args: string): Promise<string> {
  const { stdout } = await execAsync(`npx -y @pirsquare.auto/spac-kit ${args}`, {
    timeout: 60000,
  });
  return stdout.trim();
}

export class SpacKit implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'SPAC-KIT',
    name: 'spacKit',
    icon: 'file:pirsquare.png',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Spec-Driven Development Kit — Generate spec templates for any project',
    defaults: {
      name: 'SPAC-KIT',
    },
    usableAsTool: true,
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Create Project',
            value: 'createProject',
            description: 'Create a new project with spec templates',
            action: 'Create a new project with spec templates',
          },
          {
            name: 'Get Presets',
            value: 'getPresets',
            description: 'List all available project type presets',
            action: 'List all available project type presets',
          },
          {
            name: 'Get Versions',
            value: 'getVersions',
            description: 'Fetch latest npm package versions',
            action: 'Fetch latest npm package versions',
          },
        ],
        default: 'createProject',
      },
      {
        displayName: 'Project Name',
        name: 'projectName',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
          show: {
            operation: ['createProject'],
          },
        },
        description: 'Name of the project (lowercase, a-z, 0-9, hyphens, underscores)',
      },
      {
        displayName: 'Preset',
        name: 'preset',
        type: 'options',
        options: [
          { name: 'General (No Preset)', value: '' },
          { name: 'Web App (Full-stack)', value: 'fullstack' },
          { name: 'API / Backend Service', value: 'api' },
          { name: 'E-commerce / Marketplace', value: 'ecommerce' },
          { name: 'SaaS Platform', value: 'saas' },
          { name: 'Mobile App', value: 'mobile' },
          { name: 'Landing Page / Marketing Site', value: 'landing' },
          { name: 'Internal Tool / Admin Dashboard', value: 'internal' },
        ],
        default: 'fullstack',
        displayOptions: {
          show: {
            operation: ['createProject'],
          },
        },
        description: 'Project type preset',
      },
      {
        displayName: 'Target Directory',
        name: 'targetDir',
        type: 'string',
        default: '/tmp',
        displayOptions: {
          show: {
            operation: ['createProject'],
          },
        },
        description: 'Directory to create the project in',
      },
      {
        displayName: 'Overwrite',
        name: 'overwrite',
        type: 'boolean',
        default: false,
        displayOptions: {
          show: {
            operation: ['createProject'],
          },
        },
        description: 'Whether to overwrite existing spac/ directory',
      },
      {
        displayName: 'Optional Specs',
        name: 'optionalSpecs',
        type: 'multiOptions',
        options: [
          { name: 'API Design', value: '05-API-DESIGN.md' },
          { name: 'User Stories', value: '06-USER-STORIES.md' },
          { name: 'Roadmap', value: '07-ROADMAP.md' },
          { name: 'Sitemap', value: '08-SITEMAP.md' },
        ],
        default: ['05-API-DESIGN.md', '06-USER-STORIES.md', '07-ROADMAP.md', '08-SITEMAP.md'],
        displayOptions: {
          show: {
            operation: ['createProject'],
          },
        },
        description: 'Optional spec files to include',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const operation = this.getNodeParameter('operation', 0) as string;

    for (let i = 0; i < items.length; i++) {
      try {
        if (operation === 'createProject') {
          const projectName = this.getNodeParameter('projectName', i) as string;
          const preset = this.getNodeParameter('preset', i) as string;
          const targetDir = this.getNodeParameter('targetDir', i) as string;
          const overwrite = this.getNodeParameter('overwrite', i) as boolean;
          const optionalSpecs = this.getNodeParameter('optionalSpecs', i) as string[];

          // Use Node.js API via inline script
          const script = `
            const m = await import("@pirsquare.auto/spac-kit");
            const r = await m.createProject(${JSON.stringify(projectName)}, {
              preset: ${JSON.stringify(preset || undefined)},
              optionalSpecs: ${JSON.stringify(optionalSpecs)},
              overwrite: ${overwrite},
              targetDir: ${JSON.stringify(targetDir)},
            });
            process.stdout.write(JSON.stringify({ success: true, projectDir: r.projectDir, spacDir: r.spacDir, files: r.files, fileCount: r.files.length }));
          `.trim();

          const { stdout } = await execAsync(
            `npx -y @pirsquare.auto/spac-kit node -e '${script.replace(/'/g, "'\\''")}'`,
            { timeout: 120000 },
          ).catch(async () => {
            // Fallback: use node directly with dynamic import
            return execAsync(
              `node --input-type=module -e "${script.replace(/"/g, '\\"')}"`,
              { timeout: 120000, env: { ...process.env, NODE_PATH: '' } },
            );
          });

          returnData.push({ json: JSON.parse(stdout) });
        } else if (operation === 'getPresets') {
          const script = `
            import{getPresets as a,getRequiredSpecs as b,getOptionalSpecs as c}from"@pirsquare.auto/spac-kit";
            process.stdout.write(JSON.stringify({presets:a(),requiredSpecs:b(),optionalSpecs:c()}));
          `.trim();
          const { stdout } = await execAsync(
            `node --input-type=module -e "${script.replace(/"/g, '\\"')}"`,
            { timeout: 60000 },
          );
          returnData.push({ json: JSON.parse(stdout) });
        } else if (operation === 'getVersions') {
          const script = `
            import{fetchLatestVersions}from"@pirsquare.auto/spac-kit/versions";
            const v=await fetchLatestVersions();
            process.stdout.write(JSON.stringify(v));
          `.trim();
          const { stdout } = await execAsync(
            `node --input-type=module -e "${script.replace(/"/g, '\\"')}"`,
            { timeout: 60000 },
          );
          returnData.push({ json: JSON.parse(stdout) });
        }
      } catch (error: unknown) {
        if (this.continueOnFail()) {
          const message = error instanceof Error ? error.message : String(error);
          returnData.push({ json: { error: message } });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}
