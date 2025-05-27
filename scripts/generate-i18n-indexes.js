#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const chokidar = require('chokidar');

const localesDir = path.join(__dirname, '..', 'public', 'locales');

/**
 * Recursively finds all .json files in a directory and its subdirectories,
 * generating namespace strings from their paths relative to the base language directory.
 *
 * @param {string} baseDir The base directory for the current language (e.g., public/locales/en).
 * @param {string} currentDir The directory currently being scanned.
 * @returns {Promise<string[]>} A promise that resolves to an array of namespace strings.
 */
async function getNamespaces(baseDir, currentDir) {
  let namespaces = [];
  try {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const entryPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        namespaces = namespaces.concat(await getNamespaces(baseDir, entryPath));
      } else if (entry.isFile() && entry.name.endsWith('.json') && entry.name !== 'index.json') {
        const relativePath = path.relative(baseDir, entryPath);
        const namespace = relativePath.replace(/\.json$/, '').replace(/\\/g, '/'); // Ensure POSIX paths for namespaces
        namespaces.push(namespace);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${currentDir}: ${error.message}`);
    // Decide if we should re-throw or return empty/partial results
  }
  return namespaces;
}

/**
 * Main function to generate index.json files for all language directories.
 */
async function generateIndexes() {
  console.log(`Starting generation of index.json files in ${localesDir}...\n`);

  try {
    const langDirs = await fs.readdir(localesDir, { withFileTypes: true });

    for (const langDirEntry of langDirs) {
      if (langDirEntry.isDirectory()) {
        const langCode = langDirEntry.name;
        const langDirPath = path.join(localesDir, langCode);
        console.log(`Processing language: ${langCode}`);

        const namespaces = await getNamespaces(langDirPath, langDirPath);

        if (namespaces.length === 0) {
          console.log(`  No JSON files found for language ${langCode} (excluding index.json). Skipping index generation.`);
          continue;
        }

        namespaces.sort();

        const indexFilePath = path.join(langDirPath, 'index.json');
        const jsonData = JSON.stringify(namespaces, null, 2);

        try {
          await fs.writeFile(indexFilePath, jsonData);
          console.log(`  Successfully generated index.json for ${langCode} at ${indexFilePath}`);
        } catch (writeError) {
          console.error(`  Error writing index.json for ${langCode}: ${writeError.message}`);
        }
        console.log('  Namespaces found:', namespaces);
        console.log('\n');
      }
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(
        `Error: Locales directory not found at ${localesDir}. Please ensure this directory exists and contains language subdirectories.`
      );
    } else {
      console.error(`Error reading locales directory ${localesDir}: ${error.message}`);
    }
    process.exitCode = 1; // Indicate failure
    return;
  }

  console.log('Finished generating all index.json files.');
}

// Main execution logic
async function main() {
  if (process.argv.includes('--watch')) {
    console.log('Initial generation before watching...');
    await generateIndexes();
    console.log('\nWatching for file changes in', localesDir, '(excluding index.json files)...\n');

    const watcher = chokidar.watch(path.join(localesDir, '**/*.json'), {
      ignored: (filePath) => path.basename(filePath) === 'index.json',
      ignoreInitial: true, // Don't trigger for existing files on startup
      persistent: true,
    });

    watcher
      .on('add', async (filePath) => {
        console.log(`File ${path.relative(localesDir, filePath)} has been added. Regenerating indexes...`);
        await generateIndexes();
      })
      .on('change', async (filePath) => {
        console.log(`File ${path.relative(localesDir, filePath)} has been changed. Regenerating indexes...`);
        await generateIndexes();
      })
      .on('unlink', async (filePath) => {
        console.log(`File ${path.relative(localesDir, filePath)} has been unlinked. Regenerating indexes...`);
        await generateIndexes();
      })
      .on('error', (error) => console.error(`Watcher error: ${error}`))
      .on('ready', () => console.log('Initial scan complete. Ready for changes.'));
  } else {
    await generateIndexes();
  }
}

main().catch((error) => {
  console.error(`An unexpected error occurred: ${error.message}`);
  process.exitCode = 1; // Indicate failure
});
