import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import lvNames from '../src/names/lv';
import lvSurnames from '../src/surnames/lv';
import seNames from '../src/names/se';
import seSurnames from '../src/surnames/se';
import { getCountryInfo } from '../dist/index.full.mjs';

describe('Swedish and Latvian official CC0 selections', () => {
    for (const [filename, pools] of [
        ['lv-pmlp-2026-names', [lvNames[0], lvNames[1]]],
        ['lv-archives-surnames', [lvSurnames[0], lvSurnames[1]]],
        ['se-scb-2022-names', [seNames[0], seNames[1]]],
        ['se-scb-2020-surnames', [seSurnames]]
    ] as const) {
        it(`matches every shipped entry to ${filename}`, () => {
            const manifest = JSON.parse(readFileSync(new URL(`../scripts/data/${filename}.json`, import.meta.url), 'utf8'));
            const input = readFileSync(new URL(`../scripts/data/${manifest.snapshot}`, import.meta.url), 'utf8');
            const lines = input.trimEnd().split('\n');
            assert.equal(lines.shift(), 'gender\tname\tcount');
            const records = lines.map(line => {
                const fields = line.split('\t');
                assert.equal(fields.length, 3, 'Only sex, name and aggregate count may be retained');
                assert.ok(Number(fields[2]) >= manifest.minimumCount);
                return fields;
            });
            pools.forEach((pool, index) => {
                const gender = pools.length === 1 ? '*' : String(index);
                const selected = records.filter(row => row[0] === gender);
                assert.equal(pool.length, selected.length);
                selected.forEach((row, position) => {
                    const actual = filename === 'lv-pmlp-2026-names'
                        ? pool[position].toUpperCase().normalize('NFC') : pool[position];
                    assert.equal(actual, row[1]);
                });
            });
            assert.equal(manifest.rights.attributionRequired, false);
            assert.equal(manifest.rights.basis, 'CC0-1.0');
        });
    }

    it('preserves observed Latvian surname forms without constructing suffixes', () => {
        assert.deepEqual(lvNames[0].slice(0, 3), ['Jānis', 'Aleksandrs', 'Sergejs']);
        assert.deepEqual(lvSurnames[0].slice(0, 3), ['Bērziņš', 'Kalniņš', 'Ozoliņš']);
        assert.deepEqual(lvSurnames[1].slice(0, 3), ['Kalniņa', 'Bērziņa', 'Ozoliņa']);
        assert.deepEqual(getCountryInfo('LV'), {
            firstNames: { male: 1000, female: 1000 },
            surnames: { male: 635, female: 278 },
            genderSpecificSurnames: true
        });
    });

    it('keeps Swedish newborn categories and shared registered surnames distinct', () => {
        assert.deepEqual(seNames[0].slice(0, 3), ['Liam', 'William', 'Hugo']);
        assert.deepEqual(seSurnames.slice(0, 3), ['Andersson', 'Johansson', 'Karlsson']);
        assert.deepEqual(getCountryInfo('SE'), {
            firstNames: { male: 1000, female: 1000 },
            surnames: { male: 1000, female: 1000 },
            genderSpecificSurnames: false
        });
    });
});
