import React from 'react';
import {screen} from '@testing-library/react-native';
import {renderWithProviders} from 'helpers/testUtils';
import NotificationsScreen from 'screens/dashboard/NotificationsScreen';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {useGetNotificationsQuery} from 'reduxFeatures/firebaseNotifications/fcmApi';

describe('NotificationsScreen', () => {
  test('renders correctly when lessor ', () => {
    (useGetUserQuery as jest.Mock).mockReturnValue({
      data: {userType: 'lessor'},
    });
    (useGetNotificationsQuery as jest.Mock).mockReturnValue({
      data: {
        notifications: [
          {
            id: 1,
            read: false,
            userType: 'lessor',
            notificationType: 'round_1',
            createdAt: '2021-09-01T00:00:00.000Z',
            title: 'New Application',
            body: 'You have a new application',
            advert: {
              status: 'active',
              flat: {
                tagLine: 'A nice flat',
              },
            },
          },
        ],
      },
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
      data: {
        notifications: [
          {
            id: 1,
            read: false,
            userType: 'tenant',
            notificationType: 'round_1',
            createdAt: '2021-09-01T00:00:00.000Z',
            title: 'New Application',
            body: 'You have a new application',
            advert: {
              status: 'open',
              flat: {
                tagLine: 'A nice flat',
              },
            },
            application: {
              status: 'active',
            },
          },
        ],
      },
    });
    renderWithProviders(<NotificationsScreen />, {navigation: true});
    expect(screen.getByTestId('notifications-screen')).toBeTruthy();
    expect(screen.getByTestId('tenant-flatlist')).toBeTruthy();
  });
});
