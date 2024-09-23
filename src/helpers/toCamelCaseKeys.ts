const toCamelCase = (str: string): string => {
  return str.replace(/_([a-zA-Z0-9])/g, (match, letter) =>
    letter.toUpperCase(),
  );
};

const isObject = (obj: unknown): obj is Record<string, unknown> =>
  obj !== null && typeof obj === 'object' && !Array.isArray(obj);

export const toCamelCaseKeys = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map(item => toCamelCaseKeys(item)) as unknown as T; // Recursively apply for arrays
  } else if (isObject(obj)) {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = toCamelCase(key); // Convert key to camelCase
      const value = obj[key];

      // Special case for photos: map URLs if the key is photos
      if (key === 'photos' && Array.isArray(value)) {
        acc[camelKey as keyof typeof acc] = value.map(photo => photo.url);
      } else {
        acc[camelKey as keyof typeof acc] = toCamelCaseKeys(value); // Recursively apply for nested objects
      }

      return acc;
    }, {} as Record<string, unknown>) as T;
  }
  return obj;
};
