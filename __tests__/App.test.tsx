/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {createMockStore, defaultMockState} from '../__mocks__/reduxMock';

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
    // Mock the useAuth hook to return `true` for authentication
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
    // Mock the useAuth hook to return `false` for unauthenticated state
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
