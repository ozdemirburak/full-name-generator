import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import itNames from '../src/names/it';
import itSurnames from '../src/surnames/it';
import { getCountryInfo } from '../dist/index.full.mjs';

describe('Italian CC0 municipal source selections', () => {
    const given: { anno: string; nome: string; genere: string; cittadinanza: string; frequenza: string }[] =
        JSON.parse(readFileSync(new URL('../scripts/data/snapshots/it-bergamo-2025-names.json', import.meta.url), 'utf8'));
    const family: { anno: string; cognome: string; cittadinanza: string; frequenza: string }[] =
        JSON.parse(readFileSync(new URL('../scripts/data/snapshots/it-bergamo-2021-surnames.json', import.meta.url), 'utf8'));

    for (const gender of [0, 1] as const) {
        it(`retains every published given-name spelling for recorded gender ${gender}`, () => {
            const sex = gender === 0 ? 'Maschi' : 'Femmine';
            const source = given.filter(row => row.genere === sex);
            assert.equal(source.length, 200);
            assert.ok(source.every(row => row.anno === '2025'));
            const distinct = new Set(source.map(row => row.nome));
            assert.equal(itNames[gender].length, distinct.size);
            assert.deepEqual(new Set(itNames[gender].map(name => name.toUpperCase())), distinct);
        });
    }

    it('retains all observed surname strings once, including citizenship overlaps', () => {
        assert.equal(family.length, 1750);
        assert.ok(family.every(row => row.anno === '2021' && Number(row.frequenza) > 10));
        const distinct = new Set(family.map(row => row.cognome));
        assert.equal(distinct.size, 1732);
        assert.deepEqual(new Set(itSurnames.map(name => name.toUpperCase())), distinct);
        assert.equal(itSurnames.filter(name => name === 'Kaur').length, 1);
    });

    it('orders by the sum of disjoint published citizenship categories', () => {
        for (const [source, values, field] of [
            [given.filter(row => row.genere === 'Maschi'), itNames[0], 'nome'],
            [given.filter(row => row.genere === 'Femmine'), itNames[1], 'nome'],
            [family, itSurnames, 'cognome']
        ] as const) {
            let previous = Infinity;
            for (const value of values) {
                const matching = source.filter(row => (row as unknown as Record<string, string>)[field] === value.toUpperCase());
                assert.equal(new Set(matching.map(row => row.cittadinanza)).size, matching.length);
                const count = matching.reduce((sum, row) => sum + Number(row.frequenza), 0);
                assert.ok(count > 0 && count <= previous);
                previous = count;
            }
        }
    });

    it('preserves source apostrophes and exposes the documented municipality sample size', () => {
        assert.ok(itNames[0].includes("Niccolo'") && itNames[0].includes("Nicolo'"));
        assert.ok(itSurnames.includes("Vigano'"));
        assert.deepEqual(itNames[0].slice(0, 3), ['Andrea', 'Marco', 'Alessandro']);
        assert.deepEqual(itNames[1].slice(0, 3), ['Maria', 'Francesca', 'Anna']);
        assert.deepEqual(itSurnames.slice(0, 3), ['Rota', 'Locatelli', 'Rossi']);
        assert.deepEqual(getCountryInfo('IT'), {
            firstNames: { male: 192, female: 179 },
            surnames: { male: 1732, female: 1732 },
            genderSpecificSurnames: false
        });
    });
});
