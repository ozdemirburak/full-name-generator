import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { names } from '../src/names';
import { surnames } from '../src/surnames';

describe('Polish PESEL source selections', () => {
    for (const [kind, dataset] of [['names', names.pl], ['surnames', surnames.pl]] as const) {
        it(`matches all ${kind} to the ranked source strings without inferring gender forms`, () => {
            const input = readFileSync(new URL(`../scripts/data/snapshots/pl-pesel-2026-${kind}.tsv`, import.meta.url), 'utf8');
            const records = input.trimEnd().split('\n').slice(1).map(line => {
                const [gender, name, count] = line.split('\t');
                return { gender: Number(gender), name, count: Number(count) };
            });
            for (const gender of [0, 1]) {
                const selected = records.filter(row => row.gender === gender);
                assert.equal(selected.length, 1000);
                assert.equal(dataset[gender].length, 1000);
                for (let index = 0; index < selected.length; index++) {
                    // Case is the only transformation applied to selected source strings.
                    assert.equal(dataset[gender][index].toUpperCase().normalize('NFC'), selected[index].name);
                    if (index) assert.ok(selected[index - 1].count >= selected[index].count);
                }
            }
        });
    }
    it('preserves source accents and distinct surname forms', () => {
        assert.equal(names.pl[0][0], 'Piotr');
        assert.equal(names.pl[1][0], 'Anna');
        assert.deepEqual(surnames.pl[0].slice(0, 3), ['Nowak', 'Kowalski', 'Wiśniewski']);
        assert.deepEqual(surnames.pl[1].slice(0, 3), ['Nowak', 'Kowalska', 'Wiśniewska']);
    });
});
