import React from 'react';
import {screen} from '@testing-library/react-native';
import {renderWithProviders} from 'helpers/testUtils';
import SignInScreen from 'screens/auth/SignInScreen';

describe('SignInScreen', () => {
  test('renders correctly', () => {
    renderWithProviders(<SignInScreen />, {navigation: true});
    expect(screen.getByTestId('sign-in')).toBeTruthy();
  });
});
