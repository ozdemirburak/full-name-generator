export const LITE_SIZE = 15;
export type DatasetKind = 'names' | 'surnames';
type GenderData = { 0: string[]; 1: string[] };
export type Dataset = string[] | GenderData;

function validateArray(value: unknown, label: string): asserts value is string[] {
  if (!Array.isArray(value) || value.length < LITE_SIZE) {
    throw new Error(`${label} must contain at least ${LITE_SIZE} entries.`);
  }
  const seen = new Set<string>();
  for (const item of value) {
    if (typeof item !== 'string' || item.length === 0 || item !== item.trim()) {
      throw new Error(`${label} must contain nonempty, trimmed strings.`);
    }
    if (item !== item.normalize('NFC')) {
      throw new Error(`${label} contains a name that is not NFC-normalized: ${JSON.stringify(item)}.`);
    }
    if (seen.has(item)) {
      throw new Error(`${label} contains a duplicate name: ${JSON.stringify(item)}.`);
    }
    seen.add(item);
  }
}

export function validateData(value: unknown, kind: DatasetKind, country: string): asserts value is Dataset {
  const label = `${kind}/${country}`;
  if (kind === 'surnames' && Array.isArray(value)) {
    validateArray(value, label);
    return;
  }
  if (value === null || typeof value !== 'object' || Array.isArray(value)
    || Object.keys(value).sort().join(',') !== '0,1') {
    throw new Error(`${label} must have exactly the gender keys 0 and 1.`);
  }
  const genderData = value as Record<string, unknown>;
  validateArray(genderData[0], `${label}/0`);
  validateArray(genderData[1], `${label}/1`);
}

export function validateRegistry(
  value: unknown,
  kind: DatasetKind,
  datasets: Readonly<Record<string, unknown>>
): asserts value is Record<string, Dataset> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${kind}.ts must export a country registry object named ${kind}.`);
  }
  const countries = Object.keys(datasets).sort();
  if (Object.keys(value).sort().join(',') !== countries.join(',')) {
    throw new Error(`${kind}.ts must register every country in ${kind}/ exactly once.`);
  }
  const registry = value as Record<string, unknown>;
  for (const country of countries) {
    if (registry[country] !== datasets[country]) {
      throw new Error(`${kind}.ts must register ${country} from ${kind}/${country}.ts.`);
    }
    validateData(registry[country], kind, country);
  }
}
