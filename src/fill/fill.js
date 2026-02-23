import fs from 'fs-extra';
import path from 'path';
import { getPromptForSpec } from './prompts-fill.js';

/**
 * Auto-fill spec files using Claude API
 *
 * @param {string} spacDir — path to the spac/ directory
 * @param {string} projectDescription — description of the project
 * @param {object} options
 * @param {string} [options.model] — Claude model to use
 * @param {string[]} [options.specFiles] — specific files to fill (default: all with TODO markers)
 * @param {function} [options.onProgress] — callback(filename, status) for progress updates
 * @returns {Promise<{success: boolean, filled: string[], skipped: string[], errors: object[]}>}
 */
export async function fillSpecs(spacDir, projectDescription, options = {}) {
  const {
    model = 'claude-sonnet-4-20250514',
    specFiles,
    onProgress,
  } = options;

  // Dynamic import for optional dependency
  let Anthropic;
  try {
    const sdk = await import('@anthropic-ai/sdk');
    Anthropic = sdk.default;
  } catch {
    throw new Error(
      'Missing @anthropic-ai/sdk. Install it with: npm install @anthropic-ai/sdk\n' +
      'Also set ANTHROPIC_API_KEY environment variable.'
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY environment variable is required.');
  }

  const client = new Anthropic();

  // Find files to fill
  let filesToFill;
  if (specFiles && specFiles.length > 0) {
    filesToFill = specFiles;
  } else {
    // Find all .md files with <!-- TODO --> markers
    const allFiles = await fs.readdir(spacDir);
    filesToFill = [];
    for (const file of allFiles) {
      if (!file.endsWith('.md')) continue;
      const content = await fs.readFile(path.join(spacDir, file), 'utf-8');
      if (content.includes('<!-- TODO -->')) {
        filesToFill.push(file);
      }
    }
  }

  if (filesToFill.length === 0) {
    return { success: true, filled: [], skipped: [], errors: [], message: 'No files with TODO markers found.' };
  }

  const filled = [];
  const skipped = [];
  const errors = [];

  // Read all specs first for cross-reference context
  const allSpecContents = {};
  const allFiles = await fs.readdir(spacDir);
  for (const file of allFiles) {
    if (file.endsWith('.md')) {
      allSpecContents[file] = await fs.readFile(path.join(spacDir, file), 'utf-8');
    }
  }

  for (const filename of filesToFill) {
    try {
      if (onProgress) onProgress(filename, 'filling');

      const filePath = path.join(spacDir, filename);
      const currentContent = await fs.readFile(filePath, 'utf-8');

      if (!currentContent.includes('<!-- TODO -->')) {
        skipped.push(filename);
        if (onProgress) onProgress(filename, 'skipped');
        continue;
      }

      const promptConfig = getPromptForSpec(filename);

      // Build context from other specs (exclude current file)
      const contextSpecs = Object.entries(allSpecContents)
        .filter(([f]) => f !== filename)
        .map(([f, content]) => `--- ${f} ---\n${content}`)
        .join('\n\n');

      const userMessage = `Project Description: ${projectDescription}

Here is the current spec file to fill (replace all <!-- TODO --> markers with real content):

--- ${filename} ---
${currentContent}

${contextSpecs ? `\nOther spec files for context:\n\n${contextSpecs}` : ''}

Return ONLY the completed markdown content for ${filename}. No explanations, no code fences around the entire output.`;

      const response = await client.messages.create({
        model,
        max_tokens: 8192,
        system: promptConfig.system,
        messages: [{ role: 'user', content: userMessage }],
      });

      const filledContent = response.content[0].text;

      await fs.writeFile(filePath, filledContent, 'utf-8');
      // Update our context cache
      allSpecContents[filename] = filledContent;

      filled.push(filename);
      if (onProgress) onProgress(filename, 'done');
    } catch (err) {
      errors.push({ file: filename, error: err.message });
      if (onProgress) onProgress(filename, 'error');
    }
  }

  return {
    success: errors.length === 0,
    filled,
    skipped,
    errors,
    message: `Filled ${filled.length}/${filesToFill.length} files.`,
  };
}
