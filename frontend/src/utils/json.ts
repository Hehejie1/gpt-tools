/**
 * JSON.parse
 */
export const parse = (str: string | string[], defaultValue?: any) => {
  if (typeof str !== "string") {
    return str || defaultValue;
  }
  try {
    return JSON.parse(str.replace(/\'/g, '"'));
  } catch (e) {
    return defaultValue || {};
  }
};

export const stringify = (val: Record<string, any>): string => {
  if (typeof val === "string") {
    return String(val);
  }
  try {
    return val === undefined || typeof val === "function"
      ? `${val}`
      : JSON.stringify(val);
  } catch (e) {
    return String(val);
  }
};
