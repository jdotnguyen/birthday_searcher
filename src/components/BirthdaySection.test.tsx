import React from 'react';
import { render, screen } from '@testing-library/react';
import BirthdaySection from './BirthdaySection';
import { StateProvider } from '../store/Store';

test('Renders with date string prop rendering', () => {
  render(
    <StateProvider><BirthdaySection date="February 25" loading={false} /></StateProvider>
    );
  const headerText = screen.getByText(/Birthdays on February 25/i);
  expect(headerText).toBeInTheDocument();
});