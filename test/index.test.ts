import assert from 'assert';
import { fullName, firstName, lastName, Gender } from '../dist/index.mjs';
import { fullName as fullNameFull, firstName as firstNameFull, lastName as lastNameFull, Gender as GenderFull } from '../dist/index.full.mjs';

const countries = [
    'ar', 'be', 'br', 'dk', 'es', 'fi', 'fr', 'gb',
    'ie', 'il', 'it', 'kr', 'mx', 'no', 'nz', 'se',
    'si', 'tr', 'tw', 'us'
];

const genderSpecificSurnameCountries = ['cz', 'is', 'lv', 'pl'];

// Helper to count unique names by generating many samples
const countUniqueNames = (generator: Function, iterations: number = 500): number => {
    const names = new Set();
    for (let i = 0; i < iterations; i++) {
        names.add(generator());
    }
    return names.size;
};

// Helper to test a version (lite or full)
const testVersion = (
    versionName: string,
    firstNameFn: Function,
    lastNameFn: Function,
    fullNameFn: Function,
    GenderEnum: any,
    expectedMinNames: number
) => {
    describe(`Full Name Generator - ${versionName}`, () => {
        describe('firstName()', () => {
            it('should generate male first names for all countries', () => {
                countries.forEach(country => {
                    const name = firstNameFn(country, GenderEnum.Male);
                    assert.ok(name.length > 0, `Expected name for ${country.toUpperCase()}`);
                    assert.strictEqual(typeof name, 'string');
                });
            });

            it('should generate female first names for all countries', () => {
                countries.forEach(country => {
                    const name = firstNameFn(country, GenderEnum.Female);
                    assert.ok(name.length > 0, `Expected name for ${country.toUpperCase()}`);
                    assert.strictEqual(typeof name, 'string');
                });
            });

            it('should generate multiple first names when n > 1', () => {
                const name = firstNameFn('us', GenderEnum.Male, 3);
                const parts = name.split(' ');
                assert.strictEqual(parts.length, 3, 'Expected 3 first names');
            });

            it('should handle case-insensitive ISO codes', () => {
                const lower = firstNameFn('us', GenderEnum.Male);
                const upper = firstNameFn('US', GenderEnum.Male);
                const mixed = firstNameFn('Us', GenderEnum.Male);

                assert.ok(lower.length > 0);
                assert.ok(upper.length > 0);
                assert.ok(mixed.length > 0);
            });

            it(`should have ${expectedMinNames === 15 ? 'exactly 15' : 'significantly more'} names per gender`, () => {
                const maleCount = countUniqueNames(() => firstNameFn('us', GenderEnum.Male));
                const femaleCount = countUniqueNames(() => firstNameFn('us', GenderEnum.Female));

                if (expectedMinNames === 15) {
                    assert.strictEqual(maleCount, 15, 'Should have exactly 15 male US names');
                    assert.strictEqual(femaleCount, 15, 'Should have exactly 15 female US names');
                } else {
                    assert.ok(maleCount >= 90, `Should have at least 90 male US names, got ${maleCount}`);
                    assert.ok(femaleCount >= 90, `Should have at least 90 female US names, got ${femaleCount}`);
                }
            });
        });

        describe('lastName()', () => {
            it('should generate surnames for all countries', () => {
                countries.forEach(country => {
                    const surname = lastNameFn(country);
                    assert.ok(surname.length > 0, `Expected surname for ${country.toUpperCase()}`);
                    assert.strictEqual(typeof surname, 'string');
                });
            });

            it('should generate multiple surnames when n > 1', () => {
                const surname = lastNameFn('us', undefined, 3);
                const parts = surname.split(' ');
                assert.strictEqual(parts.length, 3, 'Expected 3 surnames');
            });

            it('should handle gender-specific surnames', () => {
                genderSpecificSurnameCountries.forEach(country => {
                    const maleSurname = lastNameFn(country, GenderEnum.Male);
                    const femaleSurname = lastNameFn(country, GenderEnum.Female);

                    assert.ok(maleSurname.length > 0, `Expected male surname for ${country.toUpperCase()}`);
                    assert.ok(femaleSurname.length > 0, `Expected female surname for ${country.toUpperCase()}`);
                });
            });

            it(`should have ${expectedMinNames === 15 ? 'exactly 15' : 'significantly more'} surnames`, () => {
                const count = countUniqueNames(() => lastNameFn('us'));

                if (expectedMinNames === 15) {
                    assert.strictEqual(count, 15, 'Should have exactly 15 US surnames');
                } else {
                    assert.ok(count >= 90, `Should have at least 90 US surnames, got ${count}`);
                }
            });
        });

        describe('fullName()', () => {
            it('should generate male full names for all countries', () => {
                countries.forEach(country => {
                    const name = fullNameFn(country, GenderEnum.Male);
                    assert.ok(name.length > 0, `Expected full name for ${country.toUpperCase()}`);
                    assert.ok(name.includes(' '), 'Expected space between first and last name');
                });
            });

            it('should generate female full names for all countries', () => {
                countries.forEach(country => {
                    const name = fullNameFn(country, GenderEnum.Female);
                    assert.ok(name.length > 0, `Expected full name for ${country.toUpperCase()}`);
                    assert.ok(name.includes(' '), 'Expected space between first and last name');
                });
            });

            it('should generate multiple first names and surnames', () => {
                const name = fullNameFn('us', GenderEnum.Male, 2, 2);
                const parts = name.split(' ');
                assert.strictEqual(parts.length, 4, 'Expected 2 first names + 2 surnames');
            });

            it('should use custom separator', () => {
                const name = fullNameFn('us', GenderEnum.Male, 1, 1, '-');
                assert.ok(name.includes('-'), 'Expected custom separator');
                assert.ok(!name.includes(' '), 'Expected no space separator');
            });

            it('should handle gender-specific surnames', () => {
                genderSpecificSurnameCountries.forEach(country => {
                    const maleName = fullNameFn(country, GenderEnum.Male);
                    const femaleName = fullNameFn(country, GenderEnum.Female);

                    assert.ok(maleName.length >= 2, `Expected male name for ${country.toUpperCase()}`);
                    assert.ok(femaleName.length >= 2, `Expected female name for ${country.toUpperCase()}`);
                });
            });

            it('should handle names with special characters (apostrophes)', () => {
                const name = fullNameFn('ie', GenderEnum.Male);
                assert.ok(name.length > 0, 'Expected Irish name to be generated');
                assert.strictEqual(typeof name, 'string');
            });
        });

        describe('Gender enum', () => {
            it('should export Gender enum with correct values', () => {
                assert.strictEqual(GenderEnum.Male, 0);
                assert.strictEqual(GenderEnum.Female, 1);
            });
        });

        describe('Error handling', () => {
            it('should throw error for invalid country code', () => {
                assert.throws(
                    () => firstNameFn('invalid', GenderEnum.Male),
                    /No data available/
                );
            });

            it('should throw error for invalid gender', () => {
                assert.throws(
                    () => firstNameFn('us', 999 as any),
                    /No data available/
                );
            });
        });
    });
};

