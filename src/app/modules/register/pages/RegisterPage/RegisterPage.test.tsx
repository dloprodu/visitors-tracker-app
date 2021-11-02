import React from 'react';
import { Provider } from 'react-redux';

import { render, screen } from '@testing-library/react';

import store from 'app/store';

import RegisterPage from './RegisterPage';

const ReduxProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
)

test('renders register page', async () => {
  render(<ReduxProvider> <RegisterPage /> </ReduxProvider>);

  const dataCard = await screen.findByTestId('guest-data');
  expect(dataCard).toBeInTheDocument();
});

