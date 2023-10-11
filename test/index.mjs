import assert from 'assert';
import { fullName, firstName, lastName} from '../src/index.js';

const countries = ['us', 'tr'];

describe('full name generator', () => {
  it('generates first name', () => {
    for (let c in countries) {
      assert.ok(firstName(countries[c], 0).length > 0);
      assert.ok(firstName(countries[c], 1).length > 0);
      assert.ok(firstName(countries[c], 2).length > 0);
    }
  });
  it('generates last name', () => {
    for (let c in countries) {
      assert.ok(lastName(countries[c]).length > 0);
    }
  });
  it('generates full name', () => {
    for (let c in countries) {
      assert.ok(fullName(countries[c], 0).length > 0);
      assert.ok(fullName(countries[c], 1).length > 0);
      assert.ok(fullName(countries[c], 2).length > 0);
    }
  });
  it('generates multiple names', () => {
    for (let c in countries) {
      assert.ok(firstName(countries[c], 0, 2).split(' ').length >= 2);
      assert.ok(lastName(countries[c], 2).split(' ').length >= 2);
      assert.ok(fullName(countries[c], 0, 2, 2).split(' ').length >= 4);
    }
  });
});
