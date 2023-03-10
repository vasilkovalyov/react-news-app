import { FilterCategoryType } from "./FilterCategoryGroup.type";

export function objectToArray(
  obj: { [key: string]: string },
  category: string
): FilterCategoryType[] | [] {
  if (!Object.keys(obj).length) return [];

  const array: FilterCategoryType[] = [];
  for (const key in obj) {
    const item = {
      _id: obj[key],
      title: key,
      category: category,
    };
    array.push(item);
  }

  return array;
}