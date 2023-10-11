// Importing data arrays from external files
import { names } from './names';
import { surnames } from './surnames';

// Function to get a random item from an array
const getRandomItem = (array: string[]): string => {
  return array[Math.floor(Math.random() * array.length)];
};

// Function to format ISO code to lowercase
const formatIsoCode = (isoCode: string) => {
  return isoCode.toLowerCase();
}

// Function to get a random name based on ISO code and gender
const getRandomName = (isoCode: string, gender: Gender): string => {
  isoCode = formatIsoCode(isoCode);
  if (!names[isoCode] || !names[isoCode][gender]) {
    throw new Error(`No data available for the ISO code: ${isoCode} and gender: ${gender}`);
  }
  return getRandomItem(names[isoCode][gender]);
};

// Function to get a random surname based on ISO code
const getRandomSurname = (isoCode: string): string => {
  isoCode = formatIsoCode(isoCode);
  if (!surnames[isoCode]) {
    throw new Error(`No data available for the ISO code: ${isoCode}`);
  }
  return getRandomItem(surnames[isoCode]);
};

// Function to generate one or more first names
const firstName = (isoCode: string, gender: Gender, n: number = 1): string => {
  const namesArray: string[] = [];
  for (let i = 0; i < n; i++) {
    namesArray.push(getRandomName(isoCode, gender));
  }
  return namesArray.join(' ');
};

// Function to generate one or more last names
const lastName = (isoCode: string, n: number = 1): string => {
  const surnamesArray: string[] = [];
  for (let i = 0; i < n; i++) {
    surnamesArray.push(getRandomSurname(isoCode));
  }
  return surnamesArray.join(' ');
};

// Function to generate a full name with specified number of first and last names
const fullName = (isoCode: string, gender: Gender, firstN: number= 1, lastN: number = 1, space: string = ' '): string => {
  return `${firstName(isoCode, gender, firstN)}${space}${lastName(isoCode, lastN)}`;
};

// Exporting the functions for use in other files
export {
  firstName,
  lastName,
  fullName
};
