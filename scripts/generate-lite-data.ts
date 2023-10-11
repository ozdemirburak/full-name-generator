import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LITE_SIZE = 15;
const SRC_DIR = join(__dirname, '..', 'src');
const NAMES_DIR = join(SRC_DIR, 'names');
const SURNAMES_DIR = join(SRC_DIR, 'surnames');
const LITE_NAMES_DIR = join(SRC_DIR, 'names-lite');
const LITE_SURNAMES_DIR = join(SRC_DIR, 'surnames-lite');

// Create lite directories if they don't exist
if (!existsSync(LITE_NAMES_DIR)) {
  mkdirSync(LITE_NAMES_DIR, { recursive: true });
}
if (!existsSync(LITE_SURNAMES_DIR)) {
  mkdirSync(LITE_SURNAMES_DIR, { recursive: true });
}

function extractLiteData(content: string, isGenderKeyed: boolean): string {
  const lines = content.split('\n');
  const headerComments: string[] = [];
  let dataStartIndex = 0;

  // Extract header comments (license, source, URL)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('/*') || line.startsWith(' *') || line.startsWith('//')) {
      headerComments.push(line);
    } else if (line.trim() === '') {
      continue;
    } else {
      dataStartIndex = i;
      break;
    }
  }

  // Parse the data structure
  const dataContent = lines.slice(dataStartIndex).join('\n');

  if (isGenderKeyed) {
    // Handle gender-keyed data (objects with 0 and 1 keys)
    // Match the entire object including nested content
    const maleMatch = dataContent.match(/0:\s*\[([\s\S]*?)\],?\s*1:/);
    const femaleMatch = dataContent.match(/1:\s*\[([\s\S]*?)\]\s*\}/);

    if (!maleMatch || !femaleMatch) {
      console.error(`ERROR: Could not parse gender-keyed data structure`);
      return content;
    }

    const allMaleNames = extractNames(maleMatch[1]);
    const allFemaleNames = extractNames(femaleMatch[1]);
    const maleNames = allMaleNames.slice(0, LITE_SIZE);
    const femaleNames = allFemaleNames.slice(0, LITE_SIZE);

    const varName = dataContent.match(/const\s+(\w+)\s*=/)?.[1] || 'data';

    return `${headerComments.join('\n')}
const ${varName} = {
    0: [
        ${maleNames.join(', ')}
    ],
    1: [
        ${femaleNames.join(', ')}
    ]
};

export default ${varName};
`;
  } else {
    // Handle simple array data
    const arrayMatch = dataContent.match(/const\s+\w+\s*=\s*\[([\s\S]*?)\];/);
    if (!arrayMatch) return content;

    const allNames = extractNames(arrayMatch[1]);
    const names = allNames.slice(0, LITE_SIZE);

    const varName = dataContent.match(/const\s+(\w+)\s*=/)?.[1] || 'data';

    return `${headerComments.join('\n')}
const ${varName} = [
    ${names.join(', ')}
];

export default ${varName};
`;
  }
}

function extractNames(arrayContent: string): string[] {
  // Extract all quoted strings from the array, handling escaped quotes
  // Match strings in single quotes (with possible escaped quotes) or double quotes
  const matches = arrayContent.match(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g);
  if (!matches) return [];
  // Return the matched strings WITH their quotes and escaping intact
  return matches;
}

function isGenderKeyedFile(content: string): boolean {
  // Check if the file has gender-keyed structure (0: [...], 1: [...])
  return /\{\s*0:\s*\[/.test(content);
}

function processDirectory(sourceDir: string, targetDir: string) {
  const fs = require('fs');
  const files = fs.readdirSync(sourceDir);

  for (const file of files) {
    if (!file.endsWith('.ts')) continue;

    const sourcePath = join(sourceDir, file);
    const targetPath = join(targetDir, file);
    const content = readFileSync(sourcePath, 'utf-8');

    const isGenderKeyed = isGenderKeyedFile(content);
    const liteContent = extractLiteData(content, isGenderKeyed);

    writeFileSync(targetPath, liteContent, 'utf-8');
    console.log(`✓ Generated lite version: ${file}`);
  }
}

console.log('Generating lite data files...\n');

console.log('Processing names...');
processDirectory(NAMES_DIR, LITE_NAMES_DIR);

console.log('\nProcessing surnames...');
processDirectory(SURNAMES_DIR, LITE_SURNAMES_DIR);

console.log('\n✓ Lite data generation complete!');
