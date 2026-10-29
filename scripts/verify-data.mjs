import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { verifiedSources, reviewedRights, reviewedSnapshots } from './verified-sources.mjs';
import { verifyRights } from './rights-policy.mjs';

const root = new URL('../', import.meta.url);
// Source evidence keeps only what the review needs; publisher contact details stay out.
const email = /[\w.+-]+@[\w-]+\.[\w.-]+/;
const countries = Object.keys(verifiedSources).sort();
for (const kind of ['names', 'surnames']) {
  const actual = readdirSync(new URL(`src/${kind}/`, root)).filter(name => name.endsWith('.ts')).map(name => name.slice(0, -3)).sort();
  assert.deepEqual(actual, countries, `Unreviewed or missing ${kind} country data.`);
}
const expectedManifests = Object.values(verifiedSources).flatMap(source => source.manifests).sort();
assert.deepEqual(readdirSync(new URL('scripts/data/', root)).filter(name => name.endsWith('.json')).sort(), expectedManifests,
  'Source manifests must match the reviewed release inventory.');
const snapshots = [];
const rightsFiles = [];
assert.deepEqual(Object.keys(reviewedRights).sort(), expectedManifests, 'Every source needs a rights admission review');
assert.deepEqual(Object.keys(reviewedSnapshots).sort(), expectedManifests, 'Every source needs a pinned snapshot review');
for (const filename of expectedManifests) {
  const manifest = JSON.parse(readFileSync(new URL(`scripts/data/${filename}`, root), 'utf8'));
  for (const field of ['source', 'license', 'attribution', 'snapshot', 'selection']) {
    assert.ok(typeof manifest[field] === 'string' && manifest[field].trim(), `${filename}: missing ${field}`);
  }
  for (const field of ['url', 'licenseUrl']) assert.equal(new URL(manifest[field]).protocol, 'https:', `${filename}: invalid ${field}`);
  assert.match(manifest.sha256, /^[a-f0-9]{64}$/, `${filename}: missing snapshot hash`);
  assert.match(manifest.snapshot, /^snapshots\/[a-z0-9-]+\.(?:json|csv|tsv)$/);
  const bytes = readFileSync(new URL(`scripts/data/${manifest.snapshot}`, root));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), manifest.sha256, `${filename}: changed source snapshot`);
  assert.deepEqual({ sha256: manifest.sha256, ...(manifest.querySha256 && { querySha256: manifest.querySha256 }) },
    reviewedSnapshots[filename], `${filename}: snapshot differs from the reviewed source`);
  assert.doesNotMatch(bytes.toString('utf8'), email, `${filename}: source snapshot contains an email address`);
  assert.equal(manifest.legacy, undefined, `${filename}: unsupported compatibility source`);
  snapshots.push(manifest.snapshot.slice('snapshots/'.length));
  assert.match(manifest.rights?.snapshot ?? '', /^rights\/[a-z0-9-]+\.json$/, `${filename}: missing rights evidence`);
  assert.equal(new URL(manifest.rights.url).protocol, 'https:', `${filename}: invalid rights evidence URL`);
  const evidence = readFileSync(new URL(`scripts/data/${manifest.rights.snapshot}`, root));
  assert.doesNotMatch(evidence.toString('utf8'), email, `${filename}: rights evidence contains an email address`);
  verifyRights(manifest, evidence, reviewedRights[filename]);
  rightsFiles.push(manifest.rights.snapshot.slice('rights/'.length));
}
assert.deepEqual(readdirSync(new URL('scripts/data/snapshots/', root)).sort(), snapshots.sort(),
  'Unreviewed or missing source snapshot.');
assert.deepEqual(readdirSync(new URL('scripts/data/rights/', root)).sort(), [...new Set(rightsFiles)].sort(),
  'Unreviewed or missing rights evidence.');
for (const importer of new Set(Object.values(verifiedSources).flatMap(source => source.importers))) {
  execFileSync(process.execPath, [fileURLToPath(new URL(importer, import.meta.url)), '--check'], {
    stdio: 'inherit', timeout: 120_000
  });
}
console.log(`Verified every shipped list for ${countries.length} countries against reviewed sources and the CC0/public-domain policy.`);
