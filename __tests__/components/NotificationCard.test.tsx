import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import NotificationCard from 'components/cards/NotificationCard';
import {useNavigation} from '@react-navigation/native';
import {LessorNotification} from 'reduxFeatures/firebaseNotifications/types';
import {lessorNotificationMock} from '../../__mocks__/notification';

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('NotificationCard', () => {
  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: jest.fn(),
    });
  });

  test('renders correctly for lessor notification with "new_applicant" type', () => {
    render(<NotificationCard notification={lessorNotificationMock} />);

    // Check if the icon and text are rendered correctly
    const bodyText = screen.getByText(
      /A new applicant has applied for your flat/i,
    );
    expect(bodyText).toBeTruthy();
    expect(screen.getByText('Beautiful Apartment')).toBeTruthy();
    expect(screen.getByText('See applicants')).toBeTruthy();

    // Check if the icon for "new_applicant" is rendered
    // expect(screen.getByTestId('LofftIcon')).toBeTruthy();

    // Verify background color is correct for unread notification
    const container = screen.getByTestId('NotificationCardContainer');
    // Extract the combined styles
    const styles = container.props.style;
    const backgroundColorStyle = styles.find(
      (style: any) => style.backgroundColor,
    );

    // Assert that the backgroundColor is white
    expect(backgroundColorStyle.backgroundColor).toBe('#E4E0FF');
  });

  test('navigates to the correct screen on button press', () => {
    const navigateMock = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({navigate: navigateMock});

    const mockNotification = {
      id: 1,
      read: false,
      userType: 'lessor',
      notificationType: 'new_applicant',
      createdAt: '2023-12-01T00:00:00.000Z',
      title: 'New Applicant',
      body: 'A new applicant has applied for your flat.',
      advert: {
        id: 42,
        status: 'open',
        flat: {tagLine: 'Beautiful Apartment', url: null},
      },
    };

    render(<NotificationCard notification={mockNotification} />);

    // Simulate button press
    const button = screen.getByText('See applicants');
    fireEvent.press(button);

    // Assert navigation behavior
    expect(navigateMock).toHaveBeenCalledWith('LessorIndexNavigator', {
      screen: 'SeeApplicantsScreen',
      params: {advertId: 42},
    });
  });
});
