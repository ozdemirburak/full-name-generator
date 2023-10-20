import assert from 'assert';
import { fullName, firstName, lastName } from '../src/index.js';

const countries = [
  'ar', 'at', 'be', 'br', 'cn', 'de', 'dk', 'es', 'fi', 'fr',
  'gb', 'gr', 'id', 'il', 'in', 'it', 'jp', 'kr', 'mx', 'nl',
  'no', 'pt', 'ru', 'sa', 'sv', 'th', 'tr', 'tw', 'us', 'vn'
];

const exceptionCountries = ['cz', 'pl'];

describe('full name generator', () => {
  it('generates first name', () => {
    for (let c in countries) {
      assert.ok(firstName(countries[c], 0).length > 0);
      assert.ok(firstName(countries[c], 1).length > 0);
    }
  });
  it('generates last name', () => {
    for (let c in countries) {
      assert.ok(lastName(countries[c]).length > 0);
      assert.ok(lastName(countries[c], null, 3).length > 3);
    }
  });
  it('generates czech and polish names', () => {
    for (let c in exceptionCountries) {
      assert.ok(firstName(exceptionCountries[c], 0).length > 0);
      assert.ok(firstName(exceptionCountries[c], 1).length > 0);
      assert.ok(lastName(exceptionCountries[c], 0, 1).length > 0);
      assert.ok(lastName(exceptionCountries[c], 1, 1).length > 0);
    }
  });
  it('generates full name', () => {
    for (let c in countries) {
      assert.ok(fullName(countries[c], 0).length > 0);
      assert.ok(fullName(countries[c], 1).length > 0);
    }
  });
  it('generates multiple names', () => {
    assert.ok(fullName('CZ', 0).length >= 2);
    assert.ok(fullName('CZ', 1).length >= 2);
  });
  it('generates czech and polish multiple names', () => {
    for (let c in exceptionCountries) {
      assert.ok(fullName(exceptionCountries[c], 0).length >= 2);
      assert.ok(fullName(exceptionCountries[c], 1).length >= 2);
    }
  });
});
