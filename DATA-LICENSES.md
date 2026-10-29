# Data licences and admission policy

Reviewed **29 October 2026**, for version **2.0.0**.

**This package is [MIT licensed](LICENSE). Every bundled dataset comes from an
official publisher that releases it under CC0 1.0.** This file records each
source and its CC0 evidence.

The project admits only official data with an explicit **CC0**
dedication or a separately verified **public-domain** basis that imposes no
mandatory data attribution. Every dataset in this release has an explicit CC0
declaration in its official catalogue or applicable API terms. No statutory-only public-domain exception
is needed for the current selection.

Published aggregates and name-only aggregates reproduced from official archives
and authority files are eligible. Historical and authority samples must be labelled; no person-level
biographies, dates of birth or sensitive attributes are retained in the library.

## Included sources

| Data | Official source | Publisher's CC0 evidence | Selection and scope |
| --- | --- | --- | --- |
| Austrian, German and Dutch first names and surnames | Deutsche Nationalbibliothek, [GND SPARQL service](https://sparql.dnb.de/gnd) | Service declares all DNB metadata CC0; [official API documentation](https://www.dnb.de/EN/Professionell/Metadatendienste/Datenbezug/LDS/sparql.html) confirms GND authority-data scope | Authority-file samples, all periods. AT: 566 male, 468 female, 1,000 shared surnames; DE: 1,000 per given-name sex and 1,000 shared surnames; NL: 549 male, 374 female, 1,000 shared surnames. Structured preferred-name components from records with one country code; explicit male/female for given names. At least five distinct authority records per string, not population counts. |
| Czech first names and surnames | DNB, [GND authority metadata](https://sparql.dnb.de/gnd) | Same explicit GND CC0 declaration | Sole country association XA-CZ; 266 male and 121 female given names, 425 male and 52 female surname forms. Both name types are selected independently by explicit recorded sex, at least five authority records per spelling. Preserve observed forms; do not construct suffixes. |
| Finnish first names and surnames | DNB, [GND authority metadata](https://sparql.dnb.de/gnd) | Same explicit GND CC0 declaration | Sole country association XA-FI; 177 male and 117 female given names, 404 shared surnames. All valid strings meeting the five-record minimum. This is separate from the excluded attribution-required DVV data. |
| Spanish first names and surnames | DNB, [GND authority metadata](https://sparql.dnb.de/gnd) | Same explicit GND CC0 declaration | Sole country association XA-ES; 478 male and 288 female given names, 1,000 shared surnames selected from 1,476 valid strings. Preserve structured compounds and prefixes. BNE's conflicting export licence declarations are not used. |
| French first names and surnames | DNB, [GND authority metadata](https://sparql.dnb.de/gnd) | Same explicit GND CC0 declaration | Sole country association XA-FR; 803 male and 540 female given names, 1,000 shared surnames selected from 5,154 valid strings. Separate from attribution-required INSEE/BnF sources. |
| British first names and surnames | DNB, [GND authority metadata](https://sparql.dnb.de/gnd) | Same explicit GND CC0 declaration | Sole XA-GB, labelled “Great Britain” by the publisher; 778 male and 711 female given names, 1,000 shared surnames. This is an authority association, not complete UK population coverage. |
| Irish first names and surnames | DNB, [GND authority metadata](https://sparql.dnb.de/gnd) | Same explicit GND CC0 declaration | Sole XA-IE; 120 male and 75 female given names, 118 male and 38 female observed surname forms. DNB guidance generally dual-codes English-language Irish authors with XA-GB and XA-IE; the sole-code rule excludes those records from both samples. |
| Norwegian first names and surnames | DNB, [GND authority metadata](https://sparql.dnb.de/gnd) | Same explicit GND CC0 declaration | Sole country association XA-NO; 215 male and 123 female given names, 152 male and 44 female observed surname forms. Both name types require explicit recorded sex. Keep source spellings and separate surname pools; do not infer suffixes. All valid strings meeting the five-record threshold. |
| Luxembourg first names | CTIE, [2020 RNPP given names](https://data.public.lu/en/datasets/prenoms-les-plus-donnes-au-luxembourg/) | [Exact official metadata](https://data.public.lu/api/1/datasets/5f8601797a447238025d4fa4/): `license: cc-zero`, certified government publisher | 49 male and 54 female strings; preserve the published descending order. No frequencies or narrower demographic scope are supplied. Decode the original Windows-1252 CSV and verify its publisher checksum. |
| Luxembourg surnames | DNB, [GND authority metadata](https://sparql.dnb.de/gnd) | Same explicit GND CC0 declaration | 43 shared surname strings, each appearing in at least five qualifying authority records. Separate source and time scope from the RNPP given names. |
| Italian first names | Comune di Bergamo, [resident given names](https://www.dati.lombardia.it/d/s29g-dr7j) | [Dataset-specific official metadata](https://www.dati.lombardia.it/api/views/s29g-dr7j.json): `licenseId: CC0_10`; owner and author Comune di Bergamo | 2025; all 400 published top-100 rows by sex/citizenship become 192 male and 179 female strings after combining disjoint citizenship categories. A municipal resident sample, not national Italian rankings. |
| Italian surnames | Comune di Bergamo, [resident surnames](https://www.dati.lombardia.it/d/4pqu-7zkd) | [Dataset-specific official metadata](https://www.dati.lombardia.it/api/views/4pqu-7zkd.json): `licenseId: CC0_10`; same official publisher | 2021; all 1,750 published rows become 1,732 distinct shared surnames. Source publishes only counts greater than ten per citizenship group. Combine matching strings across Italian/foreign citizenship groups, never across years. |
| Latvian first names | PMLP, [Physical Persons Register given names](https://data.gov.lv/dati/lv/dataset/personu-vardi) | [Exact official catalogue record](https://data.gov.lv/dati/api/3/action/package_show?id=personu-vardi): `license_id: CC0-1.0` | 1 July 2026; 1,000 complete given-name strings or combinations per explicitly recorded sex, by count and UTF-8 spelling ties. Includes foreign names in the register. Omit unspecified sex and placeholders. |
| Latvian surnames | National Archives, [University of Latvia student records](https://data.gov.lv/dati/lv/dataset/latvijas-universitates-studentu-saraksts-1919-1944) | [Exact official catalogue record](https://data.gov.lv/dati/api/3/action/package_show?id=latvijas-universitates-studentu-saraksts-1919-1944): `license_id: CC0-1.0` | Historical university cohort, entrants 1919–1944. Aggregate the main surname field by recorded sex; keep forms with at least five records: 635 male and 278 female forms. These are archive-record counts, not modern national population statistics. Do not use the alternate-surname file or construct gender forms. |
| Swedish first names | SCB, [newborn first names normally used](https://api.scb.se/OV0104/v1/doris/en/ssd/BE/BE0001/BE0001D/BE0001Nyfodda) | [SCB open-data/API terms](https://www.scb.se/en/services/open-data-api/): CC0, expressly no source-attribution requirement | 2022; 1,000 published spellings per explicit boys/girls category, by count then UTF-8 spelling. Exclude suppressed cells; published counts start at two. |
| Swedish surnames | SCB, [registered surname bearers](https://api.scb.se/OV0104/v1/doris/en/ssd/BE/BE0001/BE0001G/BE0001ENamn10) | Same [SCB API terms](https://www.scb.se/en/services/open-data-api/); these API responses identify SCB as the responsible source | 31 December 2020; 1,000 shared surname strings by count then UTF-8 spelling, from three complete API query chunks. Published counts start at ten; protected identities are excluded by the source. |
| Polish first names | Ministry of Digital Affairs, [PESEL living-person first names](https://dane.gov.pl/pl/dataset/1667) | [Official dataset metadata](https://api.dane.gov.pl/1.4/datasets/1667): `license_name: CC0 1.0`; no additional reuse conditions | 20 January 2026; first-given-name field, independently recorded male/female lists. Select 1,000 strings per sex by descending count and UTF-8 spelling ties. These are PESEL register counts, not birth-year rankings or exclusively residents of Poland. |
| Polish surnames | Ministry of Digital Affairs, [PESEL living-person current surnames](https://dane.gov.pl/pl/dataset/1681) | [Official dataset metadata](https://api.dane.gov.pl/1.4/datasets/1681): `license_name: CC0 1.0`; no additional reuse conditions | 20 January 2026; select 1,000 strings per recorded sex by count and UTF-8 spelling ties. Keep gender forms in separate lists; do not infer suffixes. Single occurrences and deceased people are excluded by the publisher. |
| US first names | [Social Security Administration, 2025 rankings](https://www.ssa.gov/oact/babynames/rankchange.html) | [Official Data.gov dataset record](https://catalog.data.gov/dataset/baby-names-from-social-security-card-applications-national-data): CC0 1.0 | Exact 2025 ranks 1–1,000 per recorded sex, transcribed from the three official change-in-popularity tables. Preserve published spelling. National data concerns births in the 50 states and DC, excluding territories. SSA removes spaces/hyphens and suppresses low counts; recorded sex can contain source errors. |
| US surnames | [Census Bureau, 2010 surname data](https://www.census.gov/topics/population/genealogy/data/2010_surnames.html) | [Official Data.gov surname-product record](https://catalog.data.gov/dataset/2010-decennial-census-of-population-and-housing-surnames): CC0 1.0 | First 1,000 positive-rank surnames from the original Census CSV; omit the aggregate category and preserve source ordering for ties. These are aggregate census observations, not identified people. |

Italian strings, Latvian first names and Polish strings use initial capitals for each letter sequence; accents,
separators and compound forms remain. US surnames capitalize the first letter
and lowercase the rest without inventing internal capitalization. Counts are
used for selection only: generation is uniform over stored strings. The lite
edition takes the first 15 entries from each list.

Italian source apostrophes are retained, including trailing apostrophes; they
are not silently converted into accents. For Bergamo, only published counts are
summed. An omitted counterpart in another citizenship group is unknown, so sums
can be lower bounds rather than full city frequencies. Selection and generation
do not create a national demographic model.

Swedish spellings and Latvian archive surname forms preserve source casing.
The European import trims outer whitespace and normalizes Unicode to NFC; only
letters, combining marks, spaces, apostrophes and hyphens are eligible. Identical
normalized strings are aggregated before ranking. Compound given names remain
intact. Latvian archive sex codes are checked against the publisher’s displayed
masculine/feminine enrolment labels; the reproduction check guards the reviewed
cases. Unrecognized sex values and malformed names are excluded.

SCB’s CC0 scope here is its own Statistical Database API data. Ordinary website
tables use different terms and are not included. The library independently
selects and formats the API data; its lists are not official SCB statistical
products and do not imply cooperation or endorsement. SCB asks users not to
label processed output with SCB as its source. References here document the
original API inputs; the processed lists and generated names are this library’s
outputs.

DNB's [business-model terms](https://www.dnb.de/DE/Professionell/Metadatendienste/Datenbezug/geschaeftsmodell.html)
separately license some external-thesaurus cross-concordances under CC BY 4.0.
Those mappings are not included. This admission covers the structured GND person
and preferred-name metadata used by the recorded queries, not all DNB-hosted
datasets or the books described by catalogue records. The official scope and
exception page hashes are pinned with the rights evidence.

GND country codes describe principal life/activity locations or historical and
political associations, not citizenship, ethnicity or name language; see the
[DNB country-code guide](https://wiki.dnb.de/download/attachments/90411323/Laendercodeleitfaden.pdf).
The queries require exactly the selected country code and no conflicting gender.
Czech, Irish and Norwegian surname queries require explicit male/female and retain separate pools.
Other GND surname queries accept any single recorded gender and use shared pools.
They exclude records explicitly classified or linked as pseudonyms, fictional
characters and other categories recorded in the exact query. Unmarked source
errors can remain. Distinct authority identifiers are counted, not guaranteed
distinct real people. No person identifiers or biographies are retained.

GND names preserve case, prefixes and compounds after NFC normalization. The
import rejects single-letter given-name components, unsupported characters and
normalized duplicates;
it never sums potentially overlapping normalized record sets. Valid strings are
ranked by record count, with UTF-8 spelling ties, and capped at 1,000 per pool.
Every saved response is complete according to the endpoint's result total, and
repeat queries matched the reviewed bindings. Aggregate diagnostics found no
selected preferred-name nodes with multiple surname or prefix values, avoiding
accidental combinations in the prefix join. These are retrieval snapshots,
not 2026 population estimates. Luxembourg's RNPP list uses its original order
and is not subject to the GND five-record threshold.

## Credits and limits

Source credits, links and import descriptions are retained for transparency.
This package is not affiliated with or endorsed by any data publisher. Source
data and terms can change. See the
[README disclaimer](https://github.com/ozdemirburak/full-name-generator#disclaimer).

## Verification

`npm run verify:data` runs before builds and packing. It checks the exact reviewed
country and manifest inventory, source hashes, full importer output, and a
separately pinned rights-admission record. CC0 declarations are checked against
the saved official catalogue metadata (including exact Socrata dataset, owner
and licence identifiers) or pinned SCB/DNB terms reviews. Luxembourg metadata checks bind CC0 to the exact dataset and official publisher. Modified evidence, attribution conditions
and unreviewed public-domain claims fail the check. Snapshot hashes are pinned a second time in
`scripts/verified-sources.mjs`, and snapshots or rights records that contain an
email address fail the check; publisher contact details are removed from the evidence.

Source snapshots, original-download hashes, API query descriptions and the SSA
transcription method are in `scripts/data/`. Publisher licence records and the
SCB/DNB terms extracts (with original page hashes) are pinned in `scripts/data/rights/`.
The manifest URLs identify the originals.
These checks preserve reviewed evidence; they do not automatically decide legal
rights or monitor later publisher changes. Adding a source still requires human
review of its origin, exact scope and applicable rights.
