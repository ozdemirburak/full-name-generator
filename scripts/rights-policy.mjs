import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

const cc0 = 'https://creativecommons.org/publicdomain/zero/1.0/';

// This checks a human-reviewed admission record. It does not infer rights from
// government ownership, a public URL, or a licence label supplied by a contributor.
export function verifyRights(manifest, bytes, approved) {
  const rights = manifest.rights;
  assert.ok(rights && ['CC0-1.0', 'public-domain'].includes(rights.basis), 'Data must be CC0 or reviewed public domain');
  assert.equal(rights.attributionRequired, false, 'Data requiring attribution is excluded');
  assert.ok(approved, 'Missing independent rights admission review');
  assert.deepEqual(rights, approved, 'Rights metadata differs from the reviewed admission');
  assert.match(rights.sha256, /^[a-f0-9]{64}$/);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), rights.sha256, 'Changed rights evidence');
  assert.ok(typeof manifest.licenseScope === 'string' && manifest.licenseScope.trim(), 'Missing reviewed rights scope');
  assert.match(manifest.licenseChecked, /^\d{4}-\d{2}-\d{2}$/);
  if (rights.basis === 'public-domain') {
    // No current dataset uses this branch. Admission requires an explicit,
    // source-specific legal basis and jurisdiction, pinned in the review too.
    assert.ok(typeof rights.legalBasis === 'string' && rights.legalBasis.trim(), 'Missing public-domain legal basis');
    assert.ok(typeof rights.jurisdiction === 'string' && rights.jurisdiction.trim(), 'Missing public-domain jurisdiction');
    return;
  }
  assert.equal(manifest.license, 'CC0 1.0', 'CC0 data must retain its actual licence');
  assert.equal(manifest.licenseUrl, cc0, 'CC0 data must link the CC0 terms');
  const evidence = JSON.parse(bytes.toString('utf8'));
  if (rights.format === 'dane-gov-pl') {
    assert.equal(evidence.data.id, rights.identifier, 'Wrong Polish dataset in rights evidence');
    const attributes = evidence.data.attributes;
    assert.equal(attributes.license_name, 'CC0 1.0', 'Publisher evidence does not declare CC0');
    for (const [key, value] of Object.entries(attributes)) {
      if (key.startsWith('license_condition_')) assert.ok(value === null || value === undefined || value === '' || value === false,
        `Additional publisher reuse condition: ${key}`);
    }
    assert.deepEqual(attributes.current_condition_descriptions, {}, 'Additional publisher reuse conditions');
  } else if (rights.format === 'socrata-cc0') {
    assert.equal(evidence.id, rights.identifier, 'Wrong Socrata dataset in rights evidence');
    assert.equal(evidence.licenseId, 'CC0_10', 'Publisher evidence does not declare CC0');
    assert.equal(evidence.license.termsLink.replace(/^http:/, 'https:'), `${cc0}legalcode`, 'Different publisher licence terms');
    assert.equal(evidence.owner.id, rights.ownerId, 'Different dataset owner needs review');
    assert.equal(evidence.tableAuthor.id, rights.ownerId, 'Different dataset author needs review');
    assert.equal(evidence.owner.displayName, rights.publisher, 'Different publisher needs review');
  } else if (rights.format === 'dnb-gnd-terms') {
    assert.equal(rights.identifier, 'DNB-GND-authority-metadata');
    assert.equal(rights.url, 'https://sparql.dnb.de/gnd');
    assert.equal(evidence.url, rights.url, 'Wrong DNB rights page');
    assert.equal(evidence.publisher, 'Deutsche Nationalbibliothek', 'Different DNB publisher');
    assert.equal(evidence.scope, 'GND authority metadata served by the official DNB SPARQL endpoint', 'Different DNB rights scope');
    assert.equal(evidence.license, 'CC0 1.0', 'Publisher evidence does not declare CC0');
    assert.equal(evidence.licenseUrl, cc0, 'Different DNB licence terms');
    assert.equal(evidence.excerpt, 'All DNB metadata released as open data under CC0 1.0 license', 'Missing DNB CC0 statement');
    assert.match(evidence.originalHtmlSha256, /^[a-f0-9]{64}$/);
  } else if (rights.format === 'udata-cc0') {
    assert.equal(evidence.id, rights.identifier, 'Wrong Luxembourg dataset');
    assert.equal(evidence.license, 'cc-zero', 'Publisher evidence does not declare CC0');
    assert.equal(evidence.organization.id, rights.organization, 'Different Luxembourg publisher');
    assert.equal(evidence.organization.name, rights.publisher, 'Different Luxembourg publisher');
    assert.ok(evidence.organization.badges.some(badge => badge.kind === 'public-service'), 'Missing government publisher status');
  } else if (rights.format === 'latvia-ckan') {
    assert.equal(evidence.success, true, 'Failed Latvian catalogue response');
    assert.equal(evidence.result.id, rights.identifier, 'Wrong Latvian dataset in rights evidence');
    assert.equal(evidence.result.license_id, 'CC0-1.0', 'Publisher evidence does not declare CC0');
    assert.equal(evidence.result.organization.name, rights.organization, 'Different Latvian publisher needs review');
  } else if (rights.format === 'scb-api-terms') {
    assert.equal(rights.url, 'https://www.scb.se/en/services/open-data-api/');
    assert.equal(evidence.url, rights.url, 'Wrong SCB rights page');
    assert.equal(evidence.publisher, 'Statistics Sweden');
    assert.equal(evidence.scope, 'Statistics Sweden open data via its Statistical Database API');
    assert.deepEqual(evidence.excerpts, [
      'We use the licence CC0 for this data',
      'without any requirement to state the source.'
    ], 'Missing SCB CC0/no-attribution statement');
    assert.equal(evidence.processedDataInstruction?.excerpt, 'do not state the source.',
      'Missing SCB processed-output guidance');
    assert.ok(evidence.otherAgencyCaveat, 'Missing SCB other-agency scope caveat');
    assert.match(evidence.originalHtmlSha256, /^[a-f0-9]{64}$/);
    assert.equal(rights.identifier, 'SCB-owned-Statistical-Database-API');
  } else {
    assert.equal(rights.format, 'data-gov', 'Unreviewed licence-evidence format');
    assert.equal(evidence.identifier, rights.identifier, 'Wrong US dataset in rights evidence');
    assert.equal(evidence.license.replace(/^http:/, 'https:'), cc0, 'Publisher evidence does not declare CC0');
    assert.ok(evidence.rights === null || evidence.rights === undefined || evidence.rights === '', 'Additional publisher rights statement requires review');
  }
}
