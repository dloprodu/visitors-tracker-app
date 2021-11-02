import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app bar', () => {
  render(<App />);

  const mainHeaderElement = screen.getByTestId('main-header');
  expect(mainHeaderElement).toBeInTheDocument();
});

