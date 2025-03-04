import React from 'react';
import {screen, waitFor} from '@testing-library/react-native';
import {renderWithProviders} from '../../__utils__/testUtils';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

import {useGetFavoritesAdvertsQuery} from 'reduxFeatures/adverts/advertApi';
import FavoritesScreen from 'screens/dashboard/tenant/FavoritesScreen';
import {useManualPopover} from '../../__mocks__/redux/useManualPopover';

describe('Favorites Screen', () => {
  test('renders correctly ', () => {
    (useGetUserQuery as jest.Mock).mockReturnValue({
      data: {
        userType: 'tenant',
      },
    });
    (useGetFavoritesAdvertsQuery as jest.Mock).mockReturnValue({
      data: jest.fn(),
    });

    renderWithProviders(<FavoritesScreen />, {navigation: true});
    expect(screen.getByTestId('favorites-screen')).toBeTruthy();
  });
});

describe('FavoritesScreen Popover Behavior', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows popover when a favorite is applied for the first time', async () => {
    (useManualPopover as jest.Mock).mockReturnValue({
      showPopover: true,
      setShowPopover: jest.fn(),
    });

    (useGetFavoritesAdvertsQuery as jest.Mock).mockReturnValue({
      data: {
        favorites: [{id: '1', title: 'Beautiful Apartment', applied: true}],
      },
      isLoading: false,
      isError: false,
    });

    (useGetUserQuery as jest.Mock).mockReturnValue({
      data: {credits: 5},
    });

    renderWithProviders(<FavoritesScreen />);

    await waitFor(() =>
      expect(
        screen.getByText(/Applied. You can find the listings/i),
      ).toBeTruthy(),
    );
  });
});
