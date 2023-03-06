import React, { useState } from 'react';

import PressRelease from '../components/PressRelease';

import { NewsProvider } from '../context/news-context';
import { FilterCategoryType } from '../components/FilterCategoryGroup/FilterCategoryGroup.type';

const News = () => {
  const [yearFilters, setYearFilters] = useState<FilterCategoryType[] | []>([]);
  const [regionFilters, setRegionFilters] = useState<FilterCategoryType[] | []>(
    []
  );
  const [topicFilters, setTopicFilters] = useState<FilterCategoryType[] | []>(
    []
  );
  const [drinkFilters, setDrinkFilters] = useState<FilterCategoryType[] | []>(
    []
  );
  const [searchValue, setSearchValue] = useState<string>('');

  const state = {
    yearFilters,
    regionFilters,
    topicFilters,
    drinkFilters,
    searchValue,
    setYearFilters,
    setRegionFilters,
    setTopicFilters,
    setDrinkFilters,
    setSearchValue,
  };

  return (
    <NewsProvider {...state}>
      <PressRelease />
    </NewsProvider>
  );
};

export default News;
