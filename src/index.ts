import { names } from './names';
import { surnames } from './surnames';

const getRandomItem = (array: string[]): string => {
  return array[Math.floor(Math.random() * array.length)];
};

const formatIsoCode = (isoCode: string): string => {
  return isoCode.toLowerCase();
};

const checkDataAvailability = (data: any, isoCode: string, gender?: Gender) => {
  if (!data[isoCode] || (gender !== undefined && gender !== null && !data[isoCode][gender])) {
    throw new Error(`No data available for the ISO code: ${isoCode} and gender: ${gender}`);
  }
};

const getRandomName = (isoCode: string, gender: Gender): string => {
  isoCode = formatIsoCode(isoCode);
  checkDataAvailability(names, isoCode, gender);
  return getRandomItem(names[isoCode][gender]);
};

const getRandomSurname = (isoCode: string, gender?: Gender): string => {
  isoCode = formatIsoCode(isoCode);
  checkDataAvailability(surnames, isoCode, gender);
  const surnameData = surnames[isoCode];
  return getRandomItem(
      Array.isArray(surnameData) ? surnameData : surnameData[gender!]
  );
};

const generateMultiple = (generator: Function, isoCode: string, gender: Gender, n: number): string => {
  return Array.from({ length: n }, () => generator(isoCode, gender)).join(' ');
};

const firstName = (isoCode: string, gender: Gender, n: number = 1): string => {
  return generateMultiple(getRandomName, isoCode, gender, n);
};

const lastName = (isoCode: string, gender?: Gender, n: number = 1): string => {
  return generateMultiple(getRandomSurname, isoCode, gender, n);
};

const fullName = (isoCode: string, gender: Gender, firstN: number = 1, lastN: number = 1, space: string = ' '): string => {
  return `${firstName(isoCode, gender, firstN)}${space}${lastName(isoCode, gender, lastN)}`;
};

export {
  firstName,
  lastName,
  fullName
};
