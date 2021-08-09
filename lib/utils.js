export const isNull = (value) => value === null || value === undefined;
export const isNotNull = (value) => !isNull(value);
export const isString = (value) => typeof value === "string";
