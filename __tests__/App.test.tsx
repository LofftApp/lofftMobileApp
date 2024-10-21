/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {createMockStore, defaultMockState} from '../__mocks__/reduxMock';

// Mock lofftApi and injectEndpoints
jest.mock('../src/features/api/lofftApi', () => ({
  lofftApi: {
    injectEndpoints: jest.fn(() => ({
      useGetApplicationsQuery: jest.fn(),
      useGetAdvertByIdQuery: jest.fn(),
    })),
  },
}));

// Mock RTK Query hooks from userApi
jest.mock('../src/features/user/userApi', () => ({
  useGetUserQuery: jest.fn(() => ({
    data: {user: {userType: 'tenant', admin: false}},
    isLoading: false,
    isError: false,
    error: null,
  })),
}));

// Mock RTK Query hooks from authApi
jest.mock('../src/features/auth/authApi', () => ({
  useSignInMutation: jest.fn(() => [jest.fn(), {isLoading: false}]),
  useSignOutMutation: jest.fn(() => [jest.fn(), {isLoading: false}]),
}));

// Mock the useAuth hook
jest.mock('../src/features/auth/authSlice', () => ({
  useAuth: jest.fn(),
}));

// Create mock store
const store = createMockStore(defaultMockState);

describe('App Component', () => {
  test('renders correctly when authenticated', () => {
    const mockAuth = require('../src/features/auth/authSlice').useAuth;
    mockAuth.mockReturnValue({isAuthenticated: true});

    const {toJSON} = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('renders correctly when not authenticated', () => {
    const mockAuth = require('../src/features/auth/authSlice').useAuth;
    mockAuth.mockReturnValue({isAuthenticated: false});

    const {toJSON} = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
