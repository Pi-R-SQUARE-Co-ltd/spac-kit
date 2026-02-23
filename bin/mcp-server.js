#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import {
  createProject,
  getPresets,
  getPresetByValue,
  getRequiredSpecs,
  getOptionalSpecs,
  readSpecFile,
} from '../src/core.js';
import { fetchLatestVersions } from '../src/versions.js';

const server = new McpServer({
  name: 'spac-kit',
  version: '2.0.0',
});

// Tool 1: list_presets
server.tool(
  'list_presets',
  'List all available project type presets with their default optional specs',
  {},
  async () => {
    const presets = getPresets();
    const required = getRequiredSpecs();
    const optional = getOptionalSpecs();
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ presets, requiredSpecs: required, optionalSpecs: optional }, null, 2),
      }],
    };
  }
);

// Tool 2: create_project
server.tool(
  'create_project',
  'Create a new project with spec templates (spac/ folder). Returns the list of created files.',
  {
    projectName: z.string().describe('Project name (lowercase, a-z, 0-9, hyphens, underscores)'),
    preset: z.enum(['fullstack', 'api', 'ecommerce', 'saas', 'mobile', 'landing', 'internal']).optional()
      .describe('Project type preset (optional, defaults to general)'),
    optionalSpecs: z.array(z.string()).optional()
      .describe('Optional spec files to include (e.g. ["05-API-DESIGN.md", "06-USER-STORIES.md"])'),
    overwrite: z.boolean().optional().default(false)
      .describe('Overwrite existing spac/ directory if it exists'),
    targetDir: z.string().optional()
      .describe('Target directory to create the project in (default: current working directory)'),
  },
  async ({ projectName, preset, optionalSpecs, overwrite, targetDir }) => {
    try {
      const result = await createProject(projectName, {
        preset,
        optionalSpecs,
        overwrite,
        targetDir,
      });

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: true,
            projectDir: result.projectDir,
            spacDir: result.spacDir,
            files: result.files,
            message: `Created ${result.files.length} spec files in ${result.spacDir}`,
          }, null, 2),
        }],
      };
    } catch (err) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ success: false, error: err.message }),
        }],
        isError: true,
      };
    }
  }
);

// Tool 3: read_spec
server.tool(
  'read_spec',
  'Read the contents of a specific spec file from a spac/ directory',
  {
    spacDir: z.string().describe('Path to the spac/ directory'),
    filename: z.string().describe('Spec filename (e.g. "01-PRD.md", "00-SCOPE-OF-WORK.md")'),
  },
  async ({ spacDir, filename }) => {
    try {
      const content = await readSpecFile(spacDir, filename);
      return {
        content: [{ type: 'text', text: content }],
      };
    } catch (err) {
      return {
        content: [{ type: 'text', text: JSON.stringify({ error: err.message }) }],
        isError: true,
      };
    }
  }
);

// Tool 4: get_latest_versions
server.tool(
  'get_latest_versions',
  'Fetch the latest npm package versions used in spec templates',
  {},
  async () => {
    const versions = await fetchLatestVersions();
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(versions, null, 2),
      }],
    };
  }
);

// Tool 5: fill_specs (AI Auto-Fill)
server.tool(
  'fill_specs',
  'Use AI (Claude API) to auto-fill spec templates based on a project description. Requires ANTHROPIC_API_KEY env var.',
  {
    spacDir: z.string().describe('Path to the spac/ directory with spec templates to fill'),
    description: z.string().describe('Project description for AI to use when filling specs'),
    model: z.string().optional().default('claude-sonnet-4-20250514')
      .describe('Claude model to use'),
    specFiles: z.array(z.string()).optional()
      .describe('Specific spec files to fill (default: all files with <!-- TODO --> markers)'),
  },
  async ({ spacDir, description, model, specFiles }) => {
    try {
      const { fillSpecs } = await import('../src/fill/fill.js');
      const result = await fillSpecs(spacDir, description, { model, specFiles });
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(result, null, 2),
        }],
      };
    } catch (err) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ success: false, error: err.message }),
        }],
        isError: true,
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error('MCP Server error:', err);
  process.exit(1);
});
