// Admission is manual: verify official data, the exact reuse scope, and every output.
// Rights evidence is independently pinned here so editing a manifest cannot admit a new licence.
export const verifiedSources = {
  at: { manifests: ['at-gnd-2026-male.json', 'at-gnd-2026-female.json', 'at-gnd-2026-surnames.json'], importers: ['import-authority-data.mjs'] },
  cz: { manifests: ['cz-gnd-2026-male.json', 'cz-gnd-2026-female.json', 'cz-gnd-2026-male-surnames.json', 'cz-gnd-2026-female-surnames.json'], importers: ['import-authority-data.mjs'] },
  de: { manifests: ['de-gnd-2026-male.json', 'de-gnd-2026-female.json', 'de-gnd-2026-surnames.json'], importers: ['import-authority-data.mjs'] },
  es: { manifests: ['es-gnd-2026-male.json', 'es-gnd-2026-female.json', 'es-gnd-2026-surnames.json'], importers: ['import-authority-data.mjs'] },
  fi: { manifests: ['fi-gnd-2026-male.json', 'fi-gnd-2026-female.json', 'fi-gnd-2026-surnames.json'], importers: ['import-authority-data.mjs'] },
  fr: { manifests: ['fr-gnd-2026-male.json', 'fr-gnd-2026-female.json', 'fr-gnd-2026-surnames.json'], importers: ['import-authority-data.mjs'] },
  gb: { manifests: ['gb-gnd-2026-male.json', 'gb-gnd-2026-female.json', 'gb-gnd-2026-surnames.json'], importers: ['import-authority-data.mjs'] },
  ie: { manifests: ['ie-gnd-2026-male.json', 'ie-gnd-2026-female.json', 'ie-gnd-2026-male-surnames.json', 'ie-gnd-2026-female-surnames.json'], importers: ['import-authority-data.mjs'] },
  it: { manifests: ['it-bergamo-2025-names.json', 'it-bergamo-2021-surnames.json'], importers: ['import-it-data.mjs'] },
  lu: { manifests: ['lu-rnpp-2020-names.json', 'lu-gnd-2026-surnames.json'], importers: ['import-authority-data.mjs'] },
  lv: { manifests: ['lv-pmlp-2026-names.json', 'lv-archives-surnames.json'], importers: ['import-europe-data.mjs'] },
  nl: { manifests: ['nl-gnd-2026-male.json', 'nl-gnd-2026-female.json', 'nl-gnd-2026-surnames.json'], importers: ['import-authority-data.mjs'] },
  no: { manifests: ['no-gnd-2026-male.json', 'no-gnd-2026-female.json', 'no-gnd-2026-male-surnames.json', 'no-gnd-2026-female-surnames.json'], importers: ['import-authority-data.mjs'] },
  pl: { manifests: ['pl-pesel-2026-names.json', 'pl-pesel-2026-surnames.json'], importers: ['import-pl-data.mjs'] },
  se: { manifests: ['se-scb-2022-names.json', 'se-scb-2020-surnames.json'], importers: ['import-europe-data.mjs'] },
  us: { manifests: ['us-ssa-2025.json', 'us-census-2010.json'], importers: ['import-us-names.mjs', 'import-us-surnames.mjs'] },
};

