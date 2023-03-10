import { DynamicObjectType } from "../../utils/types";
import { FilterCategoryType } from "../FilterCategoryGroup/FilterCategoryGroup.type";

export function convertCategoryObjects(
  categories: FilterCategoryType[]
): DynamicObjectType {
  const categoriesMap: DynamicObjectType = {};
  for (const category of categories) {
    categoriesMap[category.title] = category._id;
  }
  return categoriesMap;
}