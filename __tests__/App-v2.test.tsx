import React from 'react';
import App from '../App';
import {renderWithProviders} from 'helpers/testUtils';
import {useGetUserQuery} from '../__mocks__/RTKQ/userApi';
import {useAppSelector} from '../__mocks__/redux/hooks';
import {render, screen, waitFor} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import GuestStackNavigator from 'navigationStacks/GuestNavigator';
import SignInScreen from 'screens/auth/SignInScreen';
import { SafeAreaProvider } from '../__mocks__/react-native-safe-area-context';


console.log(SafeAreaProvider)

// Mock the authSlice hook
// jest.mock('../src/features/auth/authSlice', () => ({
//   authSlice: jest.fn(),
// }));

// jest.mock('../src/features/auth/authSlice', () => {
//   const originalModule = jest.requireActual('./__mocks__/redux/authSlice');
//   return {
//     ...originalModule,
//     setAuthenticated: jest.fn(),
//   };
// });

// Mock Navigators
// jest.mock('../src/navigationStacks/GuestNavigator', () => {
//   const {Text} = require('react-native');
//   return () => <Text testID="guest-navigator" />;
// });

// jest.mock('../src/navigationStacks/AuthenticatedNavigator', () => {});

// jest.mock('../src/components/LoadingAndNotFound/NotFoundComponent', () => {
//   const {Text} = require('react-native');
//   return ({message}: {message: string}) => (
//     <Text testID="not-found-component">{message}</Text>
//   );
// });

// test('renders App with authenticated state', () => {
//   useAppSelector.mockImplementation(selector => {
//     if (selector.name === 'authSelector') {
//       return {isAuthenticated: true, authMessage: 'Authenticated'};
//     }
//     return {};
//   });

//   renderWithProviders(<App />);
//   expect(
//     screen.getByText('Error loading user type. Please try again'),
//   ).toBeTruthy();
// });

// test('renders App with unauthenticated state', () => {
//   useAppSelector.mockImplementation(selector => {
//     if (selector.name === 'authSelector') {
//       return {isAuthenticated: false, authMessage: 'Not Authenticated'};
//     }
//     return {};
//   });

//   const {getByText} = renderWithProviders(
//     <SafeAreaProvider>
//       <SignInScreen />
//     </SafeAreaProvider>,
//     {navigation: true},
//   );
//   expect(getByText("Don't have an account yet?")).toBeTruthy();
// });

// test('GuestStackNavigator renders SignInScreen', async () => {
//   renderWithProviders(<GuestStackNavigator />);

//   await waitFor(() => {
//     expect(screen.getByTestId('sign-in')).toBeTruthy();
//   });
// });

// test('SignInScreen renders correctly', async () => {
//   renderWithProviders(
//     <SafeAreaProvider>
//       <SignInScreen />
//     </SafeAreaProvider>,

//     {navigation: true},
//   );

//   await waitFor(() => {
//     expect(screen.getByTestId('sign-in')).toBeTruthy();
//     screen.debug();
//   });
// });

test('SignInScreen renders correctly without wrappers', () => {
  render(
    <NavigationContainer>
      <SafeAreaProvider>
        <SignInScreen />
      </SafeAreaProvider>
    </NavigationContainer>,
  );

  screen.debug(); // Inspect the output

  expect(screen.getByTestId('sign-in')).toBeTruthy();
});

test('SignInScreen renders correctly with minimal setup', () => {
  renderWithProviders(<SignInScreen />, {navigation: true});
  screen.debug(); // Inspect output
  expect(screen.getByTestId('sign-in')).toBeTruthy();
});

// test('userApi mock works', () => {
//   const result = useGetUserQuery();
//   expect(result.data.name).toBe('Mocked User');
//   expect(result.isLoading).toBe(false);
// });
