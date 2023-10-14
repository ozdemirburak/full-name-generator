type Names = Record<string, Record<number, string[]>>;
type Surnames = Record<string, string[] | Record<number, string[]>>;

enum Gender {
    Male = 0,
    Female = 1
}

interface FullNameGenerator {
    firstName: (isoCode: string, gender: Gender, n: number) => string;
    lastName: (isoCode: string) => string;
    fullName: (isoCode: string, gender: Gender) => string;
}
