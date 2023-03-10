import { useState } from 'react';
import { DynamicObjectType } from '../../utils/types';
import {
  FilterCategoryType,
  FilterCategoryWithCountType,
} from './FilterCategoryGroup.type';

import { objectToArray } from './utils';

const objectCategories: DynamicObjectType = {
  Rum: '8f370a189b48e145ae65cf6d',
  'Scotch Whisky': '66797e6d813e9d4c8f85cf79',
};
const expectedResult = [
  {
    category: 'drinks',
    title: 'Rum',
    _id: '8f370a189b48e145ae65cf6d',
  },
  {
    category: 'drinks',
    title: 'Scotch Whisky',
    _id: '66797e6d813e9d4c8f85cf79',
  },
];
console.log(objectToArray(objectCategories, 'drinks') === expectedResult);

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
