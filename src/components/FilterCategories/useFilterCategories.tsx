import { useState, useEffect } from 'react';
import { FilterCategoryType } from '../FilterCategoryGroup/FilterCategoryGroup.type';

export function useFilterCategories(
  selectedCategories: FilterCategoryType[] | []
): [
  (categories: FilterCategoryType[]) => FilterCategoryType[],
  (clickedCategory: FilterCategoryType) => FilterCategoryType[]
] {
  const [selectedCategoriesMap, setSelectedCategoriesMap] = useState<
    FilterCategoryType[] | []
  >([]);

  useEffect(() => {
    setSelectedCategoriesMap(selectedCategories || []);
  }, [selectedCategories]);

  function handleChangeFilterAdd(
    categories: FilterCategoryType[]
  ): FilterCategoryType[] {
    let updatedCategories: FilterCategoryType[] = [];
    updatedCategories = Array.from([
      ...new Map(
        [...selectedCategoriesMap, ...categories].map((item) => [
          item.title,
          item,
        ])
      ).values(),
    ]);

    setSelectedCategoriesMap(updatedCategories);
    return updatedCategories;
  }

  function handleChangeFilterRemove(
    clickedCategory: FilterCategoryType
  ): FilterCategoryType[] {
    let updatedCategories: FilterCategoryType[] = [];
    updatedCategories = selectedCategoriesMap.filter(
      (category) => category.title !== clickedCategory.title
    );

    setSelectedCategoriesMap(updatedCategories);
    return updatedCategories;
  }

  return [handleChangeFilterAdd, handleChangeFilterRemove];
}
