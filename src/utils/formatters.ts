/**
 * Formats a number with thousand separators.
 * @param num - The number to format.
 * @returns Formatted string.
 */
export const formatNumber = (num: number): string => {
  return num?.toLocaleString('en-US') || "0";
};

/**
 * Parses a string with thousand separators back to a number.
 * @param str - The string to parse.
 * @returns Parsed number.
 */
export const parseNumber = (str: string): number => {
  const cleaned = str.replace(/,/g, "");
  return parseInt(cleaned, 10) || 0;
};

/**
 * Persists value to localStorage.
 */
export const saveToLocal = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error saving to local storage", e);
  }
};

/**
 * Loads value from localStorage.
 */
export const loadFromLocal = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};
