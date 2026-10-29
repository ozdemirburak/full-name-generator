import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import * as liteApi from '../dist/index.mjs';
import * as fullApi from '../dist/index.full.mjs';
import { names } from '../src/names';
import { surnames } from '../src/surnames';

const withRandom = <T>(value: number, run: () => T): T => {
    const original = Math.random;
    Math.random = () => value;
    try {
        return run();
    } finally {
        Math.random = original;
    }
};

const countries = Object.keys(names);
const genderSpecificCountries = countries.filter(country => !Array.isArray(surnames[country]));

for (const [version, api, limit] of [
    ['Lite', liteApi, 15],
    ['Full', fullApi, Infinity]
] as const) {
    const firstNamesFor = (country: string, gender: number) => names[country][gender].slice(0, limit);
    const surnamesFor = (country: string, gender: number) => {
        const data = surnames[country];
        return (Array.isArray(data) ? data : data[gender]).slice(0, limit);
    };

    describe(`${version} API`, () => {
        it('exports the documented gender values', () => {
            assert.equal(api.Gender.Male, 0);
            assert.equal(api.Gender.Female, 1);
        });

        it('has matching country coverage for names and surnames', () => {
            assert.deepEqual(Object.keys(surnames).sort(), [...countries].sort());
        });

        it('returns a sorted, independent list of supported country codes', () => {
            const expected = [...countries].sort();
            const discovered = api.getCountries();
            assert.deepEqual(discovered, expected);
            discovered.reverse();
            discovered.splice(0, 1, 'invalid');
            assert.deepEqual(api.getCountries(), expected);
        });

        for (const country of countries) {
            it(`reports the ${country} counts and surname requirements for this edition`, () => {
                const expected = {
                    firstNames: {
                        male: firstNamesFor(country, api.Gender.Male).length,
                        female: firstNamesFor(country, api.Gender.Female).length
                    },
                    surnames: {
                        male: surnamesFor(country, api.Gender.Male).length,
                        female: surnamesFor(country, api.Gender.Female).length
                    },
                    genderSpecificSurnames: !Array.isArray(surnames[country])
                };
                assert.deepEqual(api.getCountryInfo(country), expected);
                assert.deepEqual(api.getCountryInfo(country.toUpperCase()), expected);
            });

            for (const gender of [api.Gender.Male, api.Gender.Female]) {
                it(`selects every ${country}/${gender} first name and preserves its spelling`, () => {
                    const expected = firstNamesFor(country, gender);
                    assert.ok(expected.length > 0);
                    expected.forEach((name, index) => {
                        withRandom((index + 0.5) / expected.length, () => {
                            assert.equal(api.firstName(country, gender), name);
                        });
                    });
                });

                it(`selects every ${country}/${gender} surname and preserves its spelling`, () => {
                    const expected = surnamesFor(country, gender);
                    assert.ok(expected.length > 0);
                    expected.forEach((surname, index) => {
                        withRandom((index + 0.5) / expected.length, () => {
                            assert.equal(api.lastName(country, gender), surname);
                            if (Array.isArray(surnames[country])) {
                                assert.equal(api.lastName(country), surname);
                            }
                        });
                    });
                });

                it(`formats ${country}/${gender} full names and accepts uppercase country codes`, () => {
                    withRandom(0, () => {
                        const first = firstNamesFor(country, gender)[0];
                        const last = surnamesFor(country, gender)[0];
                        assert.equal(api.fullName(country, gender), `${first} ${last}`);
                        assert.equal(api.fullName(country.toUpperCase(), gender), `${first} ${last}`);
                        assert.equal(api.firstName(country.toUpperCase(), gender), first);
                        assert.equal(api.lastName(country.toUpperCase(), gender), last);
                    });
                });
            }
        }

        it('discovers countries and metadata without consuming randomness', () => {
            const original = Math.random;
            Math.random = () => { throw new Error('Discovery must not consume randomness'); };
            try {
                assert.deepEqual(api.getCountries(), [...countries].sort());
                for (const country of countries) {
                    assert.ok(api.getCountryInfo(country).firstNames.male > 0);
                }
            } finally {
                Math.random = original;
            }
        });

        it('keeps metadata and generation unchanged when returned metadata is mutated', () => {
            for (const country of countries) {
                const expected = api.getCountryInfo(country);
                const changed = api.getCountryInfo(country);
                assert.notEqual(changed, expected);
                assert.notEqual(changed.firstNames, expected.firstNames);
                assert.notEqual(changed.surnames, expected.surnames);
                changed.firstNames.male = 0;
                changed.firstNames.female = 0;
                changed.surnames.male = 0;
                changed.surnames.female = 0;
                changed.genderSpecificSurnames = !changed.genderSpecificSurnames;
                assert.deepEqual(api.getCountryInfo(country), expected);
                withRandom(0, () => {
                    for (const gender of [api.Gender.Male, api.Gender.Female]) {
                        assert.equal(api.firstName(country, gender), firstNamesFor(country, gender)[0]);
                        assert.equal(api.lastName(country, gender), surnamesFor(country, gender)[0]);
                    }
                });
            }
        });

        it('selects the first and final array entries at random-number boundaries', () => {
            for (const country of countries) {
                for (const gender of [api.Gender.Male, api.Gender.Female]) {
                    const first = firstNamesFor(country, gender);
                    const last = surnamesFor(country, gender);
                    withRandom(0, () => {
                        assert.equal(api.firstName(country, gender), first[0]);
                        assert.equal(api.lastName(country, gender), last[0]);
                    });
                    withRandom(1 - Number.EPSILON, () => {
                        assert.equal(api.firstName(country, gender), first[first.length - 1]);
                        assert.equal(api.lastName(country, gender), last[last.length - 1]);
                    });
                }
            }
        });

        it('generates requested counts and applies the separator between name groups', () => {
            withRandom(0, () => {
                const first = firstNamesFor('us', api.Gender.Male)[0];
                const last = surnamesFor('us', api.Gender.Male)[0];
                assert.equal(api.firstName('us', api.Gender.Male, 3), `${first} ${first} ${first}`);
                assert.equal(api.lastName('us', undefined, 3), `${last} ${last} ${last}`);
                assert.equal(api.fullName('us', api.Gender.Male, 2, 2, '-'), `${first} ${first}-${last} ${last}`);
                assert.equal(api.fullName('us', api.Gender.Male, 1, 1, ''), `${first}${last}`);
            });
        });

        it('rejects unsupported country codes, including inherited object properties', () => {
            for (const country of ['', 'invalid', '__proto__', 'constructor', 'prototype', 'toString']) {
                assert.throws(() => api.firstName(country, api.Gender.Male), /No data available for the ISO code/);
                assert.throws(() => api.lastName(country), /No data available for the ISO code/);
                assert.throws(() => api.fullName(country, api.Gender.Female), /No data available for the ISO code/);
                assert.throws(() => api.getCountryInfo(country), /No data available for the ISO code/);
            }
        });

        it('supports explicit family-first order with multiple names and custom separators', () => {
            withRandom(0, () => {
                for (const country of countries) {
                    for (const gender of [api.Gender.Male, api.Gender.Female]) {
                        const first = firstNamesFor(country, gender)[0];
                        const last = surnamesFor(country, gender)[0];
                        assert.equal(api.fullName(country, gender, 1, 1, ' ', 'given-first'), `${first} ${last}`);
                        assert.equal(api.fullName(country, gender, 1, 1, '', 'family-first'), `${last}${first}`);
                        assert.equal(api.fullName(country, gender, 2, 2, ', ', 'family-first'), `${last} ${last}, ${first} ${first}`);
                    }
                }
            });
        });

        it('preserves random draw order when changing presentation order', () => {
            const original = Math.random;
            try {
                let draw = 0;
                Math.random = () => draw++ === 0 ? 0 : 1 - Number.EPSILON;
                const first = firstNamesFor('us', api.Gender.Male)[0];
                const last = surnamesFor('us', api.Gender.Male).at(-1);
                assert.equal(api.fullName('us', api.Gender.Male, 1, 1, ' ', 'family-first'), `${last} ${first}`);
                assert.equal(draw, 2);
            } finally {
                Math.random = original;
            }
        });

        it('rejects invalid separators and orders before consuming randomness', () => {
            const original = Math.random;
            Math.random = () => { throw new Error('Randomness should not be consumed'); };
            try {
                for (const separator of [null, 0, {}, [], false] as any[]) {
                    assert.throws(() => api.fullName('us', api.Gender.Male, 1, 1, separator), /Separator must be a string/);
                }
                for (const order of [null, 0, {}, '', 'native', 'familyFirst'] as any[]) {
                    assert.throws(() => api.fullName('us', api.Gender.Male, 1, 1, ' ', order), /Name order must be given-first or family-first/);
                }
            } finally {
                Math.random = original;
            }
        });

        it('rejects non-string country codes with an explicit error', () => {
            for (const country of [null, undefined, 0, {}, []] as any[]) {
                assert.throws(() => api.firstName(country, api.Gender.Male), /ISO code must be a string/);
                assert.throws(() => api.lastName(country), /ISO code must be a string/);
                assert.throws(() => api.fullName(country, api.Gender.Female), /ISO code must be a string/);
                assert.throws(() => api.getCountryInfo(country), /ISO code must be a string/);
            }
        });

        it('requires gender for first names, full names, and gender-specific surnames', () => {
            assert.throws(() => api.firstName('us', undefined as any), /Gender is required/);
            assert.throws(() => api.fullName('us', undefined as any), /Gender is required/);
            for (const country of genderSpecificCountries) {
                assert.throws(() => api.lastName(country), /Gender is required/);
            }
        });

        it('rejects invalid genders consistently for neutral and gender-specific surnames', () => {
            for (const gender of [-1, 2, 14, 15, 999, NaN, null, '0', '1', 'constructor'] as any[]) {
                assert.throws(() => api.firstName('us', gender), /Use Gender.Male \(0\) or Gender.Female \(1\)/);
                assert.throws(() => api.fullName('us', gender), /Use Gender.Male \(0\) or Gender.Female \(1\)/);
                for (const country of ['us', ...genderSpecificCountries]) {
                    assert.throws(() => api.lastName(country, gender), /Use Gender.Male \(0\) or Gender.Female \(1\)/);
                }
            }
        });

        it('rejects counts that are not integers from 1 to 10,000', () => {
            for (const count of [0, -1, 1.5, NaN, Infinity, -Infinity, 10_001, Number.MAX_SAFE_INTEGER + 1, '2', null] as any[]) {
                assert.throws(() => api.firstName('us', api.Gender.Male, count), /n must be an integer from 1 to 10000/);
                assert.throws(() => api.lastName('us', undefined, count), /n must be an integer from 1 to 10000/);
                assert.throws(() => api.fullName('us', api.Gender.Male, count), /firstN must be an integer from 1 to 10000/);
                assert.throws(() => api.fullName('us', api.Gender.Male, 1, count), /lastN must be an integer from 1 to 10000/);
            }
            assert.throws(() => api.firstName('invalid', 999 as any, 0), RangeError);
            assert.equal(api.firstName('us', api.Gender.Male, 10_000).split(' ').length >= 10_000, true);
            assert.throws(() => api.firstName(123 as any, api.Gender.Male, 0), TypeError);
            assert.throws(() => api.fullName(123 as any, api.Gender.Male, 0), TypeError);
        });

        it('validates both name groups before consuming randomness', () => {
            const original = Math.random;
            Math.random = () => { throw new Error('Randomness should not be consumed'); };
            try {
                assert.throws(() => api.fullName('us', api.Gender.Male, 1, 0), /lastN must be an integer from 1 to 10000/);
            } finally {
                Math.random = original;
            }
        });
    });
}
