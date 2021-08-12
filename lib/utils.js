export const isNull = (value) => value === null || value === undefined;
export const isNotNull = (value) => !isNull(value);
export const isString = (value) => typeof value === "string";

/**
 * Show axios error
 * @param {axios result} result
 */
export function showError(result) {
  if (result?.error) {
    console.error(`Error:`, result.error);
  }
}
/**
 * Show data information
 * @param {data name} name
 * @param {info} data
 */
export function showData(name = null, data) {
  console.group(`Information: ${name}`);
  console.info(data);
  console.groupEnd();
}
