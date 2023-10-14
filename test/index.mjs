import assert from 'assert';
import { fullName, firstName, lastName } from '../src/index.js';

const countries = ['br', 'gb', 'it', 'nl', 'sv', 'tr', 'us','in'];

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
  it('generates czech last name', () => {
    assert.ok(lastName('CZ', 0, 1).length > 0);
    assert.ok(lastName('CZ', 1, 1).length > 0);
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
  it('generates czech multiple names', () => {
    assert.ok(fullName('CZ', 0).length >= 2);
    assert.ok(fullName('CZ', 1).length >= 2);
  });
});
