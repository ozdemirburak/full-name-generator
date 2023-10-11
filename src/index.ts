import { names } from './names';
import { surnames } from './surnames';

const getRandomItem = (array: string[]): string => {
  return array[Math.floor(Math.random() * array.length)];
};

const formatIsoCode = (isoCode: string) => {
  return isoCode.toLowerCase();
}

const getRandomName = (isoCode: string, gender: Gender): string => {
  isoCode = formatIsoCode(isoCode);
  if (!names[isoCode] || !names[isoCode][gender]) {
    throw new Error(`No data available for the ISO code: ${isoCode} and gender: ${gender}`);
  }
  return getRandomItem(names[isoCode][gender]);
};

const getRandomSurname = (isoCode: string): string => {
  isoCode = formatIsoCode(isoCode);
  if (!surnames[isoCode]) {
    throw new Error(`No data available for the ISO code: ${isoCode}`);
  }
  return getRandomItem(surnames[isoCode]);
};

const firstName = (isoCode: string, gender: Gender, n: number = 1): string => {
  const namesArray: string[] = [];
  for (let i = 0; i < n; i++) {
    namesArray.push(getRandomName(isoCode, gender));
  }
  return namesArray.join(' ');
};

const lastName = (isoCode: string, n: number = 1): string => {
  const surnamesArray: string[] = [];
  for (let i = 0; i < n; i++) {
    surnamesArray.push(getRandomSurname(isoCode));
  }
  return surnamesArray.join(' ');
};

const fullName = (isoCode: string, gender: Gender, firstN: number= 1, lastN: number = 1, space: string = ' '): string => {
  return `${firstName(isoCode, gender, firstN)}${space}${lastName(isoCode, lastN)}`;
};

export {
  firstName,
  lastName,
  fullName
};
