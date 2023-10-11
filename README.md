# [Full Name Generator](https://fullnamegenerator.com)

[![npm-version]][npm] [![npm-downloads]][npm]

Generate random names effortlessly using various data sources of popular first names and surnames
from multiple countries. 

Supported Countries: 🇺🇸🇹🇷

If you find this package helpful, please consider ⭐ starring it on [GitHub](https://github.com/ozdemirburak/full-name-generator)!

## Installation

```bash
$ npm install full-name-generator --save
```

## Usage

````js
import { firstName, lastName, fullName } from 'full-name-generator';

// Generate Full Names
const maleFullName = fullName('us', 0);
const femaleFullName = fullName('us', 1);
const unisexFullName = fullName('us', 2);

// Generate First Names
const maleFirstName = firstName('us', 0);
const femaleFirstName = firstName('us', 1);
const unisexFirstName =  firstName('us', 2);

// Generate Surnames
const surName = lastName('us');

// Generate Multiple Names
const twoMaleFirstNames = firstName('us', 0, 2);
const twoLastNames = lastName('us', 2);
const threeNamesFourSurnamesUnisexFullName = fullName('us', 2, 3, 4);
````

## Functions

### fullName

Generates a full name based on the provided parameters.

```js
fullName(isoCode: string, gender: Gender, firstN: number = 1, lastN: number = 1, space: string = ' '): string
```

- **isoCode**: The ISO code for the country (US, TR)
- **gender**: Gender category for the name. (0 - Male, 1 - Female, 2 - Unisex)
- **firstN**: Number of first names (default is 1).
- **lastN**: Number of surnames (default is 1).
- **space**: Separator between names (default is a whitespace).

### firstName

Generates one or more first names.

```js
firstName(isoCode: string, gender: Gender, n: number = 1): string
```

- **isoCode**: The ISO code for the country (US, TR)
- **gender**: Gender category for the name. (0 - Male, 1 - Female, 2 - Unisex)
- **n**: Number of first names to generate (default is 1).

### lastName

Generates one or more surnames.

```js
lastName(isoCode: string, n: number = 1): string
```

- **isoCode**: The ISO code for the country (US, TR)
- **n**: Number of surnames to generate (default is 1).

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.

  [npm-version]: https://img.shields.io/npm/v/full-name-generator.svg?style=flat-square
  [npm-downloads]: https://img.shields.io/npm/dm/full-name-generator.svg?style=flat-square
  [npm]: https://www.npmjs.com/package/full-name-generator

To reference this project, you can use the code snippet below:

```html
<a href="https://fullnamegenerator.com">Full Name Generator</a>
```
