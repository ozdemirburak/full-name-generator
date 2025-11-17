# [Full Name Generator](https://fullnamegenerator.com) - Generate Random Names

[![npm-version]][npm] [![npm-downloads]][npm] [![license]][license-url]

Generate random names using authentic data sourced from government statistical
offices across 25 countries, including popular first names and surnames from 
official national datasets.

> **IMPORTANT**: This library's **code is MIT licensed**, but the **name data
> requires attribution** under various government open data licenses. See
> [License & Attribution](#license) for details.

## Installation

```bash
$ npm install full-name-generator --save
```

## Usage

By default, this package includes a lite version with 15 names/surnames
per gender per country for smaller bundle sizes. If you need access to the complete
dataset, see [Full Version](#full-version) below.

```js
import { firstName, lastName, fullName, Gender } from 'full-name-generator';

// Generate Full Names
const maleFullName = fullName('US', Gender.Male);
const femaleFullName = fullName('US', Gender.Female);

// Generate First Names
const maleFirstName = firstName('US', Gender.Male);
const femaleFirstName = firstName('US', Gender.Female);

// Generate Surnames
const turkishSurname = lastName('TR');
const czechFemaleSurname = lastName('CZ', Gender.Female);

// Generate Multiple Names
const twoAmericanMaleFirstNames = firstName('US', Gender.Male, 2);
const twoAmericanLastNames = lastName('US', undefined, 2);
const twoAmericanNamesThreeSurnamesFemaleFullName = fullName('US', Gender.Female, 2, 3);

// Custom separator
const hyphenatedName = fullName('US', Gender.Male, 1, 1, '-');
```

### Full Version

If you need access to the complete dataset with all names and surnames:

```js
import { firstName, lastName, fullName, Gender } from 'full-name-generator/full';

const name = fullName('US', Gender.Male);
```

## Countries

- 🇦🇷 Argentina (AR)
- 🇧🇪 Belgium (BE)
- 🇧🇷 Brazil (BR)
- 🇨🇿 Czechia (CZ)
- 🇩🇰 Denmark (DK)
- 🇫🇮 Finland (FI)
- 🇫🇷 France (FR)
- 🇮🇸 Iceland (IS)
- 🇮🇪 Ireland (IE)
- 🇮🇱 Israel (IL)
- 🇮🇹 Italy (IT)
- 🇱🇻 Latvia (LV)
- 🇰🇿 Kazakhstan (KZ)
- 🇲🇽 Mexico (MX)
- 🇳🇿 New Zealand (NZ)
- 🇳🇴 Norway (NO)
- 🇵🇱 Poland (PL)
- 🇸🇮 Slovenia (SI)
- 🇰🇷 South Korea (KR)
- 🇪🇸 Spain (ES)
- 🇸🇪 Sweden (SE)
- 🇹🇼 Taiwan (TW)
- 🇹🇷 Türkiye (TR)
- 🇬🇧 United Kingdom (GB)
- 🇺🇸 United States (US)

## API Reference

### Gender Enum

```ts
enum Gender {
  Male = 0,
  Female = 1
}
```

### fullName()

Generates a full name based on the provided parameters.

```ts
fullName(isoCode: string, gender: Gender, firstN?: number, lastN?: number, space?: string): string
```

**Parameters:**
- **isoCode**: The ISO code for the country (e.g., 'BR', 'CZ', 'US'). Case-insensitive.
- **gender**: Gender category for the name. Use `Gender.Male` or `Gender.Female` (or numeric values 0/1).
- **firstN**: Number of first names to be generated (default: `1`).
- **lastN**: Number of surnames to be generated (default: `1`).
- **space**: Separator between the first names and surnames (default: `' '`).

**Returns:** A randomly generated full name as a string.

### firstName()

Generates one or more first names based on the provided country code and gender.

```ts
firstName(isoCode: string, gender: Gender, n?: number): string
```

**Parameters:**
- **isoCode**: The ISO code for the country (e.g., 'BR', 'CZ', 'US'). Case-insensitive.
- **gender**: Gender category for the name. Use `Gender.Male` or `Gender.Female` (or numeric values 0/1).
- **n**: Number of first names to generate (default: `1`).

**Returns:** A randomly generated first name (or multiple names separated by spaces).

### lastName()

Generates one or more surnames. For some countries like Czechia, Iceland, Latvia, and Poland, gender is considered.

```ts
lastName(isoCode: string, gender?: Gender, n?: number): string
```

**Parameters:**

- **isoCode**: The ISO code for the country (e.g., 'BR', 'CZ', 'US'). Case-insensitive.
- **gender**: (Optional) Gender category for the surname. Required for countries like Czechia, Iceland, Latvia, and Poland.
  Use `Gender.Male` or `Gender.Female` (or numeric values 0/1).
- **n**: Number of surnames to generate (default: `1`).

**Returns:** A randomly generated surname (or multiple surnames separated by spaces).

## License

This library has a **dual licensing structure**:

### 1. Code License

The source code implementation (TypeScript/JavaScript functions, logic, and types)
is licensed under the **[MIT License](LICENSE)**.

### 2. Data License

The name and surname datasets embedded in this package are sourced from government
statistical offices under **various open data licenses**.

**IMPORTANT**: When you use this package, you are using a **combined work** and must
comply with BOTH the code license (MIT) and the applicable data licenses.

**REQUIREMENT**: Most countries require you to provide attribution to the original
data sources. Failure to comply may violate the data licenses.

#### Required Attribution

Below are the data sources and their respective licenses:

- Argentina: RENAPER (CC BY 4.0) - <https://www.datos.gob.ar>
- Belgium: Statbel (CC BY 4.0) - <https://statbel.fgov.be>
- Brazil: IBGE - <https://www.ibge.gov.br>
- Czech Republic: ČSÚ (CC BY 4.0) - <https://csu.gov.cz>
- Denmark: Statistics Denmark (CC BY 4.0) - <https://www.dst.dk>
- Finland: Population Register Centre (CC BY 4.0) - <https://www.avoindata.fi>
- France: INSEE (Licence Ouverte 2.0) - <https://www.insee.fr>
- Iceland: Statistics Iceland (CC BY 4.0) - <https://statice.is>
- Ireland: CSO Ireland (CC BY 4.0) - <https://www.cso.ie>
- Israel: CBS Israel - <https://www.cbs.gov.il>
- Italy: AGID (CC BY 4.0) - <https://www.dati.gov.it>
- Kazakhstan: ҚР СЖРА Ұлттық статистика бюросы - <https://stat.gov.kz>
- Latvia: PMLP - <https://stat.gov.lv>
- Mexico: SEP via Datamx.io (CC0 1.0) - <https://datamx.io>
- New Zealand: DIA (CC BY 4.0) - <https://www.data.govt.nz>
- Norway: SSB (NLOD 2.0) - <https://www.ssb.no>
- Poland: Polish Government (CC0 1.0) - <https://dane.gov.pl>
- Slovenia: SURS - <https://www.stat.si>
- South Korea: Supreme Court of Korea - <https://stfamily.scourt.go.kr>
- Spain: INE (CC BY 4.0) - <https://www.ine.es>
- Sweden: SCB (CC BY 4.0) - <https://www.scb.se>
- Taiwan: Ministry of Interior - <https://www.ris.gov.tw>
- Türkiye: TÜİK - <https://www.tuik.gov.tr>
- United Kingdom: ONS (OGL v3.0) - <https://www.ons.gov.uk>
- United States: SSA (U.S. Public Domain) - <https://www.ssa.gov>

If you find this library helpful, linking back to us is also appreciated but not required:

- Full Name Generator: <https://fullnamegenerator.com>

---

For specific dataset URLs, refer to the header comments in `src/names/{country}.ts`
and `src/surnames/{country}.ts` files in the [names](https://github.com/ozdemirburak/full-name-generator/tree/main/src/names)
and [surnames](https://github.com/ozdemirburak/full-name-generator/tree/main/src/surnames) folders.

[npm-version]: https://img.shields.io/npm/v/full-name-generator.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/full-name-generator.svg?style=flat-square
[npm]: https://www.npmjs.com/package/full-name-generator
[license]: https://img.shields.io/npm/l/full-name-generator.svg?style=flat-square
[license-url]: https://github.com/ozdemirburak/full-name-generator/blob/main/LICENSE
