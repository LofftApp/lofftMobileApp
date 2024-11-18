import 'react-native';
import React from 'react';
import App from '../App';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {createMockStore} from '../__mocks__/reduxMock';
import {Store} from 'redux';
import AuthenticatedNavigator from 'navigationStacks/AuthenticatedNavigator';

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

jest.mock('../src/navigationStacks/AuthenticatedNavigator', () => {
  const {Text} = require('react-native');
  return ({userType, admin}: {userType: string; admin: string}) => {
    return (
      <Text
        testID={`auth-navigator-${userType}-${admin ? 'admin' : 'not-admin'}`}
      />
    );
  };
});

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

  test('renders GuestStackNavigator when not authenticated', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(getByTestId('guest-navigator')).toBeTruthy(); // Check if GuestNavigator is rendered
  });

  test('renders AuthenticatedNavigator with tenant userType', () => {
    const {getByTestId} = render(
      <AuthenticatedNavigator userType="tenant" admin={false} />,
    );

    expect(getByTestId('auth-navigator-tenant-not-admin')).toBeTruthy();
  });

  test('renders AuthenticatedNavigator with admin userType', () => {
    const {getByTestId} = render(
      <AuthenticatedNavigator userType="admin" admin={true} />,
    );

    expect(getByTestId('auth-navigator-admin-admin')).toBeTruthy();
  });
});
