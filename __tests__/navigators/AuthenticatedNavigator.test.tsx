import * as React from 'react';

import {fireEvent, render, screen} from '@testing-library/react-native';
import AuthenticatedNavigator from 'navigationStacks/AuthenticatedNavigator';
import {NavigationContainer} from '@react-navigation/native';

// jest.mock('../../src/navigationStacks/AuthenticatedNavigator', () => {
//   const {Text} = require('react-native');
//   return () => <Text testID="new-user-navigator" />;
// });

// describe('AuthenticatedNavigator', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   test('renders NewUserNavigator when userType is newuser', () => {
//     const {getByTestId} = render(
//       <AuthenticatedNavigator userType="newuser" admin={false} />,
//     );
//     expect(screen.getByText('new-user-navigator')).toBeOnTheScreen();
//   });
// });

test('shows profile screen when View Profile is pressed', () => {
  render(
    <NavigationContainer>
      <AuthenticatedNavigator />
    </NavigationContainer>,
  );

  fireEvent.press(screen.getByText('View Profile'));

  expect(screen.getByText('My Profile')).toBeOnTheScreen();
});
