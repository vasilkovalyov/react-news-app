import React from 'react';
import { FilterCategoriesProps } from './FilterCategories.type';

import FilterCategoryGroup from '../FilterCategoryGroup';
import { FilterCategoryType } from '../FilterCategoryGroup/FilterCategoryGroup.type';

import { DynamicObjectType } from '../../utils/types';
import { useFilterCategories } from './useFilterCategories';

export function convertCategoryObjects(
  categories: FilterCategoryType[]
): DynamicObjectType {
  const categoriesMap: DynamicObjectType = {};
  for (const category of categories) {
    categoriesMap[category.title] = category._id;
  }
  return categoriesMap;
}

function FilterCategories({
  categories,
  selectedCategories,
  onSelectCategories,
}: FilterCategoriesProps) {
  const [filterAdd, filterRemove] = useFilterCategories(
    selectedCategories || []
  );

  function handleChangeFilterAdd(categories: FilterCategoryType[]) {
    onSelectCategories(filterAdd(categories));
  }

  function handleChangeFilterRemove(clickedCategory: FilterCategoryType) {
    onSelectCategories(filterRemove(clickedCategory));
  }

  return (
    <div className="filters">
      <div className="filters__content">
        <div className="filters__title">
          Filter by:{' '}
          <button className="filters__button-reset">clear all</button>
        </div>
        {categories
          ? categories.map((category, index) => {
              const updatedCategories = selectedCategories
                ? convertCategoryObjects(
                    selectedCategories.filter(
                      (item) =>
                        item.category.toLowerCase() ===
                        category.categoryName.toLowerCase()
                    )
                  )
                : {};
              return (
                <div key={index} className="filter-groups">
                  <FilterCategoryGroup
                    categoryName={category.categoryName}
                    selectedCategories={updatedCategories}
                    categories={category.categories}
                    onChangeAdd={handleChangeFilterAdd}
                    onChangeRemove={handleChangeFilterRemove}
                  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default React.memo(FilterCategories);
