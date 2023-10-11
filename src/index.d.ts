type Names = Record<string, Record<number, string[]>>;
type Surnames = Record<string, string[]>;

enum Gender {
    Male = 0,
    Female = 1,
    Unisex = 2
}

interface FullNameGenerator {
    firstName: (isoCode: string, gender: Gender, n: number) => string;
    lastName: (isoCode: string) => string;
    fullName: (isoCode: string, gender: Gender) => string;
}
