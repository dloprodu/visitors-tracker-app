import React from 'react';
import { Provider } from 'react-redux';
import 'jest-canvas-mock';

import { render, screen } from '@testing-library/react';

import store from 'app/store';

import DashboardPage from './DashboardPage';

const ReduxProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
)

test('renders dashboard page', async () => {
  render(<ReduxProvider> <DashboardPage /> </ReduxProvider>);

  const dataCard = await screen.findByTestId('guest-grid');
  expect(dataCard).toBeInTheDocument();
});

