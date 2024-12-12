import React from 'react';
import App from '../App';
import { renderWithProviders } from '../__utils__/testUtils';
import {screen} from '@testing-library/react-native';
import {useAuth} from 'reduxFeatures/auth/useAuth';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

describe('App.tsx tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders App correctly when not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({isAuth: false});
    (useGetUserQuery as jest.Mock).mockReturnValue({
      data: {userType: undefined},
    });

    renderWithProviders(<App />);
    expect(screen.getByTestId('SignInScreen')).toBeTruthy();
  });

  test('renders App correctly when authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({isAuth: true});
    (useGetUserQuery as jest.Mock).mockReturnValue({
      data: {userType: 'admin'},
    });

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

  test('useGetUserQuery is called with correct arguments and options when not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({isAuth: false});

    (useGetUserQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });

    renderWithProviders(<App />);

    expect(useGetUserQuery).toHaveBeenCalledWith(undefined, {
      skip: true,
      refetchOnMountOrArgChange: true,
    });
  });

  test('useGetUserQuery is called with correct arguments and options when authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({isAuth: true});

    (useGetUserQuery as jest.Mock).mockReturnValue({
      data: {
        id: '123',
        name: 'Mocked User',
        email: 'mocked@example.com',
        userType: 'admin',
      },
      isLoading: false,
      isError: false,
    });

    renderWithProviders(<App />);

    expect(useGetUserQuery).toHaveBeenCalledWith(undefined, {
      skip: false,
      refetchOnMountOrArgChange: true,
    });
  });
});
