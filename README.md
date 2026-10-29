# Full Name Generator

[![npm version](https://img.shields.io/npm/v/full-name-generator.svg?style=flat-square)](https://www.npmjs.com/package/full-name-generator)
[![npm downloads](https://img.shields.io/npm/dm/full-name-generator.svg?style=flat-square)](https://www.npmjs.com/package/full-name-generator)

Generate random given names, surnames and full names for **16 countries**.
TypeScript types, CommonJS and ES modules, no runtime dependencies.

## Install

```sh
npm install full-name-generator
```

## Usage

```js
import { firstName, lastName, fullName, Gender } from 'full-name-generator';

console.log(fullName('US', Gender.Female));     // e.g. "Mia Lopez"
console.log(firstName('FR', Gender.Male));      // e.g. "Philippe"
console.log(lastName('US'));                    // e.g. "Miller"
console.log(lastName('PL', Gender.Female));     // e.g. "Kwiatkowska"
```

Country codes are case-insensitive. `Gender.Male` is `0` and `Gender.Female` is `1`.

The default import contains the first 15 entries of each list, so it stays small.
Import `full-name-generator/full` for all entries:

```js
import { fullName, Gender } from 'full-name-generator/full';
```

CommonJS:

```js
const { fullName, Gender } = require('full-name-generator');
```

### Multiple names and order

```js
firstName('US', Gender.Male, 2);                            // e.g. "Theodore William"
lastName('US', undefined, 2);                               // e.g. "Anderson Johnson"
fullName('US', Gender.Female, 2, 1);                        // e.g. "Eliana Sophia Lopez"
fullName('PL', Gender.Female, 1, 1, ', ', 'family-first');  // e.g. "Dąbrowska, Agnieszka"
```

The default order is `given-first`. The separator goes between the given names and
the surnames.

## Countries

| Country | Code | Given names M / F | Surnames M / F | Based on data from |
| --- | --- | ---: | ---: | --- |
| Austria | AT | 566 / 468 | 1,000 shared | German National Library (GND) |
| Czechia | CZ | 266 / 121 | 425 / 52 | German National Library (GND) |
| Finland | FI | 177 / 117 | 404 shared | German National Library (GND) |
| France | FR | 803 / 540 | 1,000 shared | German National Library (GND) |
| Germany | DE | 1,000 / 1,000 | 1,000 shared | German National Library (GND) |
| Ireland | IE | 120 / 75 | 118 / 38 | German National Library (GND) |
| Italy | IT | 192 / 179 | 1,732 shared | Comune di Bergamo |
| Latvia | LV | 1,000 / 1,000 | 635 / 278 | PMLP; National Archives of Latvia |
| Luxembourg | LU | 49 / 54 | 43 shared | CTIE (RNPP); German National Library (GND) |
| Netherlands | NL | 549 / 374 | 1,000 shared | German National Library (GND) |
| Norway | NO | 215 / 123 | 152 / 44 | German National Library (GND) |
| Poland | PL | 1,000 / 1,000 | 1,000 / 1,000 | Ministry of Digital Affairs (PESEL) |
| Spain | ES | 478 / 288 | 1,000 shared | German National Library (GND) |
| Sweden | SE | 1,000 / 1,000 | 1,000 shared | Statistics Sweden |
| United Kingdom | GB | 778 / 711 | 1,000 shared | German National Library (GND) |
| United States | US | 1,000 / 1,000 | 1,000 shared | SSA; US Census Bureau |

Czechia, Ireland, Latvia, Norway and Poland need a gender for `lastName()`.

Source details: [DATA-LICENSES.md](https://github.com/ozdemirburak/full-name-generator/blob/main/DATA-LICENSES.md).

## API

```ts
type NameOrder = 'given-first' | 'family-first';

declare function firstName(isoCode: string, gender: Gender, n?: number): string;
declare function lastName(isoCode: string, gender?: Gender, n?: number): string;
declare function fullName(
  isoCode: string,
  gender: Gender,
  firstN?: number,
  lastN?: number,
  space?: string,
  order?: NameOrder
): string;
declare function getCountries(): string[];
declare function getCountryInfo(isoCode: string): CountryInfo;
```

Counts default to `1` (maximum 10,000), `space` to `' '` and `order` to
`'given-first'`. Invalid arguments throw an error.

```js
import { getCountries, getCountryInfo } from 'full-name-generator/full';

getCountries();         // ['at', 'cz', 'de', ...]
getCountryInfo('US');   // { firstNames: { male: 1000, female: 1000 }, surnames: { male: 1000, female: 1000 }, genderSpecificSurnames: false }
```

## Upgrading from v1

Some v1 countries are not available anymore. Czech, Irish, Latvian, Norwegian and
Polish surnames need a gender. Generated names are different from v1.

## Development

Use Node.js 24: `nvm use && npm ci && npm run check`. See
[CONTRIBUTING.md](https://github.com/ozdemirburak/full-name-generator/blob/main/CONTRIBUTING.md).

## License

[MIT](https://github.com/ozdemirburak/full-name-generator/blob/main/LICENSE). The
bundled name data is derived from
[CC0 data sources](https://github.com/ozdemirburak/full-name-generator/blob/main/DATA-LICENSES.md)
from official publishers. Their data and terms can change.

## Disclaimer

This package and its data are provided "as is", without warranty of any kind. The
authors accept no liability for any use of this package, its data or the names it
generates. The authors do not guarantee that the data is accurate, complete or
current, or that its source terms stay the same. You alone are responsible for your
use and for checking the current source terms. Generated names can match real
people. This package is not affiliated with or endorsed by any data publisher.
