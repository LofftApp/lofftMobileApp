import 'react-native';
import React from 'react';
import App from '../App';
import {render} from '@testing-library/react-native';

import {Store} from 'redux';
import {renderWithProviders} from './utils/testUtils';

// Mock lofftApi and injectEndpoints
jest.mock('../src/features/api/lofftApi', () => ({
  lofftApi: {},
}));

// Mock RTK Query hooks from userApi
jest.mock('../src/features/user/userApi', () => ({
  useGetUserQuery: jest.fn(() => ({})),
}));

// Mock RTK Query hooks from authApi
jest.mock('../src/features/auth/authApi', () => ({
  useSignOutMutation: jest.fn(() => [jest.fn(), {}]),
}));

// Mock the authSlice hook
jest.mock('../src/features/auth/authSlice', () => ({
  authSlice: jest.fn(),
}));

// Mock Navigators
jest.mock('../src/navigationStacks/GuestNavigator', () => {
  const {Text} = require('react-native');
  return () => <Text testID="guest-navigator" />;
});

jest.mock('../src/navigationStacks/AuthenticatedNavigator', () => {});

jest.mock('../src/components/LoadingAndNotFound/NotFoundComponent', () => {
  const {Text} = require('react-native');
  return ({message}: {message: string}) => (
    <Text testID="not-found-component">{message}</Text>
  );
});

describe('App Component', () => {


  // beforeEach(() => {
  //   store = createMockStore({
  //     auth: {isAuthenticated: false},
  //   });
  // });

  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  test('renders correctly when authenticated', () => {
    const {toJSON} = renderWithProviders(<App />);
    expect(toJSON()).toMatchSnapshot();
  });
});
