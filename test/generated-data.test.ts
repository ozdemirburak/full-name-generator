import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { names } from '../src/names';
import { surnames } from '../src/surnames';
import { names as liteNames } from '../src/names-lite';
import { surnames as liteSurnames } from '../src/surnames-lite';
import { LITE_SIZE, validateData, validateRegistry } from '../scripts/lib/data-validation';

const requireData = createRequire(import.meta.url);
const sourceDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src');

describe('Build dataset validation', () => {
  const list = () => Array.from({ length: LITE_SIZE }, (_, index) => `Name${index}`);
  const genders = () => ({ 0: list(), 1: list() });

  it('accepts valid accents, apostrophes, and gender-specific or neutral surname lists', () => {
    const valid = ['Élodie', "O’Connor", 'de la Cruz', ...list().slice(3)];
    assert.doesNotThrow(() => validateData(valid, 'surnames', 'xx'));
    assert.doesNotThrow(() => validateData({ 0: valid, 1: list() }, 'names', 'xx'));
    assert.doesNotThrow(() => validateData(genders(), 'surnames', 'xx'));
  });

  for (const [label, invalid, message] of [
    ['short lists', list().slice(1), /at least 15/],
    ['empty lists', [], /at least 15/],
    ['empty strings', ['', ...list().slice(1)], /nonempty, trimmed/],
    ['untrimmed strings', [' Name', ...list().slice(1)], /nonempty, trimmed/],
    ['non-string entries', [42, ...list().slice(1)], /nonempty, trimmed/],
    ['missing array entries', Array(LITE_SIZE), /nonempty, trimmed/],
    ['duplicates', [...list(), 'Name0'], /duplicate name/],
    ['non-NFC text', ['E\u0301lodie', ...list().slice(1)], /not NFC-normalized/]
  ] as const) {
    it(`rejects ${label} in neutral and gender-specific lists before generation`, () => {
      assert.throws(() => validateData(invalid, 'surnames', 'xx'), message);
      assert.throws(() => validateData({ 0: list(), 1: invalid }, 'names', 'xx'), message);
    });
  }

  for (const [label, invalid] of [
    ['null', null],
    ['a neutral first-name list', list()],
    ['a missing gender', { 0: list() }],
    ['an extra gender', { ...genders(), 2: list() }]
  ] as const) {
    it(`rejects ${label} as gender data`, () => {
      assert.throws(() => validateData(invalid, 'names', 'xx'), /exactly the gender keys/);
    });
  }

  for (const invalid of [undefined, null, [], 'names']) {
    it(`rejects malformed registry ${JSON.stringify(invalid)}`, () => {
      assert.throws(() => validateRegistry(invalid, 'names', { xx: genders() }), /registry object/);
    });
  }

  it('requires exact country coverage and the actual matching country module', () => {
    const datasets = { xx: genders(), yy: genders() };
    assert.doesNotThrow(() => validateRegistry(datasets, 'names', datasets));
    assert.throws(() => validateRegistry({ xx: datasets.xx }, 'names', datasets), /every country/);
    assert.throws(() => validateRegistry({ ...datasets, zz: genders() }, 'names', datasets), /every country/);
    assert.throws(() => validateRegistry({ xx: datasets.yy, yy: datasets.xx }, 'names', datasets), /register xx from names\/xx.ts/);
    assert.throws(() => validateRegistry({ ...datasets, xx: genders() }, 'names', datasets), /register xx from names\/xx.ts/);
  });

  it('validates the entries of every registered country', () => {
    const datasets = { xx: { 0: list(), 1: list().slice(1) } };
    assert.throws(() => validateRegistry(datasets, 'names', datasets), /names\/xx\/1 must contain at least 15/);
  });
});

describe('Generated lite data', () => {
  for (const [kind, source, lite] of [
    ['names', names, liteNames],
    ['surnames', surnames, liteSurnames]
  ] as const) {
    it(`${kind} retains every country`, () => {
      assert.deepEqual(Object.keys(lite).sort(), Object.keys(source).sort());
    });

    for (const country of Object.keys(source)) {
      it(`${kind}/${country} preserves the first 15 entries and source attribution`, () => {
        const original = source[country];
        const expected = Array.isArray(original)
          ? original.slice(0, 15)
          : { 0: original[0].slice(0, 15), 1: original[1].slice(0, 15) };
        assert.deepEqual(lite[country], expected);
        assert.deepEqual(requireData(join(sourceDir, `${kind}-lite`, `${country}.ts`)).default, expected);

        const originalText = readFileSync(join(sourceDir, kind, `${country}.ts`), 'utf8');
        const generatedText = readFileSync(join(sourceDir, `${kind}-lite`, `${country}.ts`), 'utf8');
        const comments = ts.getLeadingCommentRanges(originalText, 0) ?? [];
        assert.ok(comments.length > 0, 'Source attribution must be present.');
        for (const comment of comments) {
          assert.ok(generatedText.includes(originalText.slice(comment.pos, comment.end)));
        }
      });
    }
  }
});
