import React from 'react';
import {screen} from '@testing-library/react-native';
import {renderWithProviders} from '../../__utils__/testUtils';
import NotificationsScreen from 'screens/dashboard/NotificationsScreen';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {useGetNotificationsQuery} from 'reduxFeatures/firebaseNotifications/fcmApi';
import {
  lessorNotificationMock,
  tenantNotificationMock,
} from '../../__mocks__/notification';

describe('NotificationsScreen', () => {
  test('renders correctly when lessor ', () => {
    (useGetUserQuery as jest.Mock).mockReturnValue({
      data: {userType: 'lessor'},
    });
    (useGetNotificationsQuery as jest.Mock).mockReturnValue({
      data: lessorNotificationMock,
    });
    renderWithProviders(<NotificationsScreen />, {navigation: true});
    expect(screen.getByTestId('notifications-screen')).toBeTruthy();
    expect(screen.getByTestId('lessor-flatlist')).toBeTruthy();
  });

  test('renders correctly when tenant ', () => {
    (useGetUserQuery as jest.Mock).mockReturnValue({
      data: {userType: 'tenant'},
    });
    (useGetNotificationsQuery as jest.Mock).mockReturnValue({
      data: tenantNotificationMock,
    });
    renderWithProviders(<NotificationsScreen />, {navigation: true});
    expect(screen.getByTestId('notifications-screen')).toBeTruthy();
    expect(screen.getByTestId('tenant-flatlist')).toBeTruthy();
  });
});
