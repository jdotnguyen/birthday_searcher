import React from 'react';
import { render, screen } from '@testing-library/react';
import FavouritesSection from './FavouritesSection';

test('Renders with Favourite Birthdays header', () => {
  render(<FavouritesSection favourites={[]} />);
  const headerText = screen.getByText(/Favourite Birthdays/i);
  expect(headerText).toBeInTheDocument();
});