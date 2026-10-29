"""Reproduce Polish PESEL snapshots from four original official XLSX files.

python3 scripts/import-pl-workbooks.py /path/to/workbooks [--check]
Only this optional original-file check needs Python; normal builds are offline Node.js.
"""
import argparse
import hashlib
import json
from pathlib import Path
import xml.etree.ElementTree as ET
from zipfile import ZipFile

DATA = Path(__file__).resolve().parent / 'data'
NS = {'s': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}


def selected_rows(path, source):
    if hashlib.sha256(path.read_bytes()).hexdigest() != source['sha256']:
        raise ValueError(f'Original PESEL workbook checksum mismatch: {path.name}')
    with ZipFile(path) as workbook:
        strings = [''.join(item.itertext()) for item in ET.fromstring(
            workbook.read('xl/sharedStrings.xml')).findall('s:si', NS)]
        rows = []
        with workbook.open('xl/worksheets/sheet1.xml') as sheet:
            for _, element in ET.iterparse(sheet, events=('end',)):
                if element.tag != f"{{{NS['s']}}}row":
                    continue
                cells = {}
                for cell in element.findall('s:c', NS):
                    column = ''.join(ch for ch in cell.attrib['r'] if ch.isalpha())
                    value = cell.find('s:v', NS)
                    text = '' if value is None else value.text
                    if cell.attrib.get('t') == 's':
                        text = strings[int(text)]
                    elif cell.attrib.get('t') == 'inlineStr':
                        text = ''.join(cell.find('s:is', NS).itertext())
                    cells[column] = text
                element.clear()
                values = [cells.get(column, '') for column in source['columns']]
                if not any(values):
                    continue
                if not rows:
                    if values != source['header']:
                        raise ValueError(f'Unexpected PESEL columns: {path.name}')
                    rows.append(None)
                    continue
                name, count = values[0], values[-1]
                if not name.strip() or not count.isdigit() or int(count) < 2:
                    raise ValueError(f'Invalid PESEL row: {path.name}: {values}')
                if source['kind'] == 'names' and values[1] != source['recordedSex']:
                    raise ValueError(f'Unexpected recorded sex: {path.name}: {values}')
                rows.append((name, int(count)))
    records = rows[1:]
    if len(records) != source['rowCount'] or len({row[0] for row in records}) != len(records):
        raise ValueError(f'Unexpected row count or duplicate source names: {path.name}')
    selected = sorted(records, key=lambda row: (-row[1], row[0].encode('utf8')))[:1000]
    if any(name != name.strip() for name, _ in selected):
        raise ValueError(f'Selected PESEL name has outer whitespace: {path.name}')
    return selected


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('directory', type=Path)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    for kind in ('names', 'surnames'):
        metadata = json.loads((DATA / f'pl-pesel-2026-{kind}.json').read_text(encoding='utf-8'))
        rows = []
        for source in metadata['originalFiles']:
            rows.extend(f"{source['gender']}\t{name}\t{count}" for name, count in
                        selected_rows(args.directory / source['filename'], source))
        output = ('gender\tname\tcount\n' + '\n'.join(rows) + '\n').encode('utf8')
        if hashlib.sha256(output).hexdigest() != metadata['sha256']:
            raise ValueError(f'Extracted PESEL snapshot checksum differs: {kind}')
        target = DATA / metadata['snapshot']
        if args.check:
            if target.read_bytes() != output:
                raise ValueError(f'Snapshot differs from original PESEL workbooks: {kind}')
        else:
            target.write_bytes(output)
    print('Verified all four Polish PESEL selections against the original workbooks.')


if __name__ == '__main__':
    main()
