/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import {createMockStore, defaultMockState} from '../__mocks__/reduxMock';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';

// Mock RTK Query hooks from authApi
jest.mock('../src/features/auth/authApi', () => ({
  useSignInMutation: jest.fn(() => [jest.fn(), {isLoading: false}]),
  useSignOutMutation: jest.fn(() => [jest.fn(), {isLoading: false}]),
}));

jest.mock('../src/features/auth/authSlice', () => ({
  useAuth: jest.fn(() => ({
    isAuthenticated: true,
  })),
}));

// Create mock store
const store = createMockStore(defaultMockState);

test('renders correctly when authenticated', () => {
  const {toJSON} = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(toJSON()).toMatchSnapshot();
});

// Example: Add test for the unauthenticated state
test('renders correctly when not authenticated', () => {
  // Mock the authentication hook to return `false`
  const mockAuth = require('../src/features/auth/authSlice').useAuth;
  mockAuth.mockReturnValue({isAuthenticated: false});

  const {toJSON} = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(toJSON()).toMatchSnapshot();
});
