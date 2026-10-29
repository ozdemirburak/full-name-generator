import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { verifiedSources, reviewedRights } from '../scripts/verified-sources.mjs';
import { verifyRights } from '../scripts/rights-policy.mjs';
import { names } from '../src/names';
import { surnames } from '../src/surnames';

const root = fileURLToPath(new URL('../', import.meta.url));
const fixture = (run: (directory: string) => void) => {
    const directory = mkdtempSync(join(tmpdir(), 'fng-source-policy-'));
    try { run(directory); } finally { rmSync(directory, { recursive: true, force: true }); }
};
const copy = (directory: string, path: string) => {
    const target = join(directory, path);
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(join(root, path), target);
};
const rejects = (directory: string, script: string, expected: RegExp) => {
    assert.throws(() => execFileSync(process.execPath, [join(directory, script), '--check'], {
        encoding: 'utf8', timeout: 25_000, stdio: 'pipe'
    }), (error: any) => error.status !== null && error.status !== 0 && expected.test(String(error.stderr)));
};
const sourceFixture = (directory: string) => {
    for (const path of ['scripts/import-us-names.mjs', 'scripts/data/us-ssa-2025.json',
        'scripts/data/snapshots/us-ssa-2025-ranks.csv', 'src/names/us.ts']) copy(directory, path);
};

