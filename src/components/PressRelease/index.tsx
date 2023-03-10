import React, { useEffect, useState, useMemo } from 'react';
import { useNewsContext } from '../../context/news-context';

import SearchBlock from '../SearchBlock';
import FilterCategories from '../FilterCategories';
import {
  FilterCategory,
  FilterCategoryType,
} from '../FilterCategoryGroup/FilterCategoryGroup.type';
import NewsCard from '../NewsCard';
import FilterTags from '../FilterTags';
import { NewsCardProps } from '../NewsCard/NewsCard.type';
import {
  getUniqCategoriesWithCount,
  setUrlParams,
  replaceUrlState,
  getParamsFromUrl,
  getFilterCategoriesFromParsedUrlParams,
} from '../../utils/common';

import PaginationWithData from '../PaginationWithData';

import dataNews from '../../data/news.json';

const regionsId = '7f29687ae0aaa141b26c2424';
const topicsId = 'cf8eec3db2b7ad4e8faf783b';
const drinksId = 'f0ceba0eaf460647a97e76eb';

const getFilteredNewsByTitle = (
  posts: NewsCardProps[],
  value: string | null
): NewsCardProps[] | [] => {
  if (!value) return [];
  return posts.filter((post) =>
    post.title.toLowerCase().includes(value.toLowerCase())
  );
};

function categoriesToObject(categories: FilterCategoryType[]): {
  [key: string]: [string];
} {
  const objCategories: { [key: string]: [string] } = {};
  for (const category of categories) {
    if (
      objCategories[category.category] &&
      objCategories[category.category].length
    ) {
      objCategories[category.category].push(category.title);
    } else {
      objCategories[category.category] = [category.title];
    }
  }
  return objCategories;
}

function PressRelease() {
  const { searchValue } = useNewsContext();
  const defaultNews = dataNews.data.contents;
  const [news, setNews] = useState<NewsCardProps[] | []>(defaultNews);
  const [tags, setTags] = useState<FilterCategoryType[] | []>([]);

  const filterCategories = useMemo(() => {
    const categories = getUniqCategoriesWithCount(news, {
      regions: regionsId,
      topics: topicsId,
      drinks: drinksId,
    });
    return Object.keys(categories).map<FilterCategory>(
      (categoryName: string) => {
        return {
          isOpen: true,
          categoryName: categoryName,
          categories: categories[categoryName],
        };
      }
    );
  }, [news]);

  function onHandleChangeFilterTags(categoryId: string) {
    const updatedTags = tags.filter((tag) => tag._id !== categoryId);
    setTags(updatedTags);
    const urlWithParams = setUrlParams(categoriesToObject(updatedTags));
    replaceUrlState(urlWithParams);
  }

  function onSelectCategories(categories: FilterCategoryType[]) {
    setTags(categories);

    const urlWithParams = setUrlParams(categoriesToObject(categories));
    replaceUrlState(urlWithParams);
  }

  function getParamsFromUrlAndSetToFilters() {
    if (typeof window !== 'undefined') {
      const urlParams = getParamsFromUrl(window.location.search);
      const categories = getFilterCategoriesFromParsedUrlParams(
        filterCategories,
        urlParams
      );
      setTags(categories);
    }
  }

  useEffect(() => {
    getParamsFromUrlAndSetToFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchValue !== '') {
      setNews(getFilteredNewsByTitle(defaultNews, searchValue));
    } else {
      setNews(dataNews.data.contents);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <div className="page-press-release">
      <SearchBlock />
      <div className="page-press-release__container">
        <div className="page-press-release__grid">
          <FilterCategories
            categories={filterCategories}
            selectedCategories={tags}
            onSelectCategories={onSelectCategories}
          />
          <div className="page-press-release__content">
            {searchValue ? <h3>{searchValue}</h3> : null}
            <FilterTags tags={tags} handleChange={onHandleChangeFilterTags} />
            <PaginationWithData
              data={news}
              Component={NewsCard}
              showStatistics={true}
              paginationOptions={{ pageSize: 5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PressRelease;
