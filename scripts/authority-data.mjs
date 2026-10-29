import assert from 'node:assert/strict';

// These are authority-record counts, not population frequencies. Never merge
// normalized variants: their record sets might overlap.
export function selectAuthorityNames(response, pool) {
  assert.ok(['male', 'female', 'surnames', 'male-surnames', 'female-surnames'].includes(pool), 'Unknown authority pool');
  const surname = pool.endsWith('surnames');
  assert.deepEqual(response.head.vars, ['name', 'count'], 'Unexpected query columns');
  const rows = response.results.bindings;
  assert.equal(rows.length, response.meta['result-size-total'], 'Truncated authority response');
  const seen = new Set();
  const valid = [];
  for (const row of rows) {
    assert.equal(row.name.type, 'literal', 'Expected a literal name');
    assert.match(row.count.value, /^\d+$/, 'Invalid authority count');
    const count = Number(row.count.value);
    assert.ok(Number.isSafeInteger(count) && count >= 5, 'Invalid authority count');
    const name = row.name.value.normalize('NFC');
    const length = [...name].length;
    if (length < 2 || length > 60 || !/^[\p{L} '\u2019-]+$/u.test(name)) continue;
    if (!surname && name.split(/[ -]/u).some(part => [...part].length < 2)) continue;
    assert.ok(!seen.has(name), 'Duplicate normalized authority spelling');
    seen.add(name);
    valid.push({ name, count });
  }
  valid.sort((a, b) => b.count - a.count || Buffer.compare(Buffer.from(a.name), Buffer.from(b.name)));
  return { validStringCount: valid.length, names: valid.slice(0, 1000).map(row => row.name) };
}

export function readRegistryNames(bytes) {
  const lines = new TextDecoder('windows-1252', { fatal: true }).decode(bytes).trimEnd().split(/\r?\n/u);
  assert.equal(lines.shift(), 'PRENOM,SEXE', 'Unexpected RNPP columns');
  const pools = [[], []];
  for (const line of lines) {
    const fields = line.split(',');
    assert.equal(fields.length, 2, 'Unexpected RNPP row');
    const [raw, sex] = fields;
    assert.ok(['M', 'F'].includes(sex), 'Unreviewed RNPP sex');
    const name = raw.normalize('NFC');
    assert.match(name, /^\p{L}[\p{L}\p{M} '\u2019-]+$/u, 'Invalid RNPP spelling');
    const pool = pools[sex === 'M' ? 0 : 1];
    assert.ok(!pool.includes(name), 'Duplicate RNPP name within sex');
    pool.push(name);
  }
  return pools;
}