describe('Strict official-source admission policy', () => {
    it('includes exactly the reviewed CC0 countries', () => {
        const expected = ['at', 'cz', 'de', 'es', 'fi', 'fr', 'gb', 'ie', 'it', 'lu', 'lv', 'nl', 'no', 'pl', 'se', 'us'];
        assert.deepEqual(Object.keys(verifiedSources).sort(), expected);
        assert.deepEqual(Object.keys(names).sort(), expected);
        assert.deepEqual(Object.keys(surnames).sort(), expected);
    });

    it('rejects a handwritten name even if its source snapshot is unchanged', { timeout: 30_000 }, () => fixture(directory => {
        sourceFixture(directory);
        const path = join(directory, 'src/names/us.ts');
        const source = readFileSync(path, 'utf8');
        assert.ok(source.includes("'Liam'"));
        writeFileSync(path, source.replace("'Liam'", "'Unsupported'"));
        rejects(directory, 'scripts/import-us-names.mjs', /US given names differ from the reviewed sources/);
    }));

    it('rejects changed source records unless their recorded evidence is updated', { timeout: 30_000 }, () => fixture(directory => {
        sourceFixture(directory);
        const path = join(directory, 'scripts/data/snapshots/us-ssa-2025-ranks.csv');
        writeFileSync(path, readFileSync(path, 'utf8').replace(',Liam,', ',Unsupported,'));
        rejects(directory, 'scripts/import-us-names.mjs', /Source checksum mismatch/);
    }));

    for (const extra of ['country', 'manifest'] as const) {
        it(`rejects an unreviewed ${extra} before any importer runs`, { timeout: 30_000 }, () => fixture(directory => {
            for (const path of ['scripts/verify-data.mjs', 'scripts/verified-sources.mjs', 'scripts/rights-policy.mjs']) copy(directory, path);
            for (const kind of ['names', 'surnames']) {
                mkdirSync(join(directory, 'src', kind), { recursive: true });
                for (const code of Object.keys(verifiedSources)) writeFileSync(join(directory, 'src', kind, `${code}.ts`), '');
            }
            if (extra === 'country') {
                writeFileSync(join(directory, 'src/names/xx.ts'), '');
            } else {
                mkdirSync(join(directory, 'scripts/data'), { recursive: true });
                for (const source of Object.values(verifiedSources)) {
                    for (const manifest of source.manifests) writeFileSync(join(directory, 'scripts/data', manifest), '{}');
                }
                writeFileSync(join(directory, 'scripts/data/unreviewed.json'), '{}');
            }
            rejects(directory, 'scripts/verify-data.mjs', extra === 'country' ? /Unreviewed or missing names country data/ : /Source manifests must match/);
        }));
    }

    const cc0 = JSON.parse(readFileSync(join(root, 'scripts/data/us-ssa-2025.json'), 'utf8'));
    const evidence = readFileSync(join(root, 'scripts/data', cc0.rights.snapshot));
    const review = reviewedRights['us-ssa-2025.json'];
    it('rejects attribution licences even if the source data is official', () => {
        for (const basis of ['CC-BY-4.0', 'OGL-3.0', 'unknown']) {
            const changed = structuredClone(cc0);
            changed.rights.basis = basis;
            assert.throws(() => verifyRights(changed, evidence, review), /must be CC0 or reviewed public domain/);
        }
    });
    it('rejects additional attribution conditions on an otherwise CC0-labelled source', () => {
        const changed = structuredClone(cc0);
        changed.rights.attributionRequired = true;
        assert.throws(() => verifyRights(changed, evidence, review), /requiring attribution is excluded/);
    });
    it('rejects an unreviewed public-domain claim', () => {
        const changed = structuredClone(cc0);
        changed.rights.basis = 'public-domain';
        assert.throws(() => verifyRights(changed, evidence, undefined), /Missing independent rights admission review/);
        assert.throws(() => verifyRights(changed, evidence, review), /differs from the reviewed admission/);
    });
    it('rejects changed licence evidence and misleading licence labels', () => {
        assert.throws(() => verifyRights(cc0, Buffer.concat([evidence, Buffer.from(' ')]), review), /Changed rights evidence/);
        const changed = structuredClone(cc0);
        changed.license = 'CC BY 4.0';
        assert.throws(() => verifyRights(changed, evidence, review), /retain its actual licence/);
    });
    for (const alteration of ['licence', 'condition', 'dataset']) {
        it(`rejects a publisher ${alteration} mismatch even when its new evidence hash is recorded`, () => {
            const manifest = JSON.parse(readFileSync(join(root, 'scripts/data/pl-pesel-2026-names.json'), 'utf8'));
            const record = JSON.parse(readFileSync(join(root, 'scripts/data', manifest.rights.snapshot), 'utf8'));
            if (alteration === 'licence') record.data.attributes.license_name = 'CC BY 4.0';
            else if (alteration === 'condition') record.data.attributes.license_condition_original = true;
            else record.data.id = 'unrelated-dataset';
            const bytes = Buffer.from(JSON.stringify(record));
            manifest.rights.sha256 = createHash('sha256').update(bytes).digest('hex');
            assert.throws(() => verifyRights(manifest, bytes, structuredClone(manifest.rights)),
                /does not declare CC0|Additional publisher reuse condition|Wrong Polish dataset/);
        });
    }
    it('requires a specific legal basis and jurisdiction for public-domain admission', () => {
        const changed = structuredClone(cc0);
        changed.rights.basis = 'public-domain';
        assert.throws(() => verifyRights(changed, evidence, structuredClone(changed.rights)), /Missing public-domain legal basis/);
        changed.rights.legalBasis = 'Synthetic test review';
        assert.throws(() => verifyRights(changed, evidence, structuredClone(changed.rights)), /Missing public-domain jurisdiction/);
    });
    for (const alteration of ['licence', 'publisher', 'dataset']) {
        it(`rejects a Latvian ${alteration} mismatch with a newly recorded evidence hash`, () => {
            const manifest = JSON.parse(readFileSync(join(root, 'scripts/data/lv-archives-surnames.json'), 'utf8'));
            const record = JSON.parse(readFileSync(join(root, 'scripts/data', manifest.rights.snapshot), 'utf8'));
            if (alteration === 'licence') record.result.license_id = 'CC-BY-4.0';
            else if (alteration === 'publisher') record.result.organization.name = 'unreviewed-publisher';
            else record.result.id = 'unrelated-dataset';
            const bytes = Buffer.from(JSON.stringify(record));
            manifest.rights.sha256 = createHash('sha256').update(bytes).digest('hex');
            assert.throws(() => verifyRights(manifest, bytes, structuredClone(manifest.rights)),
                /does not declare CC0|Different Latvian publisher|Wrong Latvian dataset/);
        });
    }
    it('rejects SCB evidence without its no-attribution statement', () => {
        const manifest = JSON.parse(readFileSync(join(root, 'scripts/data/se-scb-2022-names.json'), 'utf8'));
        const record = JSON.parse(readFileSync(join(root, 'scripts/data', manifest.rights.snapshot), 'utf8'));
        record.excerpts.pop();
        const bytes = Buffer.from(JSON.stringify(record));
        manifest.rights.sha256 = createHash('sha256').update(bytes).digest('hex');
        assert.throws(() => verifyRights(manifest, bytes, structuredClone(manifest.rights)), /Missing SCB CC0\/no-attribution statement/);
    });
    for (const [filename, changes, expected] of [
        ['de-gnd-2026-male.json', { license: 'CC BY 4.0', scope: 'Unrelated books', publisher: 'Unknown' }, /does not declare CC0|Different DNB/],
        ['lu-rnpp-2020-names.json', { license: 'cc-by', id: 'different-dataset', organization: { id: 'different-owner' } }, /does not declare CC0|Wrong Luxembourg|Different Luxembourg/]
    ] as const) {
        for (const [field, value] of Object.entries(changes)) {
            it(`rejects ${filename} with a changed ${field}, even with an updated evidence hash`, () => {
                const manifest = JSON.parse(readFileSync(join(root, 'scripts/data', filename), 'utf8'));
                const record = JSON.parse(readFileSync(join(root, 'scripts/data', manifest.rights.snapshot), 'utf8'));
                record[field] = value;
                const bytes = Buffer.from(JSON.stringify(record));
                manifest.rights.sha256 = createHash('sha256').update(bytes).digest('hex');
                assert.throws(() => verifyRights(manifest, bytes, structuredClone(manifest.rights)), expected);
            });
        }
    }
    for (const alteration of ['licence', 'owner', 'dataset', 'terms']) {
        it(`rejects a Socrata ${alteration} mismatch even with an updated evidence hash`, () => {
            const manifest = JSON.parse(readFileSync(join(root, 'scripts/data/it-bergamo-2025-names.json'), 'utf8'));
            const record = JSON.parse(readFileSync(join(root, 'scripts/data', manifest.rights.snapshot), 'utf8'));
            if (alteration === 'licence') record.licenseId = 'CC_BY_40';
            else if (alteration === 'owner') record.owner.id = 'different-owner';
            else if (alteration === 'dataset') record.id = 'unrelated-dataset';
            else record.license.termsLink = 'https://creativecommons.org/licenses/by/4.0/';
            const bytes = Buffer.from(JSON.stringify(record));
            manifest.rights.sha256 = createHash('sha256').update(bytes).digest('hex');
            assert.throws(() => verifyRights(manifest, bytes, structuredClone(manifest.rights)),
                /does not declare CC0|Different dataset owner|Wrong Socrata dataset|Different publisher licence terms/);
        });
    }
});
