import { useState } from 'react';
import { DynamicObjectType } from '../../utils/types';
import {
  FilterCategoryType,
  FilterCategoryWithCountType,
} from './FilterCategoryGroup.type';

function objectToArray(
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

export function useFilterCategoryGroup(
  categoryName: string,
  selectedCategories?: DynamicObjectType
): [
  DynamicObjectType,
  React.Dispatch<React.SetStateAction<DynamicObjectType>>,
  (category: FilterCategoryWithCountType) => FilterCategoryType[] | [],
  (category: FilterCategoryWithCountType) => FilterCategoryType
] {
  const [selected, setSelected] = useState<DynamicObjectType>(
    selectedCategories || {}
  );

  function selectedAdd(
    category: FilterCategoryWithCountType
  ): FilterCategoryType[] | [] {
    const state = {
      ...selected,
      [category.title]: category._id,
    };

    setSelected(state);
    return objectToArray(state, categoryName);
  }

  function selectedRemove(category: FilterCategoryWithCountType) {
    const selectedCategory: FilterCategoryType = {
      _id: category._id,
      title: category.title,
      category: categoryName,
    };

    const tempState = { ...selected };
    delete tempState[category.title];

    setSelected(tempState);
    return selectedCategory;
  }

  return [selected, setSelected, selectedAdd, selectedRemove];
}
