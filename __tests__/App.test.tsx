import 'react-native';
import React from 'react';
import App from '../App';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {createMockStore} from '../__mocks__/reduxMock';
import {Store} from 'redux';

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

// Mock the authSlice hook
jest.mock('../src/features/auth/authSlice', () => ({
  authSlice: jest.fn(),
}));

describe('App Component', () => {
  let store: Store;

  beforeEach(() => {
    store = createMockStore({
      auth: {isAuthenticated: false},
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly when authenticated', () => {
    const mockAuth = require('../src/features/auth/authSlice').authSlice;
    mockAuth.mockReturnValue({isAuthenticated: true});
    store = createMockStore({
      auth: {isAuthenticated: true},
    });

    const {toJSON} = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('renders correctly when not authenticated', () => {
    const mockAuth = require('../src/features/auth/authSlice').authSlice;
    mockAuth.mockReturnValue({isAuthenticated: false});

    const {toJSON} = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('useGetUserQuery is called with correct arguments when not authenticated', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    const useGetUserQuery =
      require('../src/features/user/userApi').useGetUserQuery;
    expect(useGetUserQuery).toHaveBeenCalledWith(undefined, {
      skip: true,
      refetchOnMountOrArgChange: true,
    });
  });

  test('useGetUserQuery is called when authenticated', () => {
    const mockAuth = require('../src/features/auth/authSlice').authSlice;
    mockAuth.mockReturnValue({isAuthenticated: true});
    store = createMockStore({
      auth: {isAuthenticated: true},
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    const useGetUserQuery =
      require('../src/features/user/userApi').useGetUserQuery;
    expect(useGetUserQuery).toHaveBeenCalledWith(undefined, {
      skip: false,
      refetchOnMountOrArgChange: true,
    });
  });

  test('useGetUserQuery is NOT called when not authenticated', () => {
    const mockAuth = require('../src/features/auth/authSlice').authSlice;
    mockAuth.mockReturnValue({isAuthenticated: false});

    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    const useGetUserQuery =
      require('../src/features/user/userApi').useGetUserQuery;
    expect(useGetUserQuery).toHaveBeenCalledWith(undefined, {
      skip: true,
      refetchOnMountOrArgChange: true,
    });
  });

  test('useSignOutMutation is called when user signs out', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    const useSignOutMutation =
      require('../src/features/auth/authApi').useSignOutMutation;
    expect(useSignOutMutation).toHaveBeenCalled();
  });
});
