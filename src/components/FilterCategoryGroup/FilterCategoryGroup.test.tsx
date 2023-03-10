import { DynamicObjectType } from '../../utils/types';
import { objectToArray } from './utils';

test('object with categories convert to array', () => {
  const objectCategories: DynamicObjectType = {
    Rum: '8f370a189b48e145ae65cf6d',
    'Scotch Whisky': '66797e6d813e9d4c8f85cf79',
  };
  const expectedResult = [
    {
      _id: '66797e6d813e9d4c8f85cf79',
      title: 'Scotch Whisky',
      category: 'drinks',
    },
    {
      _id: '8f370a189b48e145ae65cf6d',
      title: 'Rum',
      category: 'drinks',
    },
  ];

  expect(objectToArray(objectCategories, 'drinks')).toEqual(
    expect.arrayContaining(expectedResult)
  );
});
