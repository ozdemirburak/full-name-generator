import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import * as lite from '../dist/index.mjs';
import * as full from '../dist/index.full.mjs';

// Restore a country only after a complete replacement and its reuse terms have
// been verified; changing a source comment alone does not satisfy that review.
const removedCountries = ['ar', 'be', 'br', 'dk', 'il', 'is', 'kr', 'kz', 'mx', 'nz', 'si', 'tr', 'tw'];

describe('Countries removed after source review', () => {
    for (const country of removedCountries) {
        it(`${country} has no remaining full or generated lite data files`, () => {
            for (const directory of ['names', 'surnames', 'names-lite', 'surnames-lite']) {
                assert.equal(existsSync(new URL(`../src/${directory}/${country}.ts`, import.meta.url)), false);
            }
        });

        for (const [edition, api] of [['lite', lite], ['full', full]] as const) {
            it(`${edition} does not advertise or generate ${country} names`, () => {
                assert.ok(!api.getCountries().includes(country));
                for (const code of [country, country.toUpperCase()]) {
                    assert.throws(() => api.getCountryInfo(code), /No data available for the ISO code/);
                    assert.throws(() => api.firstName(code, api.Gender.Male), /No data available for the ISO code/);
                    assert.throws(() => api.lastName(code), /No data available for the ISO code/);
                    assert.throws(() => api.fullName(code, api.Gender.Female), /No data available for the ISO code/);
                }
            });
        }
    }
});
