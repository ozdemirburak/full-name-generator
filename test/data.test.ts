import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { names } from '../src/names';
import { surnames } from '../src/surnames';

const countries = Object.keys(names).sort();
const fileCountries = (directory: string) => readdirSync(new URL(directory, import.meta.url))
    .filter(file => file.endsWith('.ts')).map(file => file.slice(0, -3)).sort();

describe('Name dataset integrity', () => {
    it('registers every country file in both datasets', () => {
        assert.deepEqual(Object.keys(surnames).sort(), countries);
        assert.deepEqual(fileCountries('../src/names/'), countries);
        assert.deepEqual(fileCountries('../src/surnames/'), countries);
    });

    for (const [kind, data] of Object.entries({ names, surnames })) {
        for (const [country, value] of Object.entries(data)) {
            const buckets = Array.isArray(value) ? { shared: value } : value;
            if (!Array.isArray(value)) {
                it(`${kind}/${country} defines both supported genders`, () => {
                    assert.deepEqual(Object.keys(value).sort(), ['0', '1']);
                });
            }
            for (const [gender, values] of Object.entries(buckets)) {
                it(`${kind}/${country}/${gender} contains unique, valid names`, () => {
                    assert.ok(values.length >= 15, 'Every bucket must support the 15-item lite edition');
                    assert.equal(new Set(values).size, values.length, 'Repeated strings would bias selection');
                    for (const name of values) {
                        assert.equal(typeof name, 'string');
                        assert.ok(name.length > 0);
                        assert.equal(name, name.trim());
                        assert.equal(name, name.normalize('NFC'));
                    }
                });
            }

            it(`${kind}/${country} retains source and license attribution`, () => {
                const source = readFileSync(new URL(`../src/${kind}/${country}.ts`, import.meta.url), 'utf8');
                assert.match(source, /data source:/i);
                assert.match(source, /Source data licence \(publisher\):/);
                assert.match(source, /URL: https:\/\//);
            });
        }
    }

    it('includes the first 1,000 Census surnames', () => {
        const us = surnames.us;
        assert.ok(Array.isArray(us));
        assert.equal(us.length, 1000);
        assert.deepEqual(us.slice(0, 15), [
            'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
            'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
        ]);
        assert.equal(us[999], 'Archer');
        assert.ok(!us.includes('All other names'), 'The Census aggregate is not a surname');
    });

    it('matches every US given name to the complete SSA 2025 rankings', () => {
        const source = JSON.parse(readFileSync(new URL('../scripts/data/us-ssa-2025.json', import.meta.url), 'utf8'));
        const readPinned = (path: string, checksum: string) => {
            const input = readFileSync(new URL(`../scripts/data/${path}`, import.meta.url));
            assert.equal(createHash('sha256').update(input).digest('hex'), checksum);
            return input.toString('utf8');
        };
        const rows = readPinned(source.snapshot, source.sha256).trimEnd().split('\n').slice(1)
            .map(line => {
                const [gender, rank, name] = line.split(',');
                return { gender, rank: Number(rank), name };
            });
        assert.equal(rows.length, 2000);
        for (const [gender, key] of [['M', 0], ['F', 1]] as const) {
            const ranked = rows.filter(row => row.gender === gender).sort((a, b) => a.rank - b.rank);
            assert.deepEqual(ranked.map(row => row.rank), Array.from({ length: 1000 }, (_, i) => i + 1));
            assert.equal(new Set(ranked.map(row => row.name)).size, 1000);
            assert.equal(names.us[key].length, 1000);
            assert.deepEqual(names.us[key], ranked.map(row => row.name));
        }
    });

});
