import { names } from './names-lite';
import { surnames } from './surnames-lite';
import { createGenerators } from './generator';

export { Gender } from './generator';
export type { CountryInfo, NameOrder } from './generator';
export const { firstName, lastName, fullName, getCountries, getCountryInfo } = /* @__PURE__ */ createGenerators(names, surnames);
