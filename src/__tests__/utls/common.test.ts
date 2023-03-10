import {
  FilterCategoryWithCountType,
  FilterCategoryType,
  FilterCategory,
} from '../../components/FilterCategoryGroup/FilterCategoryGroup.type';
import { NewsCardProps } from '../../components/NewsCard/NewsCard.type';
import {
  getUniqCategoriesWithCount,
  getCategoriesWithCounters,
  getParamsFromUrl,
  setUrlParams,
  getFilterCategoriesFromParsedUrlParams,
} from '../../utils/common';

describe('filter categories tests', () => {
  const categoriesIds: {
    regions: string;
    topics: string;
    drinks: string;
  } = {
    regions: '7f29687ae0aaa141b26c2424',
    topics: 'cf8eec3db2b7ad4e8faf783b',
    drinks: 'f0ceba0eaf460647a97e76eb',
  };

  test('getUniqCategoriesWithCount method has posts and categoriesIds', () => {
    const posts: NewsCardProps[] | [] = [
      {
        _id: '3f603b407364c2469cdba2d2',
        articleDate: '2023-02-16T00:00:00Z',
        title: 'Diageo commences new share buy-back programme',
        categoryPages: null,
        pageListingImage: null,
      },
      {
        _id: '6e9ee3924ce51a4bb321cbff',
        articleDate: '2022-10-20T07:00:00Z',
        title:
          'Diageo launches and prices three-tranche $2.0 billion fixed rate USD denominated bonds',
        categoryPages: [
          {
            _id: '7c9e93fdb663c848b0deb486',
            parent: {
              _id: 'cf8eec3db2b7ad4e8faf783b',
            },
            title: 'Investors',
            urlSegment: 'investors',
          },
          {
            _id: 'f54e329900efd54aa9428083',
            parent: {
              _id: '881b7ddef60c1c4997417a08',
            },
            title: 'Performance',
            urlSegment: 'performance',
          },
          {
            _id: '998216eff09eb2468e332dd6',
            parent: {
              _id: '881b7ddef60c1c4997417a08',
            },
            title: 'Financial results',
            urlSegment: 'financial-results',
          },
        ],
        pageListingImage: null,
      },
      {
        _id: '8199f0871a431b4a87425d5e',
        articleDate: '2022-09-27T00:00:00Z',
        title:
          'Diageo launches new GB university student responsible drinking campaign',
        categoryPages: [
          {
            _id: '9430a0547efcf64e927bb7b7',
            parent: {
              _id: '7f29687ae0aaa141b26c2424',
            },
            title: 'Europe and Turkey',
            urlSegment: 'europe-and-turkey',
          },
          {
            _id: 'a0d1a0cb9883a1489387374d',
            parent: {
              _id: '46a72d64509c4c4e8ed00ef4',
            },
            title: 'Great Britain',
            urlSegment: 'great-britain',
          },
          {
            _id: '75094c68d0d53849a9987c2d',
            parent: {
              _id: 'cf8eec3db2b7ad4e8faf783b',
            },
            title: 'Society 2030',
            urlSegment: 'society-2030',
          },
        ],
        pageListingImage: {
          _id: 'ff5dc0c5734bae40ad55578c',
          url: 'https://media.diageo.com/500x400/filters:quality(85)/diageo-corporate-media/media/5fonbrlt/responsible-drinking-campaign.png',
        },
      },
    ];

    const responseUniqCategories: {
      [key: string]: FilterCategoryWithCountType[] | [];
    } = {
      drinks: [],
      regions: [
        {
          _id: '9430a0547efcf64e927bb7b7',
          title: 'Europe and Turkey',
          count: 1,
        },
      ],
      topics: [
        {
          count: 1,
          title: 'Investors',
          _id: '7c9e93fdb663c848b0deb486',
        },
        {
          count: 1,
          title: 'Society 2030',
          _id: '75094c68d0d53849a9987c2d',
        },
      ],
      years: [
        {
          count: 1,
          title: '2023',
          _id: '2023',
        },
        {
          count: 2,
          title: '2022',
          _id: '2022',
        },
      ],
    };
    expect(getUniqCategoriesWithCount(posts, categoriesIds)).toEqual(
      responseUniqCategories
    );
  });

  test('getUniqCategoriesWithCount method hasn`t posts and has categoriesIds', () => {
    expect(getUniqCategoriesWithCount([], categoriesIds)).toEqual({
      years: [],
      regions: [],
      topics: [],
      drinks: [],
    });
  });

  test('getCategoriesWithCounters method has obj categoies', () => {
    const categoriesObjWithCounters: {
      [key: string]: {
        _id: string;
        count: number;
      };
    } = {
      '2022': {
        _id: '2022',
        count: 4,
      },
      '2021': {
        _id: '2021',
        count: 14,
      },
      '2020': {
        _id: '2020',
        count: 19,
      },
    };
    const categoriesWithCounters: FilterCategoryWithCountType[] = [
      {
        _id: '2022',
        title: '2022',
        count: 4,
      },
      {
        _id: '2021',
        title: '2021',
        count: 14,
      },
      {
        _id: '2020',
        title: '2020',
        count: 19,
      },
    ];
    expect(getCategoriesWithCounters(categoriesObjWithCounters)).toEqual(
      expect.arrayContaining(categoriesWithCounters)
    );
  });
  test('getCategoriesWithCounters method has empty obj categoies', () => {
    expect(getCategoriesWithCounters({})).toEqual(expect.arrayContaining([]));
  });

  test('getParamsFromUrl if url is not empty', () => {
    const urlParamsUrl: string =
      'regions=Africa&topics=Society+2030%3CFinancial+results';
    const responseUrlParams: { [key: string]: string[] } = {
      regions: ['Africa'],
      topics: ['Society 2030', 'Financial results'],
    };
    expect(getParamsFromUrl(urlParamsUrl)).toEqual(responseUrlParams);
  });
  test('getParamsFromUrl if url is empty', () => {
    const urlParamsUrl: string = '';
    const responseUrlParams: { [key: string]: string[] } = {};
    expect(getParamsFromUrl(urlParamsUrl)).toEqual(responseUrlParams);
  });

  test('setUrlParams', () => {
    const params: { [key: string]: string[] } = {
      years: ['2020', '2022'],
      topics: ['Society 2030', 'Financial results'],
    };
    const responseStr =
      'years=2020%3C2022&topics=Society+2030%3CFinancial+results';

    expect(setUrlParams(params)).toBe(responseStr);
  });

  const categoriesWithCategories: FilterCategory[] | [] = [
    {
      isOpen: true,
      categoryName: 'topics',
      categories: [
        {
          _id: '64a2e876c0719d44974bf0b2',
          title: 'Financial results',
          count: 30,
        },
        { _id: '7c9e93fdb663c848b0deb486', title: 'Investors', count: 58 },
        { _id: '75094c68d0d53849a9987c2d', title: 'Society 2030', count: 28 },
        { _id: 'a265c5ed2cc9f64cbc289d25', title: 'Our brands', count: 10 },
        { _id: '70933e601f1cc14ebe300e14', title: 'Our business', count: 6 },
      ],
    },
    {
      isOpen: true,
      categoryName: 'regions',
      categories: [
        { _id: 'd9a159622d007348855bcd8e', title: 'Africa', count: 4 },
        {
          _id: '18047b7a276d70429eb76ece',
          title: 'North America',
          count: 21,
        },
        { _id: 'd6c2fc812929a149b1d47b03', title: 'Asia Pacific', count: 9 },
        {
          _id: '9430a0547efcf64e927bb7b7',
          title: 'Europe and Turkey',
          count: 10,
        },
        {
          _id: '183a2b09d2f6ba4aae73c680',
          title: 'Latin America and Caribbean',
          count: 3,
        },
      ],
    },
  ];

  test('getFilterCategoriesFromParsedUrlParams method with params', () => {
    const paramsWithCategories: { [key: string]: string[] } = {
      regions: ['Africa'],
      topics: ['Society 2030', 'Financial results'],
    };
    const responseWithCategories: FilterCategoryType[] | [] = [
      { _id: 'd9a159622d007348855bcd8e', title: 'Africa', category: 'regions' },
      {
        _id: '75094c68d0d53849a9987c2d',
        title: 'Society 2030',
        category: 'topics',
      },
      {
        _id: '64a2e876c0719d44974bf0b2',
        title: 'Financial results',
        category: 'topics',
      },
    ];
    expect(
      getFilterCategoriesFromParsedUrlParams(
        categoriesWithCategories,
        paramsWithCategories
      )
    ).toEqual(expect.arrayContaining(responseWithCategories));
  });
  test('getFilterCategoriesFromParsedUrlParams method without params', () => {
    expect(
      getFilterCategoriesFromParsedUrlParams(categoriesWithCategories, {})
    ).toEqual(expect.arrayContaining([]));
  });
});
