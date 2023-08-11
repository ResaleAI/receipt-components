/**
 * Duplicates an object
 * @param obj The object to duplicate
 * @returns A copy of the object
 */
export function duplicateObject<TObject>(obj: TObject): TObject {
  if (obj === null || obj == undefined)
    throw new Error("Can't duplicate null or undefined");
  return JSON.parse(JSON.stringify(obj));
}