export const reviewedRights = {
  "pl-pesel-2026-names.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://api.dane.gov.pl/1.4/datasets/1667",
    "snapshot": "rights/pl-dataset-1667.json",
    "sha256": "d408f41f228679edfe7054a95eb7a3c1492a93a29606ee42c1da6e4375c43cb8",
    "format": "dane-gov-pl",
    "identifier": "1667"
  },
  "pl-pesel-2026-surnames.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://api.dane.gov.pl/1.4/datasets/1681",
    "snapshot": "rights/pl-dataset-1681.json",
    "sha256": "4d8840807bfb01f61eb60dbb55ec99f084641d0b0d298aa7282129a3e458e42f",
    "format": "dane-gov-pl",
    "identifier": "1681"
  },
  "us-ssa-2025.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://catalog.data.gov/harvest_record/3521de98-1347-4fbc-9d39-1f7838cf7764/raw",
    "snapshot": "rights/us-ssa-license.json",
    "sha256": "b27a56a08c50c28c0dae898415c63fe22b1bcea6d06bad66200af4cd9f0ae08a",
    "format": "data-gov",
    "identifier": "US-GOV-SSA-338"
  },
  "us-census-2010.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://catalog.data.gov/harvest_record/39c08c48-88a7-4572-bab2-eb6df4506332/raw",
    "snapshot": "rights/us-census-license.json",
    "sha256": "f184dccbd76622def3ad28fb926129afe571097b4b0d0a70afde7aa76d1816d5",
    "format": "data-gov",
    "identifier": "http://api.census.gov/data/id/DecennialSurname2010"
  },
  "lv-pmlp-2026-names.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://data.gov.lv/dati/api/3/action/package_show?id=personu-vardi",
    "snapshot": "rights/lv-pmlp-2026-names-license.json",
    "sha256": "878f97ed581691ac5b33e1530e5e766a7a5665ca434ec18168cc33740023c0bc",
    "format": "latvia-ckan",
    "identifier": "ac246d11-d5d6-445e-a6c7-8f5013460335",
    "organization": "pmlp"
  },
  "lv-archives-surnames.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://data.gov.lv/dati/api/3/action/package_show?id=latvijas-universitates-studentu-saraksts-1919-1944",
    "snapshot": "rights/lv-archives-surnames-license.json",
    "sha256": "f6b021c8f0a874b3e43b5cc7d8c964e791d960ba266a99be98efa38f5a4013e9",
    "format": "latvia-ckan",
    "identifier": "bc28e0fe-a44e-4485-97dc-edfca95a5ea6",
    "organization": "latvijas-nacionalais-arhivs"
  },
  "se-scb-2022-names.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://www.scb.se/en/services/open-data-api/",
    "snapshot": "rights/se-scb-api-terms.json",
    "sha256": "5f1b8facf60d952f3e816d7fd632ab3dea731a2afabf8735d1525d6f94b77f34",
    "format": "scb-api-terms",
    "identifier": "SCB-owned-Statistical-Database-API"
  },
  "se-scb-2020-surnames.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://www.scb.se/en/services/open-data-api/",
    "snapshot": "rights/se-scb-api-terms.json",
    "sha256": "5f1b8facf60d952f3e816d7fd632ab3dea731a2afabf8735d1525d6f94b77f34",
    "format": "scb-api-terms",
    "identifier": "SCB-owned-Statistical-Database-API"
  },
  "it-bergamo-2025-names.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://www.dati.lombardia.it/api/views/s29g-dr7j.json",
    "snapshot": "rights/it-bergamo-names-license.json",
    "sha256": "bf4a66e1b79b2ff14bcb1e92826c65bf36ebba6d598fa4c414a0733d0b42cbf7",
    "format": "socrata-cc0",
    "identifier": "s29g-dr7j",
    "ownerId": "3sn6-kutt",
    "publisher": "Comune di Bergamo"
  },
  "it-bergamo-2021-surnames.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://www.dati.lombardia.it/api/views/4pqu-7zkd.json",
    "snapshot": "rights/it-bergamo-surnames-license.json",
    "sha256": "69b60caafe9073f4c3b1b7c3c68c152dac4910f627819d08520fd881df7a53cd",
    "format": "socrata-cc0",
    "identifier": "4pqu-7zkd",
    "ownerId": "3sn6-kutt",
    "publisher": "Comune di Bergamo"
  },
  "at-gnd-2026-male.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "at-gnd-2026-female.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "at-gnd-2026-surnames.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "de-gnd-2026-male.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "de-gnd-2026-female.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "de-gnd-2026-surnames.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "nl-gnd-2026-male.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "nl-gnd-2026-female.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "nl-gnd-2026-surnames.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "lu-gnd-2026-surnames.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "lu-rnpp-2020-names.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://data.public.lu/api/1/datasets/5f8601797a447238025d4fa4/",
    "snapshot": "rights/lu-rnpp-license.json",
    "sha256": "abefa49fd8987f4307fe09dfe4e9dfa950afbd8fb1cc82e4f438f904698e53ef",
    "format": "udata-cc0",
    "identifier": "5f8601797a447238025d4fa4",
    "organization": "57067d81a30b1b33a2f65976",
    "publisher": "Centre des technologies de l'information de l'Etat"
  },
  "cz-gnd-2026-male.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "cz-gnd-2026-female.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "cz-gnd-2026-male-surnames.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "cz-gnd-2026-female-surnames.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "es-gnd-2026-male.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "es-gnd-2026-female.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "es-gnd-2026-surnames.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "fi-gnd-2026-male.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "fi-gnd-2026-female.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "fi-gnd-2026-surnames.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "fr-gnd-2026-male.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "fr-gnd-2026-female.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "fr-gnd-2026-surnames.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "gb-gnd-2026-male.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "gb-gnd-2026-female.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "gb-gnd-2026-surnames.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "ie-gnd-2026-male.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "ie-gnd-2026-female.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "ie-gnd-2026-male-surnames.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "ie-gnd-2026-female-surnames.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "no-gnd-2026-male.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "no-gnd-2026-female.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "no-gnd-2026-male-surnames.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  },
  "no-gnd-2026-female-surnames.json": {
    "basis": "CC0-1.0",
    "attributionRequired": false,
    "url": "https://sparql.dnb.de/gnd",
    "snapshot": "rights/dnb-gnd-cc0.json",
    "sha256": "c8e2e8820e4a68cd9315f89cc80d9f22529ec5d3d7f8e79ce39fdf669edb29da",
    "format": "dnb-gnd-terms",
    "identifier": "DNB-GND-authority-metadata"
  }
};

