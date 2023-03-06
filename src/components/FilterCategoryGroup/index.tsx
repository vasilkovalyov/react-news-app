import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import {
  FilterCategoriesProps,
  FilterCategoryWithCountType,
} from './FilterCategoryGroup.type';

import { useFilterCategoryGroup } from './useFilterCategoryGroup';

function FilterCategoryGroup({
  categories,
  categoryName,
  isOpen = true,
  selectedCategories,
  onChangeAdd,
  onChangeRemove,
}: FilterCategoriesProps) {
  const [show, setShow] = useState<boolean>(isOpen);
  const [selected, setSelected, selectedAdd, selectedRemove] =
    useFilterCategoryGroup(categoryName, selectedCategories);

  useEffect(() => {
    setSelected(selectedCategories || {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories]);

  function onHandleCategory(category: FilterCategoryWithCountType) {
    if (!selected[category.title]) {
      onChangeAdd && onChangeAdd(selectedAdd(category));
      return;
    }
    onChangeRemove && onChangeRemove(selectedRemove(category));
  }

  return (
    <div className="filter">
      <button className="filter__title" onClick={() => setShow(!show)}>
        <span className="filter__title-text">{categoryName}</span>
        {Object.keys(selected).length ? (
          <span className="filter__title-count" style={{ margin: '0 4px' }}>
            ({Object.keys(selected).length})
          </span>
        ) : null}
        <span className="filter__title-icon">
          {show ? (
            <svg
              viewBox="0 0 8 2"
              fill="black"
              preserveAspectRatio="xMidYMax meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0.5H8V1.5H0V0.5Z"
                fill="inherit"
              ></path>
            </svg>
          ) : (
            <svg
              viewBox="0 0 10 10"
              fill="black"
              preserveAspectRatio="xMidYMax meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.75 4.25V0H4.25V4.25H0V5.75H4.25V10H5.75V5.75H10V4.25H5.75Z"
                fill="inherit"
              ></path>
            </svg>
          )}
        </span>
      </button>
      {categories && categories.length ? (
        <div
          className="filter-options"
          style={{ display: show ? 'block' : 'none' }}
        >
          {categories.map((category) => (
            <button
              className={cn('filter-option', {
                active: selected[category.title],
              })}
              key={category._id}
              onClick={() => onHandleCategory(category)}
            >
              <span className="filter-option__title">
                {category.title}
                {category.count ? (
                  <b style={{ margin: '0 4px' }}>({category.count})</b>
                ) : null}
              </span>
              <span className="filter-option__icon">
                <svg
                  viewBox="0 0 8 9"
                  fill="inherit"
                  preserveAspectRatio="xMidYMax meet"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 1.2L7.3 0.5L4 3.8L0.7 0.5L0 1.2L3.3 4.5L0 7.8L0.7 8.5L4 5.2L7.3 8.5L8 7.8L4.7 4.5L8 1.2Z"
                    fill="inherit"
                  ></path>
                </svg>
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default FilterCategoryGroup;
