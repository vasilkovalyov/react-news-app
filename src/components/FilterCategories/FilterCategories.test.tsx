import { FilterCategoryType } from '../FilterCategoryGroup/FilterCategoryGroup.type';
import { convertCategoryObjects } from './utils';

describe('filter categories tests', () => {
  test('convert fiilter categories to object if categories empty', () => {
    expect(convertCategoryObjects([])).toMatchObject({});
  });

  test('convert fiilter categories to object if categories not empty', () => {
    const categories: FilterCategoryType[] = [
      {
        _id: 'd9a159622d007348855bcd8e',
        title: 'Africa',
        category: 'regions',
      },
      {
        _id: 'a265c5ed2cc9f64cbc289d25',
        title: 'Our brands',
        category: 'topics',
      },
      {
        _id: '66797e6d813e9d4c8f85cf79',
        title: 'Scotch Whisky',
        category: 'Drinks',
      },
    ];
    const categoriesExpectedResult = {
      Africa: 'd9a159622d007348855bcd8e',
      'Our brands': 'a265c5ed2cc9f64cbc289d25',
      'Scotch Whisky': '66797e6d813e9d4c8f85cf79',
    };

    expect(convertCategoryObjects(categories)).toMatchObject(
      categoriesExpectedResult
    );
  });
});
