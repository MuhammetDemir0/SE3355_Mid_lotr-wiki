import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => ({
  ...(() => {
    const ReactLocal = require('react');
    return {
  BrowserRouter: ({ children }) => <>{children}</>,
  Routes: ({ children }) => {
    const routeList = ReactLocal.Children.toArray(children);
    const firstRoute = routeList[0];
    return firstRoute?.props?.element ?? null;
  },
  Route: () => null,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useParams: () => ({ id: 'test-id' }),
    };
  })(),
}), { virtual: true });

test('renders LOTR Wiki application', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /lord of the rings wiki/i })).toBeInTheDocument();
});