// Snapshot hashes are pinned here as well as in each manifest, so editing a
// manifest and its snapshot together cannot replace reviewed source data.
export const reviewedSnapshots = {
  "at-gnd-2026-female.json": {"sha256": "e9beb9018201538f2d79b05e16b0eba0614e91f56621f5a646d21fc9a31d8393", "querySha256": "604181c91c0cbfb1793d46deb6a5a54030ad2b941cc20d2cfa3850f5631e9ef2"},
  "at-gnd-2026-male.json": {"sha256": "163e58331caba85800bdf365d8b246af81ab43f44c7336b38ee96d1228aa9800", "querySha256": "e65f493f14aee57f86837f083ef280fec8cb533df51bd906c46617bb63d60146"},
  "at-gnd-2026-surnames.json": {"sha256": "2756057a16df7f2d50784c43d9759e24e698487323f52f4baf531ee092fa8b3a", "querySha256": "160b5723e75c170fe5d930cb151d3d54a79756abe2e6c7bfc8fb9d9324f9f572"},
  "cz-gnd-2026-female-surnames.json": {"sha256": "09206d448c6c7da58caa8a1330401cb0c49686968b7b08f234d58b3413baf864", "querySha256": "a59cf1ac378c9e42a36a95d5293449b9686f47d74808d62a740028b84e2199d4"},
  "cz-gnd-2026-female.json": {"sha256": "4f8cd8ea16e0e25069bf00662974a1756aa737532128af3c827862d42dbe1956", "querySha256": "6d20548cf5d32b597d0c268bcae17f9bc3232c36b9990a19d0ec1a1c37d7bec8"},
  "cz-gnd-2026-male-surnames.json": {"sha256": "42598936e609e6a8b50e9af841f4f26ec4f1781c50b0799e8fa18b31856d4ed1", "querySha256": "f89a17ea9de27fd3a9cf4719d2037fc0253f532a8e6636dc47a8506ffef8d59d"},
  "cz-gnd-2026-male.json": {"sha256": "2d893857ff42fd1e186668180cc0750f6b387e0ff7d5b7d0e6a123c651602647", "querySha256": "c9e3b83ebbaddaadd6ad317ea618584c896093adfe25acdf261e3f659c7e3f56"},
  "de-gnd-2026-female.json": {"sha256": "1b1b6c421cb43ecacae6e78311201ad3a58d741295be6202612d4c5f85f635e3", "querySha256": "4e721f82b5e650226217bf97b8cb814b94141481b628286d148de53a57c69d59"},
  "de-gnd-2026-male.json": {"sha256": "081a53b2dd06b56621b3d6baebd75746d79e43561532bf1bc60f9b6c122a54b8", "querySha256": "39fa373134c1b5b993b71aaec711272c836f17e0d372101bab0072c799733161"},
  "de-gnd-2026-surnames.json": {"sha256": "136bf6555980133e93e6c4fa52591d6897c94d035c9c92a147cd20ee9db8289c", "querySha256": "631bf9a99cf76e0a8486dc9fc57bf253ee6d5734aee994c88b01065c009ab225"},
  "es-gnd-2026-female.json": {"sha256": "80c8516bb812400a926220e83a72c21f3277129c130ac498e87a551eb2652462", "querySha256": "27d8cc548fc661fe988f812433422a98034fe89ea893d2957964889e19f2ffe4"},
  "es-gnd-2026-male.json": {"sha256": "7bca241a3226629679418f4badeaec87d251b871c7d5af7f526d162f2cc15300", "querySha256": "ac1b2356183aac9003c79e6b97622440c9800913183b338b29b7b79c59496357"},
  "es-gnd-2026-surnames.json": {"sha256": "c2033f5a46d0ea3ce93e5c0c9ace11df254d7ed0461bc4fe4cb8a3ee851316dd", "querySha256": "897f80103e183234565441db4da0a5a8fa590a244d93b5e3c3a21f6559ec2534"},
  "fi-gnd-2026-female.json": {"sha256": "cb80214ae193a485a2a5d3318b9f288046a427dfdb7e50df7dd72d81dcdb7861", "querySha256": "b418e0f1408cd670b34e2677ac85538c98fdfe412c68171824feeb0a43cced0b"},
  "fi-gnd-2026-male.json": {"sha256": "c286dc07bff6f48bc605ea423dbe9a2bb777b6dd209d45805856d3c8a510400f", "querySha256": "3feac7e55fb02596dafe96e7395c7a2fdc128beec85cc06d012a3cf645b20826"},
  "fi-gnd-2026-surnames.json": {"sha256": "3d79df9ccf8c5a36f834dd6a38f47a22f213fa045729bc77b1d7f715b65efe39", "querySha256": "9a004387ef7921d9411cf7afd2cc22ce3b8dbcfb173a6d9d7b98a339c3b79535"},
  "fr-gnd-2026-female.json": {"sha256": "df052917abe0a1d7ee9a57adec1c50a38fb6783027f89b51bd52850f2e94f76b", "querySha256": "0730a34f13264df96759c96b417cc9cd53649132dfb4e890eebab2a6a4c48df6"},
  "fr-gnd-2026-male.json": {"sha256": "c40f28a90a1e8c9ccec60673ce5f016130ff96131019597ae2c4e49dcd920ae4", "querySha256": "11e6619217163f153508e1bbad88e8979eea43cf326a32dec1cd93713a1a8880"},
  "fr-gnd-2026-surnames.json": {"sha256": "3a9771a939b8252ad660d3aa0376534402a443a330bbce16d96b5f8483cb2198", "querySha256": "a42d99fdf17a80592efa96cd0d9518a07e1c06821ce58e925c07d60a1cec355b"},
  "gb-gnd-2026-female.json": {"sha256": "5e65cf6deacfa7499d0f45abee1abfaed94eff9365507874ae8391ee47034179", "querySha256": "163d93f249793bafe95f3edea0d98dfa51cb9f525a35cf46388570ae36408b65"},
  "gb-gnd-2026-male.json": {"sha256": "fe3dfbd2743d3904a61244a7bf0d4a926d4d5663ace518447ed828b31a98cbd2", "querySha256": "07c298e4c29f2f76661290124373cb0069e80c5d1b819826e1ef55296df56f26"},
  "gb-gnd-2026-surnames.json": {"sha256": "d969f1386b3f1d8e3e8abf1ea2e8c752e087cbe2389a58cc502918c89a0a1778", "querySha256": "874c81624c19861ab4554100c66e683715c6e392801b9f4afcfc838afa5bc9be"},
  "ie-gnd-2026-female-surnames.json": {"sha256": "932cb5196131784d35bcd934cca63082f8adb67e33d603cd3ff4a9a8f50754d7", "querySha256": "2275ab0f35adec7c4e87725ebefb2d49526a5148a1da951e09dd1bb05008cc08"},
  "ie-gnd-2026-female.json": {"sha256": "727088f8146b6bf6e2480c53fb12ec070590687258abcbb754d1bac56d79f681", "querySha256": "69352a0b895706f4df5d9806675372286677f8f96970a59ed889045ed052b355"},
  "ie-gnd-2026-male-surnames.json": {"sha256": "4a9db1ba3d3d7b04cb4824bc07cd8ea7512158597f1114ff4658fe70c67456f7", "querySha256": "56e21db4c81e7f7fbab0320ef64f3f3e6d0b867d86faf1e4d038a1368db5b806"},
  "ie-gnd-2026-male.json": {"sha256": "890df5c4d4846622a4d96e43833ad0dbd0c7455353904dda39d89d8e014e3cd2", "querySha256": "33cdd79723b5e3aec89a11b86894ba0c3f79ded980a3e4f3538d446d437330d1"},
  "it-bergamo-2021-surnames.json": {"sha256": "ef5aba340714a285d7ef0d6d879bec2313ac03e7f793d9a3482a77efc8c2bda2"},
  "it-bergamo-2025-names.json": {"sha256": "1fdecc4b276e0144ccf6b261774591b48be4e5543bbb49b2a5ae73b48b58a0cb"},
  "lu-gnd-2026-surnames.json": {"sha256": "0bbe66e0dbcf50557fe3695d02d679bf6b85a0c20f7c53943af1d7efbc06d73f", "querySha256": "f154f8a5674e35d305c0424533b721b362d419caf8ecbf9e486f930b21127153"},
  "lu-rnpp-2020-names.json": {"sha256": "156c2ea8d93a40e8b804f867dc097c3ceaadbf5f9a5fce80faa42da764d0eac5"},
  "lv-archives-surnames.json": {"sha256": "f886df1cd7c9503fbeacfa4229efc353457abf26a8485a0ba63bae7715afe6b2"},
  "lv-pmlp-2026-names.json": {"sha256": "513d9cebe76443d687194a9139b4dc040567789f295f70fdc53c74b3c7474260"},
  "nl-gnd-2026-female.json": {"sha256": "5ed9253fecf8202587f81dd5d58c03157ca2cc20e788b7499d01b619face56f8", "querySha256": "424244ccd5c0fac9c81bc2a9c436352661cc73f402ab161f65a44d6ae6219560"},
  "nl-gnd-2026-male.json": {"sha256": "0af89ebc4019ea3980e18217100e20c1a8be2a0c1fb2bdb6f70e41ec35a7c57f", "querySha256": "31f2ac731f407415192001c839f692160eeef3154027b72ea65b107a050bef72"},
  "nl-gnd-2026-surnames.json": {"sha256": "765199bef88cdce8e1156d63c4d8699cc05f04ab37c97e111226a2f64621fbbd", "querySha256": "c6de0b93043a2ab350836e8760bda29caa799e06844e78adc50fd7136153bb71"},
  "no-gnd-2026-female-surnames.json": {"sha256": "b65b1157aa9f3c9f1cf1d3bef7151c76b1874b4048eb67891512f32f550c98c3", "querySha256": "43e2ad47ede381e98e44fceab192b7e01b9d74fe17813404507e81c9f4eda1a5"},
  "no-gnd-2026-female.json": {"sha256": "3b4bc63fb7612df8786fc46cd0519735958a9b41aeac66d095199e61b6d645da", "querySha256": "b339099e13c2fc26d676b10f5d9708723583909365b98b4a810a3b9db3f61e24"},
  "no-gnd-2026-male-surnames.json": {"sha256": "b04102937a66ccb35e1c374e4b25b261f1d52c82ba136248850223210def3bf3", "querySha256": "c90dc1eb3a53a7c80720ea34031260405d2438eb04451216546c94272a1f7911"},
  "no-gnd-2026-male.json": {"sha256": "f5046d9755b99f3de3d510a5741d75b3fee9fb83cbe931d154183f2bf8888955", "querySha256": "da1149bc157d9fc1e64201d497918a0cbaef190b228930046c0ef46edc5a805a"},
  "pl-pesel-2026-names.json": {"sha256": "8f50f09394f111e4abf283c6055188b1b674916b043314a20ab46e9d2142d76a"},
  "pl-pesel-2026-surnames.json": {"sha256": "3ebe3a781d64719344b9d2abc2961bc1148f01abd00a1ea9975acc8cf780418c"},
  "se-scb-2020-surnames.json": {"sha256": "62f3f107b0578c6cb7e02ee766b1417b4bd52b8d09cd63ee2de1ec76f31718b7"},
  "se-scb-2022-names.json": {"sha256": "46b78bc2f4e06e44ef54dc519c4eb8ddc47902169a089b5eda7a18561141f3a8"},
  "us-census-2010.json": {"sha256": "71336079c0ec6e264106aebe87038e913405e14232353cf788aedf8178aecf53"},
  "us-ssa-2025.json": {"sha256": "ddda7e30c1f25e56e5d4426ec0a33d989e5d9efca33f27874a0864fe07ed5c7f"},
};
