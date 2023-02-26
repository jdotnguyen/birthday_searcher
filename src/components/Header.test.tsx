import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('Renders with Birthday Searcher text', () => {
  render(<Header />);
  const headerText = screen.getByText(/Birthday Searcher/i);
  expect(headerText).toBeInTheDocument();
});