import React from 'react';
import {screen, fireEvent} from '@testing-library/react-native';
import NotificationCard from 'components/cards/NotificationCard';
import {
  lessorNotificationMock,
  tenantNotificationMock,
} from '../../__mocks__/notification';
import {renderWithProviders} from 'helpers/testUtils';
import {findStyleInArray} from '../__utils__/findStyleInArray';
import {
  LessorNotificationType,
  TenantNotificationType,
} from 'reduxFeatures/firebaseNotifications/types';
import {mockedNavigation} from '../../__mocks__/@react-navigation/native';

// Mock navigation
// jest.mock('@react-navigation/native', () => ({
//   useNavigation: jest.fn(),
// }));

// lessor tests
describe('NotificationCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders container', () => {
    renderWithProviders(
      <NotificationCard notification={lessorNotificationMock} />,
    );
    expect(screen.getByTestId('notification-card-container')).toBeTruthy();
  });

  test('renders correct text', () => {
    renderWithProviders(
      <NotificationCard notification={lessorNotificationMock} />,
    );

    expect(
      screen.getByText(/A new applicant has applied for your flat/i),
    ).toBeTruthy();
    expect(screen.getByText('Beautiful Apartment')).toBeTruthy();
  });

  test('renders correct icon when notificationType is new_applicant ', () => {
    renderWithProviders(
      <NotificationCard notification={lessorNotificationMock} />,
    );

    expect(screen.getByTestId('face-wink')).toBeTruthy();
  });

  test('renders button when notificationType is new_applicant', () => {
    renderWithProviders(
      <NotificationCard notification={lessorNotificationMock} />,
    );

    expect(screen.getByText('See applicants')).toBeTruthy();
  });

  test('renders bgColor correct when notificationType is new_applicant"', () => {
    renderWithProviders(
      <NotificationCard notification={lessorNotificationMock} />,
    );

    const container = screen.getByTestId('notification-card-container');
    expect(container).toBeTruthy();
    const bgColor = findStyleInArray(container.props.style, 'backgroundColor');
    expect(bgColor).toBe('#E4E0FF');
  });

  test("renders advert image when it's available", () => {
    renderWithProviders(
      <NotificationCard notification={lessorNotificationMock} />,
    );

    expect(screen.getByTestId('flat-image')).toBeTruthy();
  });

  test('render no-flat image when url is not available ', () => {
    renderWithProviders(
      <NotificationCard notification={tenantNotificationMock} />,
    );

    expect(screen.getByTestId('no-flat')).toBeTruthy();
  });

  test('render correct button icon when notificationType is viewing', () => {
    const mock = {
      ...lessorNotificationMock,
      notificationType: 'viewing' as LessorNotificationType,
    };
    renderWithProviders(<NotificationCard notification={mock} />);

    expect(screen.getByTestId('hourglass')).toBeTruthy();
  });

  test('navigates to the correct screen on button press when notificationType is new_applicant', () => {
    renderWithProviders(
      <NotificationCard notification={lessorNotificationMock} />,
    );

    const button = screen.getByText('See applicants');
    fireEvent.press(button);

    expect(mockedNavigation.navigate).toHaveBeenCalledWith(
      'LessorIndexNavigator',
      {
        screen: 'SeeApplicantsScreen',
        params: {advertId: 42},
      },
    );
  });

  test('Navigates to the correct application when clicking tagLine', () => {
    renderWithProviders(
      <NotificationCard notification={lessorNotificationMock} />,
    );

    const tagLine = screen.getByText('Beautiful Apartment');
    fireEvent.press(tagLine);

    expect(mockedNavigation.navigate).toHaveBeenCalledWith(
      'LessorIndexNavigator',
      {
        screen: 'ApplicationShowScreen',
        params: {id: 42},
      },
    );
  });
});

// tenant tests
describe('NotificationCard as tenant', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders container', () => {
    renderWithProviders(
      <NotificationCard notification={tenantNotificationMock} />,
    );
    expect(screen.getByTestId('notification-card-container')).toBeTruthy();
  });

  test('renders correct text', () => {
    renderWithProviders(
      <NotificationCard notification={tenantNotificationMock} />,
    );

    expect(
      screen.getByText(/A new applicant has applied for your flat/i),
    ).toBeTruthy();
    expect(screen.getByText('Beautiful Apartment')).toBeTruthy();
  });

  test('renders correct icon when notificationType is round_1', () => {
    renderWithProviders(
      <NotificationCard notification={tenantNotificationMock} />,
    );

    expect(screen.getByTestId('thumbs-up')).toBeTruthy();
  });

  test('does not render button when notificationType is round_1', () => {
    renderWithProviders(
      <NotificationCard notification={tenantNotificationMock} />,
    );

    expect(screen.queryByText('See applicants')).toBeNull();
  });

  test('renders bgColor correct when notificationType is round_1', () => {
    renderWithProviders(
      <NotificationCard notification={tenantNotificationMock} />,
    );

    const container = screen.getByTestId('notification-card-container');
    expect(container).toBeTruthy();
    const bgColor = findStyleInArray(container.props.style, 'backgroundColor');
    expect(bgColor).toBe('#D1F6EB');
  });

  test("renders advert image when it's available", () => {
    renderWithProviders(
      <NotificationCard notification={lessorNotificationMock} />,
    );

    expect(screen.getByTestId('flat-image')).toBeTruthy();
  });

  test('render no-flat image when url is not available ', () => {
    renderWithProviders(
      <NotificationCard notification={tenantNotificationMock} />,
    );

    expect(screen.getByTestId('no-flat')).toBeTruthy();
  });

  test('navigates to the correct screen on button press when notificationType round_3', () => {
    const mock = {
      ...tenantNotificationMock,
      notificationType: 'round_3' as TenantNotificationType,
    };

    renderWithProviders(<NotificationCard notification={mock} />);

    const button = screen.getByText('Go to chat');
    fireEvent.press(button);

    expect(mockedNavigation.navigate).toHaveBeenCalledWith(
      'ApplicationNavigator',
      {
        screen: 'LessorChatScreen',
      },
    );
  });

  test('Navigates to the correct application when clicking tagLine', () => {
    renderWithProviders(
      <NotificationCard notification={tenantNotificationMock} />,
    );

    const tagLine = screen.getByText('Beautiful Apartment');
    fireEvent.press(tagLine);

    expect(mockedNavigation.navigate).toHaveBeenCalledWith(
      'ApplicationNavigator',
      {
        screen: 'ApplicationShowScreenn',
        params: {id: 1},
      },
    );
  });
});
