"""Reproduce Swedish and Latvian snapshots from pinned original downloads.

python3 scripts/import-europe-originals.py /path/to/downloads [--check]
Only this optional check uses Python; normal builds use the offline Node importer.
The archive is reduced to surname counts: no person-level records are written.
"""
import argparse
from collections import Counter
import csv
import hashlib
import json
from pathlib import Path
import unicodedata
import xml.etree.ElementTree as ET

DATA = Path(__file__).resolve().parent / 'data'
MANIFESTS = ['lv-pmlp-2026-names.json', 'lv-archives-surnames.json',
             'se-scb-2022-names.json', 'se-scb-2020-surnames.json']


def clean_name(value):
    name = unicodedata.normalize('NFC', value.strip())
    if len(name) < 2 or not name[0].isalpha() or not (
            name[-1].isalpha() or unicodedata.category(name[-1]).startswith('M')):
        return None
    if any(not (ch.isalpha() or unicodedata.category(ch).startswith('M')
                or ch in " '-’") for ch in name):
        return None
    return name


def select(pools, minimum):
    rows = []
    for gender, pool in pools.items():
        eligible = ((name, count) for name, count in pool.items() if count >= minimum)
        ordered = sorted(eligible, key=lambda row: (-row[1], row[0].encode('utf8')))[:1000]
        rows.extend((gender, name, count) for name, count in ordered)
    return rows


def reproduce(filename, directory):
    if filename == 'lv-pmlp-2026-names.json':
        pools = {'0': Counter(), '1': Counter()}
        sexes = {'VĪRIETIS': '0', 'SIEVIETE': '1'}
        with (directory / 'lv-given-2026.csv').open(encoding='utf-8-sig', newline='') as stream:
            reader = csv.DictReader(stream)
            assert reader.fieldnames == ['Vardi', 'Dzimums', 'Skaits']
            for record in reader:
                name = clean_name(record['Vardi'])
                assert record['Dzimums'] in [*sexes, 'NAV NORĀDĪTS'] and record['Skaits'].isdigit()
                if name and record['Dzimums'] in sexes:
                    pools[sexes[record['Dzimums']]][name] += int(record['Skaits'])
        return select(pools, 5)
    if filename == 'lv-archives-surnames.json':
        pools = {'0': Counter(), '1': Counter()}
        sexes = {'TRUE': '0', 'FALSE': '1'}
        seen = set()
        examples = {}
        # Streaming avoids retaining the unrelated biographical fields in memory.
        for _, element in ET.iterparse(directory / 'lv-students.xml', events=('end',)):
            if element.tag != 'lu_stud':
                continue
            identifier = element.findtext('id')
            assert identifier not in seen, 'Duplicate archive record'
            seen.add(identifier)
            name = clean_name(element.findtext('Uzvards') or '')
            sex = element.findtext('Dzimums')
            key = (element.findtext('Apraksts'), element.findtext('Lieta'))
            if key in [('2', '11'), ('2', '36')]:
                examples[key] = sex
            if sex in sexes and name:
                pools[sexes[sex]][name] += 1
            element.clear()
        assert len(seen) == 28459, 'Unexpected archive size'
        # These cases were checked against the publisher's masculine/feminine
        # enrolment labels in its search results (URLs recorded in the manifest).
        assert examples == {('2', '11'): 'TRUE', ('2', '36'): 'FALSE'}
        return select(pools, 5)
    births = filename == 'se-scb-2022-names.json'
    paths = [directory / 'se-birth-2022.json'] if births else [
        directory / f'se-surname-2020-{i}.json' for i in range(3)]
    pools = {'0': Counter(), '1': Counter()} if births else {'*': Counter()}
    seen = set()
    for path in paths:
        table = json.loads(path.read_text(encoding='utf-8'))
        dimension = 'Tilltalsnamn' if births else 'Efternamn'
        assert table['source'] == 'Statistics Sweden', 'Different responsible agency needs rights review'
        assert table['id'] == ([dimension, 'Kon', 'ContentsCode', 'Tid'] if births else [dimension, 'ContentsCode', 'Tid'])
        assert table['size'][1:] == ([2, 1, 1] if births else [1, 1])
        assert table['dimension']['Tid']['category']['index'] == {('2022' if births else '2020'): 0}
        category = table['dimension'][dimension]['category']
        assert len(category['index']) == table['size'][0]
        assert len(table['value']) == table['size'][0] * (2 if births else 1)
        if births:
            sex = table['dimension']['Kon']['category']
            assert sex['index'] == {'2': 0, '1': 1} and sex['label'] == {'2': 'girls', '1': 'boys'}
        for code, offset in category['index'].items():
            assert code not in seen, 'Overlapping SCB chunks'
            seen.add(code)
            name = clean_name(category['label'][code])
            if not name:
                continue
            for gender, position in ([('0', offset * 2 + 1), ('1', offset * 2)] if births else [('*', offset)]):
                count = table['value'][position]
                if count is None:
                    continue  # Suppressed cells are never treated as zero or guessed.
                assert isinstance(count, int) and count >= (2 if births else 10)
                pools[gender][name] += count
    metadata = json.loads((directory / ('se-birth-meta.json' if births else 'se-surname-meta.json')).read_text(encoding='utf-8'))
    assert seen == set(metadata['variables'][0]['values']), 'Missing SCB names or query chunk'
    return select(pools, 2 if births else 10)


def encode(rows):
    return ('gender\tname\tcount\n' + ''.join(f'{g}\t{n}\t{c}\n' for g, n, c in rows)).encode('utf8')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('directory', type=Path)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    for filename in MANIFESTS:
        metadata = json.loads((DATA / filename).read_text(encoding='utf-8'))
        for source in metadata['originalFiles']:
            assert hashlib.sha256((args.directory / source['filename']).read_bytes()).hexdigest() == source['sha256'], \
                f"Changed original download: {source['filename']}"
        output = encode(reproduce(filename, args.directory))
        assert hashlib.sha256(output).hexdigest() == metadata['sha256'], f'Extracted snapshot differs: {filename}'
        target = DATA / metadata['snapshot']
        if args.check:
            assert target.read_bytes() == output, f'Snapshot differs: {filename}'
        else:
            target.write_bytes(output)
        print(f'Verified {filename} against original downloads.', flush=True)


if __name__ == '__main__':
    main()
