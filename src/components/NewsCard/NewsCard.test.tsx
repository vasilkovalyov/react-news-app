import { render, screen } from '@testing-library/react';
import NewsCard from './index';

import { model } from './NewsCard.model';

test('render NewsCard', () => {
  render(<NewsCard {...model} />);
});

test('test example', () => {
  const a: number = 5;
  expect(a).toBe(5);
});
