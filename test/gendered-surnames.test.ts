import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createGenerators, Gender } from '../src/generator';

// Synthetic fixtures exercise this engine feature without shipping a country
// whose real-world data has not met the official-source admission policy.
describe('Gender-specific surname engine support', () => {
    const api = createGenerators(
        { xx: { 0: ['GivenM'], 1: ['GivenF'] } },
        { xx: { 0: ['FamilyM'], 1: ['FamilyF'] } }
    );

    it('reports both surname pools and selects the requested gender', () => {
        assert.equal(api.getCountryInfo('XX').genderSpecificSurnames, true);
        assert.equal(api.lastName('xx', Gender.Male), 'FamilyM');
        assert.equal(api.lastName('xx', Gender.Female), 'FamilyF');
        assert.equal(api.fullName('xx', Gender.Female), 'GivenF FamilyF');
    });

    it('requires a supported gender before drawing a surname', () => {
        const original = Math.random;
        Math.random = () => { throw new Error('Randomness must not be consumed'); };
        try {
            assert.throws(() => api.lastName('xx'), /Gender is required/);
            assert.throws(() => api.lastName('xx', 3 as Gender), /No data available.*gender: 3/);
        } finally {
            Math.random = original;
        }
    });
});
