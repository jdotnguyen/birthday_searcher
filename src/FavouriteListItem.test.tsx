import React from 'react';
import { render, screen } from '@testing-library/react';
import FavouriteListItem from './FavouriteListItem';
import { demoFavouriteDate } from './tests/sampleData';

test('Renders a birthday header with 2 people under thate date', () => {
  const toggleFn = () => {};
  render(<FavouriteListItem date={demoFavouriteDate} />);
  const headerText = screen.getByText(/February 25/i);
  const personOne = screen.getByText(/Rocky 1/i);
  const personTwo = screen.getByText(/Rocky 2/i);
  expect(headerText).toBeInTheDocument();
  expect(personOne).toBeInTheDocument();
  expect(personTwo).toBeInTheDocument();
});
