# Contributing

Use **Node.js 24** for development. `.nvmrc`, npm's development runtime check, and
CI use this version across Linux, macOS, and Windows.

```bash
nvm use
npm ci
npm run check
```

`npm run check` runs lint, tests, and installed-package verification.
`npm run lint` checks code with Oxlint. `npm test` verifies the source data,
generates the lite datasets, type-checks, builds, and tests both versions. `npm run test:package` checks the
packaged library's CommonJS, ESM, and TypeScript entry points.
`npm pack` and `npm publish` build the distribution through the `prepack` hook.

The build uses Vite 8 and TypeScript 6. TypeScript 7 does not expose the
JavaScript compiler API that declaration bundling and the data scripts need.

The npm package contains only `package.json`, `LICENSE`, `README.md` and
`dist/`: minified CommonJS and ESM builds of the lite and full entry points,
their shared generator chunks, and one bundled declaration file per entry point
and module format. Source
manifests, snapshots, rights records and `DATA-LICENSES.md` stay in the
repository. The package declares that its modules have no side
effects so bundlers can remove unused imports.

The generated lite files should not be edited. Every build first runs
`npm run verify:data`, which checks the reviewed country inventory, manifests,
snapshot hashes, independently pinned rights evidence and exact importer output.
It rejects attribution-required or unreviewed rights claims, unsupported edits,
extra country files and stray snapshots.
The following type check validates registries and generates the lite edition.

To add a country, obtain official data under CC0 or a verified public-domain
basis with no mandatory attribution. Use published aggregates or reproduce
name-only aggregates from a clearly documented official archive or authority file. Pin its exact rights evidence and source data,
implement an offline importer and tests, and review every
selected entry before adding it to `scripts/verified-sources.mjs` and both country
registries. A source link or a licence label alone does not meet this policy.

All importers verify offline with `--check`:

```bash
npm run verify:data
node scripts/import-us-names.mjs --check
node scripts/import-us-surnames.mjs --check
node scripts/import-pl-data.mjs --check
node scripts/import-europe-data.mjs --check
node scripts/import-it-data.mjs --check
node scripts/import-authority-data.mjs --check
```

Optional reproduction against original downloads is also available:

```bash
node scripts/import-us-surnames.mjs --check --source /path/to/Names_2010Census.csv
python3 scripts/import-pl-workbooks.py /path/to/four-pesel-workbooks --check
python3 scripts/import-europe-originals.py /path/to/swedish-and-latvian-downloads --check
```

The manifests record exact download URLs, request parameters where necessary,
checksums, reference years, attribution and transformations. SSA's source is a
pinned transcription of its three official HTML ranking tables. Normal builds
need neither network access nor Python; the optional workbook checks use Python's
standard library. The European check replays selections from hash-pinned API
responses, CSV and XML downloads; raw archive biographies are never copied into
the repository or package. Italian imports reproduce selections directly from
the pinned official aggregate JSON responses. Authority imports retain only
aggregate name/count query results; the exact SPARQL queries, response hashes
and completeness counts are recorded in the manifests. Luxembourg's registry
CSV is checked against both its pinned SHA-256 and the publisher's SHA-1.

## Releasing

1. Set the new version in `package.json` and `package-lock.json`, and the review
   date and version at the top of `DATA-LICENSES.md`.
2. Push the commit and wait for CI to pass on Linux, macOS and Windows.
3. Confirm with `npm view full-name-generator versions` that the version is new.
4. Run the release. It runs every check, then publishes; add `-- --otp=<code>`
   if npm asks for a 2FA code:

```bash
npm run release
```
