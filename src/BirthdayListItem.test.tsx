import React from 'react';
import { render, screen } from '@testing-library/react';
import BirthdayListItem from './BirthdayListItem';
import { Person } from './types/Person';
import { demoPersonFavourite, demoPersonNotFavourite } from './tests/sampleData';

test('Renders birthday list item with person text property', () => {
  const toggleFn = () => {};
  render(<BirthdayListItem person={demoPersonNotFavourite} toggleFavouriteFn={toggleFn} />);
  const personText = screen.getByText(/Rocky, South Korean singer, dancer and songwriter 1/i);
  expect(personText).toBeInTheDocument();
});

test('Renders birthday list item with person text property', () => {
  const toggleFn = () => {};
  render(<BirthdayListItem person={demoPersonFavourite} toggleFavouriteFn={toggleFn} />);
  const personText = screen.getByText(/Rocky, South Korean singer, dancer and songwriter 2/i);
  expect(personText).toBeInTheDocument();
});

test('Renders a list item with a grey star (not favourited)', () => {
  const toggleFn = () => {};
  render(<BirthdayListItem person={demoPersonNotFavourite} toggleFavouriteFn={toggleFn} />);
  const favouriteStar = screen.getByTestId('favourite').getAttribute('style');
  expect(favouriteStar).toContain('color: rgb(205, 205, 205);');
});

test('Renders a list item with a blue star (favourited)', () => {
  const toggleFn = () => {};
  render(<BirthdayListItem person={demoPersonFavourite} toggleFavouriteFn={toggleFn} />);
  const favouriteStar = screen.getByTestId('favourite').getAttribute('style');
  expect(favouriteStar).toContain('color: rgb(0, 115, 198);');
});