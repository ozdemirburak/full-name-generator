/** A dataset is read-only to the generator; imports own its contents. */
export type NameList = readonly string[];

/** Source categories use exactly the two gender keys supported by the API. */
export type GenderedNames = Readonly<Record<0 | 1, NameList>>;

export type SurnameData = NameList | GenderedNames;
export type Names = Readonly<Record<string, GenderedNames>>;
export type Surnames = Readonly<Record<string, SurnameData>>;

export const isSharedSurnameList = (value: SurnameData): value is NameList => Array.isArray(value);
