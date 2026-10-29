import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error('Run this check with npm run test:package.');
const temporary = mkdtempSync(join(tmpdir(), 'full-name-generator-package-'));
const run = (command, args, cwd) => execFileSync(command, args, { cwd, stdio: 'inherit' });
const runNpm = (args, cwd) => run(process.execPath, [npmCli, ...args], cwd);

function listFiles(directory, prefix = '') {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const relative = prefix + entry.name;
    return entry.isDirectory()
      ? listFiles(join(directory, entry.name), relative + '/')
      : [relative];
  });
}

try {
  // Exercise prepack, then install exactly what would be published without install scripts.
  runNpm(['pack', '--loglevel=error', '--pack-destination', temporary], root);
  const tarballs = readdirSync(temporary).filter(file => file.endsWith('.tgz'));
  assert.equal(tarballs.length, 1, 'Expected one package tarball.');
  const tarball = join(temporary, tarballs[0]);
  const consumer = join(temporary, 'consumer');
  mkdirSync(consumer);
  writeFileSync(join(consumer, 'package.json'), '{"private":true}\n');
  runNpm([
    'install', '--offline', '--ignore-scripts', '--no-audit', '--no-fund',
    '--package-lock=false', '--cache', join(temporary, 'npm-cache'), tarball
  ], consumer);

  const installed = join(consumer, 'node_modules', 'full-name-generator');
  const manifest = JSON.parse(readFileSync(join(installed, 'package.json'), 'utf8'));
  const files = listFiles(installed);
  const required = new Set(['LICENSE', 'README.md', 'package.json']);
  for (const [entry, stem] of [['.', 'index'], ['./full', 'index.full']]) {
    const expected = {
      import: { types: `./dist/${stem}.d.mts`, default: `./dist/${stem}.mjs` },
      require: { types: `./dist/${stem}.d.cts`, default: `./dist/${stem}.js` }
    };
    assert.deepEqual(manifest.exports[entry], expected, `${entry} must expose matching ESM and CJS declarations.`);
    for (const condition of Object.values(expected)) {
      required.add(condition.types.slice(2));
      required.add(condition.default.slice(2));
    }
  }
  for (const file of required) assert.ok(files.includes(file), `Missing published file: ${file}`);
  for (const file of files) {
    assert.ok(required.has(file) || /^dist\/generator-[\w-]+\.(?:mjs|js)$/.test(file),
      `Unexpected published file (internal declarations/maps must stay out): ${file}`);
  }
  assert.equal(manifest.types, './dist/index.d.cts');
  assert.deepEqual(manifest.typesVersions, { '*': { full: ['./dist/index.full.d.cts'] } });
  assert.equal(manifest.version, JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version);
  assert.equal(manifest.license, 'MIT');
  assert.equal(readFileSync(join(installed, 'LICENSE'), 'utf8'), readFileSync(join(root, 'LICENSE'), 'utf8'));
  assert.equal(manifest.sideEffects, false, 'The package must remain eligible for tree shaking.');
  assert.equal(Object.keys(manifest.dependencies ?? {}).length, 0, 'Runtime dependencies need explicit review.');

  const unpackedBytes = files.reduce((total, file) => total + statSync(join(installed, file)).size, 0);
  const tarballBytes = statSync(tarball).size;
  // Sixteen country samples share these package budgets.
  // Leave modest headroom; intentional future data expansions must review these limits.
  assert.ok(tarballBytes <= 300_000, `Tarball is ${tarballBytes} bytes; review the 300 KB budget.`);
  assert.ok(unpackedBytes <= 650_000, `Package is ${unpackedBytes} bytes unpacked; review the 650 KB budget.`);
  for (const entry of ['dist/index.js', 'dist/index.mjs']) {
    assert.ok(statSync(join(installed, entry)).size <= 25_000, `Lite entry unexpectedly grew: ${entry}`);
  }
  for (const entry of ['dist/index.full.js', 'dist/index.full.mjs']) {
    assert.ok(statSync(join(installed, entry)).size <= 275_000, `Full entry unexpectedly grew: ${entry}`);
  }

  const checkExports = `
    for (const api of [lite, full]) {
      assert.deepEqual(Object.keys(api).sort(),
        ['Gender', 'firstName', 'fullName', 'getCountries', 'getCountryInfo', 'lastName'].sort());
      assert.equal(api.Gender.Male, 0);
      assert.equal(api.Gender.Female, 1);
      assert.deepEqual(api.getCountries(), ['at', 'cz', 'de', 'es', 'fi', 'fr', 'gb', 'ie', 'it', 'lu', 'lv', 'nl', 'no', 'pl', 'se', 'us']);
      assert.ok(api.getCountryInfo('US').firstNames.male > 0);
      assert.equal(api.getCountryInfo('PL').genderSpecificSurnames, true);
      assert.throws(() => api.lastName('PL'), /Gender is required/);
      assert.ok(api.lastName('PL', api.Gender.Female));
      assert.equal(api.getCountryInfo('CZ').genderSpecificSurnames, true);
      assert.throws(() => api.lastName('CZ'), /Gender is required/);
      assert.ok(api.lastName('CZ', api.Gender.Female));
      assert.ok(api.fullName('CZ', api.Gender.Male));
      assert.equal(api.getCountryInfo('IE').genderSpecificSurnames, true);
      assert.throws(() => api.lastName('IE'), /Gender is required/);
      assert.ok(api.lastName('IE', api.Gender.Female));
      assert.ok(api.fullName('IE', api.Gender.Male));
      assert.equal(api.getCountryInfo('NO').genderSpecificSurnames, true);
      assert.throws(() => api.lastName('NO'), /Gender is required/);
      assert.ok(api.lastName('NO', api.Gender.Female));
      assert.ok(api.fullName('NO', api.Gender.Male));
      assert.ok(api.fullName('NO', api.Gender.Female));
      assert.equal(api.getCountryInfo('LV').genderSpecificSurnames, true);
      assert.throws(() => api.lastName('LV'), /Gender is required/);
      assert.ok(api.lastName('LV', api.Gender.Female));
      assert.equal(api.getCountryInfo('SE').genderSpecificSurnames, false);
      assert.ok(api.lastName('SE'));
      assert.equal(api.getCountryInfo('IT').genderSpecificSurnames, false);
      assert.ok(api.lastName('IT'));
      assert.ok(api.fullName('IT', api.Gender.Female));
      for (const country of ['AT', 'DE', 'ES', 'FI', 'FR', 'GB', 'LU', 'NL']) {
        assert.equal(api.getCountryInfo(country).genderSpecificSurnames, false);
        assert.ok(api.lastName(country));
        assert.ok(api.fullName(country, api.Gender.Male));
        assert.ok(api.fullName(country, api.Gender.Female));
      }
      assert.ok(api.fullName('LV', api.Gender.Male));
      assert.ok(api.fullName('SE', api.Gender.Female));
      for (const removed of ['ar', 'be', 'br', 'dk', 'il', 'is', 'kr', 'kz', 'mx', 'nz', 'si', 'tr', 'tw']) {
        assert.ok(!api.getCountries().includes(removed));
        assert.throws(() => api.getCountryInfo(removed), /No data available for the ISO code/);
        assert.throws(() => api.fullName(removed, api.Gender.Male), /No data available for the ISO code/);
      }
      for (const name of [
        api.firstName('US', api.Gender.Male), api.lastName('US'), api.fullName('US', api.Gender.Female)
      ]) assert.ok(typeof name === 'string' && name.length > 0);
      const originalRandom = Math.random;
      Math.random = () => 0;
      try {
        const family = api.lastName('US');
        const given = api.firstName('US', api.Gender.Male);
        assert.equal(api.fullName('US', api.Gender.Male, 1, 1, ', ', 'family-first'), family + ', ' + given);
      } finally {
        Math.random = originalRandom;
      }
    }
    assert.ok(full.getCountryInfo('US').surnames.male > lite.getCountryInfo('US').surnames.male);
  `;
  writeFileSync(join(consumer, 'smoke.cjs'), `
    const assert = require('node:assert/strict');
    const lite = require('full-name-generator');
    const full = require('full-name-generator/full');
    ${checkExports}
  `);
  writeFileSync(join(consumer, 'smoke.mjs'), `
    import assert from 'node:assert/strict';
    import * as lite from 'full-name-generator';
    import * as full from 'full-name-generator/full';
    ${checkExports}
  `);
  run(process.execPath, ['smoke.cjs'], consumer);
  run(process.execPath, ['smoke.mjs'], consumer);

  const types = `
    import { firstName, lastName, fullName, Gender, getCountries, getCountryInfo } from 'full-name-generator';
    import type { CountryInfo, NameOrder } from 'full-name-generator';
    import { fullName as full, Gender as FullGender, getCountryInfo as fullInfo } from 'full-name-generator/full';
    import type { CountryInfo as FullCountryInfo, NameOrder as FullNameOrder } from 'full-name-generator/full';
    const order: NameOrder = 'family-first';
    const fullOrder: FullNameOrder = order;
    const values: string[] = [
      firstName('US', Gender.Male), lastName('US'), fullName('US', Gender.Female),
      full('US', FullGender.Male), full('US', Gender.Male), ...getCountries(),
      fullName('PL', Gender.Male, 1, 1, '', order), full('PL', FullGender.Female, 1, 1, '', fullOrder)
    ];
    const info: CountryInfo = getCountryInfo('US');
    const fullCountry: FullCountryInfo = fullInfo('US');
    const count: number = info.firstNames.male + fullCountry.surnames.female;
    const gendered: boolean = info.genderSpecificSurnames;
    // @ts-expect-error Country codes must be strings.
    firstName(123, Gender.Male);
    // @ts-expect-error Gender must use the public enum.
    full('US', 'female');
    // @ts-expect-error Name order must be an explicit supported value.
    fullName('US', Gender.Male, 1, 1, ' ', 'native');
    // @ts-expect-error Discovery results are strings, not numbers.
    const invalidCountries: number[] = getCountries();
  `;
  writeFileSync(join(consumer, 'types.cts'), types);
  writeFileSync(join(consumer, 'types.mts'), types);
  writeFileSync(join(consumer, 'types.ts'), types);
  const typescriptPackage = require.resolve('typescript/package.json');
  const tsc = join(dirname(typescriptPackage), require(typescriptPackage).bin.tsc);
  run(process.execPath, [
    tsc, '--noEmit', '--strict', '--target', 'ES2020',
    '--module', 'NodeNext', '--moduleResolution', 'NodeNext', 'types.cts', 'types.mts'
  ], consumer);
  run(process.execPath, [
    tsc, '--noEmit', '--strict', '--target', 'ES2020',
    '--module', 'ESNext', '--moduleResolution', 'bundler', 'types.mts'
  ], consumer);
  // node10 ignores exports; typesVersions must still resolve the /full declarations.
  run(process.execPath, [
    tsc, '--noEmit', '--strict', '--target', 'ES2020', '--ignoreDeprecations', '6.0',
    '--module', 'CommonJS', '--moduleResolution', 'node10', 'types.ts'
  ], consumer);

  for (const entry of ['full-name-generator', 'full-name-generator/full']) {
    const fixture = join(consumer, 'tree-shaking.mjs');
    writeFileSync(fixture, `export { Gender } from '${entry}';\n`);
    const result = await build({
      configFile: false,
      root: consumer,
      logLevel: 'silent',
      build: { write: false, minify: true, lib: { entry: fixture, formats: ['es'] } }
    });
    const outputs = (Array.isArray(result) ? result : [result]).flatMap(bundle => bundle.output);
    const bundledBytes = outputs.reduce((total, output) => total + Buffer.byteLength(output.type === 'chunk' ? output.code : output.source), 0);
    assert.ok(bundledBytes < 1_000, `Importing only Gender retains dataset code from ${entry} (${bundledBytes} bytes).`);
  }
  console.log(`Package verified: ${files.length} files, ${tarballBytes} bytes packed, ${unpackedBytes} bytes unpacked; CJS/ESM/types/tree shaking passed.`);
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
