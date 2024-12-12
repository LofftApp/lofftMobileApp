import React from 'react';
import {screen} from '@testing-library/react-native';
import {renderWithProviders} from '../../__utils__/testUtils';
import SignUpScreen from 'screens/auth/SignUpScreen';

describe('SignUpScreen', () => {
  test('renders correctly', () => {
    renderWithProviders(<SignUpScreen />, {navigation: true});
    expect(screen.getByTestId('sign-up')).toBeTruthy();
  });
});
