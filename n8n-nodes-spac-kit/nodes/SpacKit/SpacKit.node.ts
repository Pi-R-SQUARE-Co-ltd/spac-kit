import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

// Inlined spec data (no external dependencies)
const requiredSpecs = [
  { file: '01-PRD.md', name: 'Product Requirements Document (PRD)' },
  { file: '02-TECH-STACK.md', name: 'Tech Stack' },
  { file: '03-DATABASE-SCHEMA.md', name: 'Database Schema' },
  { file: '04-PROJECT-STRUCTURE.md', name: 'Project Structure' },
];

const optionalSpecs = [
  { file: '05-API-DESIGN.md', name: 'API Design' },
  { file: '06-USER-STORIES.md', name: 'User Stories' },
  { file: '07-ROADMAP.md', name: 'Roadmap' },
  { file: '08-SITEMAP.md', name: 'Sitemap' },
];

const projectTypes = [
  { value: 'fullstack', name: 'Web App (Full-stack)', description: 'General web app — Frontend + Backend + Database', defaultOptionalSpecs: ['05-API-DESIGN.md', '06-USER-STORIES.md', '07-ROADMAP.md', '08-SITEMAP.md'] },
  { value: 'api', name: 'API / Backend Service', description: 'API-only — no frontend, focused on endpoints + database', defaultOptionalSpecs: ['05-API-DESIGN.md', '07-ROADMAP.md'] },
  { value: 'ecommerce', name: 'E-commerce / Marketplace', description: 'Online store — Products, Orders, Payments, Cart', defaultOptionalSpecs: ['05-API-DESIGN.md', '06-USER-STORIES.md', '07-ROADMAP.md', '08-SITEMAP.md'] },
  { value: 'saas', name: 'SaaS Platform', description: 'Multi-tenant SaaS — Subscription, Billing, Teams', defaultOptionalSpecs: ['05-API-DESIGN.md', '06-USER-STORIES.md', '07-ROADMAP.md', '08-SITEMAP.md'] },
  { value: 'mobile', name: 'Mobile App', description: 'Mobile app — React Native / Flutter + Backend API', defaultOptionalSpecs: ['05-API-DESIGN.md', '06-USER-STORIES.md', '07-ROADMAP.md'] },
  { value: 'landing', name: 'Landing Page / Marketing Site', description: 'Marketing site — lightweight backend, content + SEO focused', defaultOptionalSpecs: ['07-ROADMAP.md', '08-SITEMAP.md'] },
  { value: 'internal', name: 'Internal Tool / Admin Dashboard', description: 'Back-office system — CRUD, Reports, User Management', defaultOptionalSpecs: ['05-API-DESIGN.md', '06-USER-STORIES.md', '07-ROADMAP.md'] },
];

const PACKAGES: Record<string, string> = {
  VERSION_NEXTJS: 'next',
  VERSION_TYPESCRIPT: 'typescript',
  VERSION_TAILWIND: 'tailwindcss',
  VERSION_SHADCN: 'shadcn',
  VERSION_ZUSTAND: 'zustand',
  VERSION_TANSTACK_QUERY: '@tanstack/react-query',
  VERSION_REACT_HOOK_FORM: 'react-hook-form',
  VERSION_ZOD: 'zod',
  VERSION_NESTJS: '@nestjs/core',
  VERSION_PRISMA: 'prisma',
  VERSION_PNPM: 'pnpm',
  VERSION_VITEST: 'vitest',
  VERSION_PLAYWRIGHT: '@playwright/test',
  VERSION_ESLINT: 'eslint',
  VERSION_PRETTIER: 'prettier',
};

const FALLBACK_VERSIONS: Record<string, string> = {
  VERSION_NEXTJS: '15', VERSION_TYPESCRIPT: '5.7', VERSION_TAILWIND: '4',
  VERSION_SHADCN: '2', VERSION_ZUSTAND: '5', VERSION_TANSTACK_QUERY: '5',
  VERSION_REACT_HOOK_FORM: '7', VERSION_ZOD: '3', VERSION_NESTJS: '11',
  VERSION_PRISMA: '6', VERSION_PNPM: '9', VERSION_VITEST: '3',
  VERSION_PLAYWRIGHT: '1', VERSION_ESLINT: '9', VERSION_PRETTIER: '3',
  VERSION_NODE: '22', VERSION_POSTGRESQL: '17', VERSION_REDIS: '7',
};

async function fetchLatestVersions(): Promise<Record<string, string>> {
  const versions = { ...FALLBACK_VERSIONS };
  const USE_MINOR = new Set(['typescript', 'tailwindcss']);

  const results = await Promise.allSettled(
    Object.entries(PACKAGES).map(async ([key, pkg]) => {
      const res = await fetch(`https://registry.npmjs.org/${pkg}/latest`, {
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) return [key, null] as const;
      const data = await res.json() as { version: string };
      const parts = data.version.split('.');
      const ver = (parseInt(parts[0]) === 0 || USE_MINOR.has(pkg))
        ? `${parts[0]}.${parts[1]}`
        : parts[0];
      return [key, ver] as const;
    }),
  );

  for (const result of results) {
    if (result.status === 'fulfilled' && result.value[1]) {
      versions[result.value[0]] = result.value[1];
    }
  }

  return versions;
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
          {
            name: 'Get Spec List',
            value: 'getSpecList',
            description: 'Get all spec files for a preset',
            action: 'Get all spec files for a preset',
          },
        ],
        default: 'getPresets',
      },
      {
        displayName: 'Preset',
        name: 'preset',
        type: 'options',
        options: [
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
            operation: ['getSpecList'],
          },
        },
        description: 'Project type preset',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const operation = this.getNodeParameter('operation', 0) as string;

    for (let i = 0; i < items.length; i++) {
      try {
        if (operation === 'getPresets') {
          returnData.push({
            json: {
              presets: projectTypes,
              requiredSpecs,
              optionalSpecs,
              installCommand: 'npx @pirsquare.auto/spac-kit init',
            },
          });
        } else if (operation === 'getVersions') {
          const versions = await fetchLatestVersions();
          returnData.push({ json: versions });
        } else if (operation === 'getSpecList') {
          const presetValue = this.getNodeParameter('preset', i) as string;
          const preset = projectTypes.find((p) => p.value === presetValue);
          const allFiles = [
            '00-SCOPE-OF-WORK.md',
            ...requiredSpecs.map((s) => s.file),
            ...(preset ? preset.defaultOptionalSpecs : optionalSpecs.map((s) => s.file)),
          ];
          returnData.push({
            json: {
              preset: preset?.name ?? 'Unknown',
              files: allFiles,
              fileCount: allFiles.length,
              createCommand: `npx @pirsquare.auto/spac-kit init my-project`,
            },
          });
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
