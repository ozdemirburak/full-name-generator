import { isSharedSurnameList } from './data-types';
import type { NameList, Names, Surnames } from './data-types';

export enum Gender {
  Male = 0,
  Female = 1
}

export type NameOrder = 'given-first' | 'family-first';

export interface CountryInfo {
  firstNames: { male: number; female: number };
  surnames: { male: number; female: number };
  genderSpecificSurnames: boolean;
}

interface GeneratorApi {
  firstName(isoCode: string, gender: Gender, n?: number): string;
  lastName(isoCode: string, gender?: Gender, n?: number): string;
  fullName(isoCode: string, gender: Gender, firstN?: number, lastN?: number, space?: string, order?: NameOrder): string;
  getCountries(): string[];
  getCountryInfo(isoCode: string): CountryInfo;
}

const normalizeIsoCode = (isoCode: string): string => {
  if (typeof isoCode !== 'string') {
    throw new TypeError('ISO code must be a string.');
  }
  return isoCode.toLowerCase();
};

const getCountryData = <T>(data: Readonly<Record<string, T>>, isoCode: string): T => {
  const value = data[isoCode];
  if (!Object.prototype.hasOwnProperty.call(data, isoCode) || value === undefined) {
    throw new Error(`No data available for the ISO code: ${isoCode}`);
  }
  return value;
};

const requireGender = (gender: Gender | undefined, isoCode: string): Gender => {
  if (gender === undefined) {
    throw new Error(`Gender is required for the ISO code: ${isoCode}. Use Gender.Male (0) or Gender.Female (1).`);
  }
  if (gender !== Gender.Male && gender !== Gender.Female) {
    throw new Error(`No data available for the ISO code: ${isoCode} and gender: ${gender}. Use Gender.Male (0) or Gender.Female (1).`);
  }
  return gender;
};

/** Upper bound per call, so a typo cannot allocate an enormous string. */
const maxCount = 10_000;

const validateCount = (count: number, parameter: string): void => {
  if (!Number.isSafeInteger(count) || count <= 0 || count > maxCount) {
    throw new RangeError(`${parameter} must be an integer from 1 to ${maxCount}.`);
  }
};

const selectMultiple = (values: NameList, count: number): string => {
  return Array.from({ length: count }, () => {
    const selected = values[Math.floor(Math.random() * values.length)];
    if (selected === undefined) {
      throw new Error('No name available in the selected dataset.');
    }
    return selected;
  }).join(' ');
};

export const createGenerators = (names: Names, surnames: Surnames): GeneratorApi => {
  const getCountries = (): string[] => Object.keys(names).sort();

  const getCountryInfo = (isoCode: string): CountryInfo => {
    const country = normalizeIsoCode(isoCode);
    const firstNames = getCountryData(names, country);
    const lastNames = getCountryData(surnames, country);
    return {
      firstNames: {
        male: firstNames[Gender.Male].length,
        female: firstNames[Gender.Female].length
      },
      surnames: isSharedSurnameList(lastNames)
        ? { male: lastNames.length, female: lastNames.length }
        : { male: lastNames[Gender.Male].length, female: lastNames[Gender.Female].length },
      genderSpecificSurnames: !isSharedSurnameList(lastNames)
    };
  };

  const getNames = (isoCode: string, gender: Gender): NameList => {
    const country = getCountryData(names, isoCode);
    return country[requireGender(gender, isoCode)];
  };

  const getSurnames = (isoCode: string, gender?: Gender): NameList => {
    const country = getCountryData(surnames, isoCode);
    if (isSharedSurnameList(country)) {
      if (gender !== undefined) requireGender(gender, isoCode);
      return country;
    }
    return country[requireGender(gender, isoCode)];
  };

  const firstName = (isoCode: string, gender: Gender, n: number = 1): string => {
    const country = normalizeIsoCode(isoCode);
    validateCount(n, 'n');
    return selectMultiple(getNames(country, gender), n);
  };

  const lastName = (isoCode: string, gender?: Gender, n: number = 1): string => {
    const country = normalizeIsoCode(isoCode);
    validateCount(n, 'n');
    return selectMultiple(getSurnames(country, gender), n);
  };

  const fullName = (
    isoCode: string,
    gender: Gender,
    firstN: number = 1,
    lastN: number = 1,
    space: string = ' ',
    order: NameOrder = 'given-first'
  ): string => {
    const country = normalizeIsoCode(isoCode);
    validateCount(firstN, 'firstN');
    validateCount(lastN, 'lastN');
    if (typeof space !== 'string') {
      throw new TypeError('Separator must be a string.');
    }
    if (order !== 'given-first' && order !== 'family-first') {
      throw new RangeError('Name order must be given-first or family-first.');
    }
    const firstNames = getNames(country, gender);
    const lastNames = getSurnames(country, gender);
    // Draw in the same order regardless of presentation, including seeded callers.
    const given = selectMultiple(firstNames, firstN);
    const family = selectMultiple(lastNames, lastN);
    return order === 'family-first' ? `${family}${space}${given}` : `${given}${space}${family}`;
  };

  return { firstName, lastName, fullName, getCountries, getCountryInfo };
};
