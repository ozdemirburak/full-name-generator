import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { selectAuthorityNames, readRegistryNames } from '../scripts/authority-data.mjs';
import { names } from '../src/names';
import { surnames } from '../src/surnames';
import { getCountryInfo } from '../dist/index.full.mjs';

describe('CC0 authority and registry samples', () => {
    for (const [country, expected] of Object.entries({
        at: [566, 468, 1000], cz: [266, 121, 425, 52], de: [1000, 1000, 1000],
        es: [478, 288, 1000], fi: [177, 117, 404], fr: [803, 540, 1000],
        gb: [778, 711, 1000], ie: [120, 75, 118, 38], lu: [49, 54, 43], nl: [549, 374, 1000], no: [215, 123, 152, 44]
    })) {
        it(`exposes the reviewed ${country.toUpperCase()} sample sizes`, () => {
            assert.deepEqual(getCountryInfo(country), {
                firstNames: { male: expected[0], female: expected[1] },
                surnames: { male: expected[2], female: expected[3] ?? expected[2] },
                genderSpecificSurnames: ['cz', 'ie', 'no'].includes(country)
            });
        });
        const pools = ['cz', 'ie', 'no'].includes(country) ? ['male', 'female', 'male-surnames', 'female-surnames']
            : country === 'lu' ? ['surnames'] : ['male', 'female', 'surnames'];
        for (const pool of pools) {
            // Complete aggregate snapshots can be several MB. Allow bounded
            // fixture I/O time on shared/CI disks without relaxing API tests.
            it(`keeps every ${country} ${pool} entry traceable to an aggregate with at least five records`, { timeout: 30_000 }, () => {
                const response = JSON.parse(readFileSync(new URL(
                    `../scripts/data/snapshots/${country}-gnd-2026-${pool}.json`, import.meta.url), 'utf8'));
                const counts = new Map<string, number>(response.results.bindings.map((row: any) =>
                    [row.name.value.normalize('NFC'), Number(row.count.value)]));
                const gender = pool.startsWith('female') ? 1 : 0;
                const family = surnames[country];
                const list = pool.endsWith('surnames')
                    ? Array.isArray(family) ? family : family[gender]
                    : names[country][gender];
                assert.equal(new Set(list).size, list.length);
                let previousCount = Infinity;
                let previousName = '';
                for (const name of list) {
                    const count = counts.get(name);
                    assert.ok(count !== undefined && count >= 5 && count <= previousCount);
                    if (count === previousCount) assert.ok(Buffer.compare(Buffer.from(previousName), Buffer.from(name)) < 0);
                    assert.equal(name, name.normalize('NFC'));
                    previousCount = count;
                    previousName = name;
                }
            });
        }
    }

    it('retains original prefixes, leading apostrophes, compounds and Unicode accents', () => {
        assert.ok((surnames.nl as string[]).includes("'t Hart"));
        assert.ok((surnames.nl as string[]).includes('de Vries'));
        assert.ok((surnames.nl as string[]).includes('van den Berg'));
        assert.ok((surnames.de as string[]).includes('Müller'));
        assert.ok(names.de[0].some(name => name.includes('-')));
        for (const country of ['at', 'cz', 'de', 'es', 'fi', 'fr', 'gb', 'ie', 'nl', 'no']) {
            for (const list of Object.values(names[country])) {
                assert.ok(list.every(name => name.split(/[ -]/u).every(part => [...part].length >= 2)));
            }
        }
    });

    it('preserves Czech observed surname forms separately without forcing suffixes', () => {
        const family = surnames.cz;
        assert.ok(!Array.isArray(family));
        assert.ok(family[0].includes('Novák'));
        assert.ok(family[1].includes('Nováková'));
        assert.ok(family[1].includes('Svobodová'));
        assert.ok(family[1].includes('Petschek'));
    });

    it('preserves Spanish compounds and complete surname fields', () => {
        assert.ok(names.es[0].includes('José María'));
        assert.ok(names.es[1].includes('María del Carmen'));
        assert.ok((surnames.es as string[]).includes('de la Torre'));
        assert.ok((surnames.es as string[]).includes('García García'));
    });

    it('keeps the observed Irish masculine form out of the female surname pool', () => {
        const family = surnames.ie;
        assert.ok(!Array.isArray(family));
        assert.ok(family[0].includes('Ó Ceallaigh'));
        assert.ok(!family[1].includes('Ó Ceallaigh'));
        assert.ok(family[0].includes('Murphy') && family[1].includes('Murphy'));
    });

    it('preserves Norwegian spelling and surnames observed in both sex-specific pools', () => {
        const family = surnames.no;
        assert.ok(!Array.isArray(family));
        assert.ok(names.no[0].includes('Bjørn'));
        assert.ok(family[0].includes('Larsen') && family[1].includes('Larsen'));
    });

    it('requires the reviewed country and explicit sex substitutions in new queries', () => {
        const load = (filename: string) => JSON.parse(readFileSync(new URL(
            `../scripts/data/${filename}`, import.meta.url), 'utf8'));
        for (const country of ['cz', 'es', 'fi', 'fr', 'gb', 'ie', 'no']) {
            const pools = ['cz', 'ie', 'no'].includes(country) ? ['male', 'female', 'male-surnames', 'female-surnames']
                : ['male', 'female', 'surnames'];
            for (const pool of pools) {
                const basePool = pool.endsWith('surnames') ? 'surnames' : pool;
                let query = load(`nl-gnd-2026-${basePool}.json`).query.replaceAll('XA-NL', `XA-${country.toUpperCase()}`);
                if (['cz', 'ie', 'no'].includes(country) && pool.endsWith('surnames')) {
                    query = query.replaceAll('?sex', `gender:${pool.startsWith('female') ? 'female' : 'male'}`);
                }
                assert.equal(load(`${country}-gnd-2026-${pool}.json`).query, query);
            }
        }
    });

    it('preserves RNPP sex-specific source order and Windows-1252 accents', () => {
        const bytes = readFileSync(new URL('../scripts/data/snapshots/lu-rnpp-2020-names.csv', import.meta.url));
        const rows = new TextDecoder('windows-1252').decode(bytes).trim().split('\r\n').slice(1);
        for (const [gender, sex] of [[0, 'M'], [1, 'F']] as const) {
            assert.deepEqual(names.lu[gender], rows.filter(row => row.endsWith(`,${sex}`)).map(row => row.split(',')[0]));
        }
        assert.deepEqual(names.lu[0].slice(0, 3), ['Gabriel', 'Liam', 'Louis']);
        assert.deepEqual(names.lu[1].slice(0, 3), ['Emma', 'Mia', 'Sophie']);
        assert.ok(names.lu[0].includes('Lou') && names.lu[1].includes('Lou'));
        assert.ok([...names.lu[0], ...names.lu[1]].some(name => /[éë]/u.test(name)));
    });

    const response = (values: [string, string][]) => ({
        head: { vars: ['name', 'count'] },
        results: { bindings: values.map(([name, count]) => ({ name: { type: 'literal', value: name }, count: { value: count } })) },
        meta: { 'result-size-total': values.length }
    });
    it('rejects truncated results, invalid counts and overlapping normalized variants', () => {
        const truncated = response([['Anna', '5']]);
        truncated.meta['result-size-total'] = 2;
        assert.throws(() => selectAuthorityNames(truncated, 'female'), /Truncated/);
        for (const count of ['4', '-5', '5.5', '9007199254740992']) {
            assert.throws(() => selectAuthorityNames(response([['Anna', count]]), 'female'), /Invalid authority count/);
        }
        assert.throws(() => selectAuthorityNames(response([['Mu\u0308ller', '10'], ['Müller', '9']]), 'surnames'), /Duplicate normalized/);
    });
    it('excludes initials and descriptors without dropping valid surname apostrophes', () => {
        assert.deepEqual(selectAuthorityNames(response([['A', '10'], ['A. B.', '9'], ['A B', '8'], ['Anna 2', '7'], ['Anna', '5']]), 'female').names, ['Anna']);
        assert.deepEqual(selectAuthorityNames(response([["'t Hart", '14']]), 'surnames').names, ["'t Hart"]);
    });
    it('rejects unknown RNPP sex labels and duplicate rows within a sex', () => {
        assert.throws(() => readRegistryNames(Buffer.from('PRENOM,SEXE\r\nLou,X\r\n')), /Unreviewed RNPP sex/);
        assert.throws(() => readRegistryNames(Buffer.from('PRENOM,SEXE\r\nLou,F\r\nLou,F\r\n')), /Duplicate RNPP/);
    });
});