// Run tests for both versions
testVersion('Lite Version (Default)', firstName, lastName, fullName, Gender, 15);
testVersion('Full Version (/full)', firstNameFull, lastNameFull, fullNameFull, GenderFull, 90);

// Additional comparison test
describe('Lite vs Full Comparison', () => {
    it('should have significantly more data in full version', () => {
        const liteFirstNames = countUniqueNames(() => firstName('us', Gender.Male), 100);
        const fullFirstNames = countUniqueNames(() => firstNameFull('us', GenderFull.Male));
        const liteSurnames = countUniqueNames(() => lastName('us'), 100);
        const fullSurnames = countUniqueNames(() => lastNameFull('us'));
        // Verify lite has exactly 15
        assert.strictEqual(liteFirstNames, 15, 'Lite should have 15 first names');
        assert.strictEqual(liteSurnames, 15, 'Lite should have 15 surnames');
        // Verify full has much more (at least 6x more)
        assert.ok(fullFirstNames >= 90, `Full should have at least 90 first names, got ${fullFirstNames}`);
        assert.ok(fullSurnames >= 90, `Full should have at least 90 surnames, got ${fullSurnames}`);
        assert.ok(fullFirstNames > liteFirstNames * 6, 'Full should have at least 6x more first names than lite');
        assert.ok(fullSurnames > liteSurnames * 6, 'Full should have at least 6x more surnames than lite');
    });
});
