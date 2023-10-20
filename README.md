# [Full Name Generator](https://fullnamegenerator.com) - Generate Random Names

[![npm-version]][npm] [![npm-downloads]][npm]

Generate random names effortlessly using various data sources of popular first names and surnames
from multiple countries. 

If you find this package helpful, please consider ⭐ starring it on [GitHub](https://github.com/ozdemirburak/full-name-generator).

## Installation

```bash
$ npm install full-name-generator --save
```

## Usage

````js
import { firstName, lastName, fullName } from 'full-name-generator';

// Generate Full Names
const maleFullName = fullName('US', 0);
const femaleFullName = fullName('US', 1);

// Generate First Names
const maleFirstName = firstName('US', 0);
const femaleFirstName = firstName('US', 1);

// Generate Surnames
const turkishSurname = lastName('TR');
const czechFemaleSurname = lastName('CZ', 1);

// Generate Multiple Names
const twoAmericanMaleFirstNames = firstName('US', 0, 2);
const twoAmericanLastNames = lastName('US', null, 2);
const twoAmericanNamesThreeSurnamesFemaleFullName = fullName('US', 1, 2, 3);
````

## Countries

- 🇦🇷 Argentina (AR)
- 🇦🇹 Austria (AT)
- 🇧🇪 Belgium (BE)
- 🇧🇷 Brazil (BR)
- 🇨🇳 China (CN)
- 🇨🇿 Czechia (CZ)
- 🇩🇰 Denmark (DK)
- 🇫🇮 Finland (FI)
- 🇫🇷 France (FR)
- 🇩🇪 Germany (DE)
- 🇬🇷 Greece (GR)
- 🇮🇱 Israel (IL)
- 🇮🇳 India (IN)
- 🇮🇩 Indonesia (ID)
- 🇮🇹 Italy (IT)
- 🇯🇵 Japan (JP)
- 🇲🇽 Mexico (MX)
- 🇳🇱 Netherlands (NL)
- 🇳🇴 Norway (NO)
- 🇵🇱 Poland (PL)
- 🇵🇹 Portugal (PT)
- 🇷🇺 Russia (RU)
- 🇸🇦 Saudi Arabia (SA)
- 🇰🇷 South Korea (KR)
- 🇪🇸 Spain (ES)
- 🇸🇪 Sweden (SV)
- 🇹🇼 Taiwan (TW)
- 🇹🇭 Thailand (TH)
- 🇹🇷 Türkiye (TR)
- 🇬🇧 United Kingdom (GB)
- 🇺🇸 United States (US)
- 🇻🇳 Vietnam (VN)

## Functions

### fullName

Generates a full name based on the provided parameters.

```js
fullName(isoCode: string, gender: Gender, firstN: number = 1, lastN: number = 1, space: string = ' '): string
```

- **isoCode**: The ISO code for the country (e.g., BR, CZ, US).
- **gender**: Gender category for the name. (0 - Male, 1 - Female).
- **firstN**: Number of first names to be generated (default is 1).
- **lastN**: Number of surnames to be generated (default is 1).
- **space**: Separator between the first names and surnames (default is a single whitespace).

### firstName

Generates one or more first names based on the provided country code and gender.

```js
firstName(isoCode: string, gender: Gender, n: number = 1): string
```

- **isoCode**: The ISO code for the country (e.g., BR, CZ, US).
- **gender**: Gender category for the name. (0 - Male, 1 - Female).
- **n**: Number of first names to generate (default is 1).

### lastName

Generates one or more surnames. For some countries like the Czech Republic or Poland, gender is considered.
```js
lastName(isoCode: string, gender?: Gender, n: number = 1): string
```

- **isoCode**: The ISO code for the country (e.g., BR, CZ, US).
- **gender**: (Optional) Gender category for the surname. Required for countries like the Czech Republic. (0 - Male, 1 - Female).
- **n**: Number of surnames to generate (default is 1).

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.

  [npm-version]: https://img.shields.io/npm/v/full-name-generator.svg?style=flat-square
  [npm-downloads]: https://img.shields.io/npm/dm/full-name-generator.svg?style=flat-square
  [npm]: https://www.npmjs.com/package/full-name-generator

To reference this project, use the code snippet below:

```html
<a href="https://fullnamegenerator.com">Full Name Generator</a>
```
