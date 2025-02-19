const toCamelCase = (str: string): string => {
  return str.replace(/_([a-zA-Z0-9])/g, (match, letter) =>
    letter.toUpperCase(),
  );
};

const isObject = (obj: unknown): obj is Record<string, unknown> =>
  obj !== null && typeof obj === 'object' && !Array.isArray(obj);

export const toCamelCaseKeys = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map(item => toCamelCaseKeys(item)) as unknown as T;
  } else if (isObject(obj)) {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = toCamelCase(key);
      const value = obj[key];
      acc[camelKey as keyof typeof acc] = toCamelCaseKeys(value);

      return acc;
    }, {} as Record<string, unknown>) as T;
  }
  return obj;
};
