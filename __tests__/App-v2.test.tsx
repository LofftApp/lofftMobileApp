import React from 'react';
import App from '../App';
import {renderWithProviders} from 'helpers/testUtils';

jest.mock('../src/features/api/lofftApi', () => ({
  lofftApi: {
    reducerPath: 'lofftApi',
    reducer: jest.fn((state = {queries: {}, mutations: {}}) => state), // Provide initial state
    middleware: jest.fn(() => (next: any) => (action: any) => next(action)),
    injectEndpoints: jest.fn(() => ({
      useGetSomeDataQuery: jest.fn(() => ({
        data: {key: 'mockedValue'},
        isLoading: false,
      })),
    })),
  },
}));

// Mock RTK Query hooks from userApi
jest.mock('../src/features/user/userApi', () => ({
  useGetUserQuery: jest.fn(() => ({})),
}));

jest.mock('../src/features/firebaseNotifications/fcmApi', () => ({
  useRegisterTokenMutation: jest.fn(() => [
    jest.fn(() => ({
      unwrap: jest.fn(() => Promise.resolve('Mocked response')),
    })),
    {isLoading: false, isError: false},
  ]),
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

jest.mock('../src/app/hooks', () => ({
  useAppSelector: jest.fn(selector => {
    if (selector.name === 'authSelector') {
      return {isAuthenticated: true, authMessage: 'Authenticated'};
    }
    return {};
  }),
  useAppDispatch: jest.fn(() => jest.fn()),
}));

test('renders App correctly with authenticated state', () => {
  const {getByText} = renderWithProviders(<App />);

  expect(getByText('Error loading user type. Please try again')).toBeTruthy();
});
