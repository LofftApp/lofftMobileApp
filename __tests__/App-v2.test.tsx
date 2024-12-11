import React from 'react';
import App from '../App';
import {renderWithProviders} from 'helpers/testUtils';
import {screen} from '@testing-library/react-native';
import {useAuth} from 'reduxFeatures/auth/useAuth';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

test('renders App with unauthenticated state', () => {
  (useAuth as jest.Mock).mockReturnValue({isAuth: false});

  renderWithProviders(<App />);
  expect(screen.getByTestId('guest-navigator')).toBeTruthy();
});

test('renders App with authenticated state', () => {
  (useAuth as jest.Mock).mockReturnValue({isAuth: true});

  renderWithProviders(<App />);
  expect(screen.getByTestId('authenticated-navigator')).toBeTruthy();
});

test('renders App with authenticated state but userType is undefined', () => {
  (useAuth as jest.Mock).mockReturnValue({isAuth: true});
  (useGetUserQuery as jest.Mock).mockReturnValue({
    data: {userType: undefined},
  });

  renderWithProviders(<App />);
  expect(screen.getByTestId('userType-not-found')).toBeTruthy();
});
