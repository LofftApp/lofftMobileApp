import * as React from 'react';
import {screen, render, fireEvent} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import LanguageSelectionScreen from 'screens/registration/LanguageSelectionScreen';
import {Provider} from 'react-redux';
import {createMockStore} from '../../__mocks__/reduxMock';
import {Store} from 'redux';
import {SafeAreaProvider} from 'react-native-safe-area-context'; // Import SafeAreaProvider

// Mock the necessary Redux hooks
jest.mock('../../src/features/registration/useNewUserDetails', () => ({
  useNewUserDetails: jest.fn(() => ({
    isLessor: false,
    newUserDetails: {userType: 'tenant', languages: ['english']},
    setNewUserDetails: jest.fn(),
  })),
}));

jest.mock('../../src/features/registration/useNewUserCurrentScreen', () => ({
  useNewUserCurrentScreen: jest.fn(() => ({
    setCurrentScreen: jest.fn(),
    currentScreen: 1,
  })),
}));

jest.mock('../../src/features/api/lofftApi', () => ({
  lofftApi: {},
}));

jest.mock('../../src/features/user/userApi', () => ({
  useGetUserQuery: jest.fn(() => ({})),
}));

jest.mock('../../src/features/assets/assetsApi', () => ({
  useGetAssetsQuery: jest.fn(() => ({})),
}));

describe('LanguageSelectionScreen', () => {
  let store: Store;

  beforeEach(() => {
    store = createMockStore({
      auth: {isAuthenticated: true},
      newUser: {
        newUserDetails: {
          userType: 'tenant',
          languages: ['english'],
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders LanguageSelectionScreen and displays initial text', () => {
    render(
      <Provider store={store}>
        <NavigationContainer>
          <LanguageSelectionScreen />
        </NavigationContainer>
      </Provider>,
    );

    // Use screen.debug() to inspect the rendered output
    screen.debug();

    // Expect the text to be present
    expect(screen.getByText('What language(s) do you speak?')).toBeTruthy();
  });

  test('simulates button press and navigates accordingly', () => {
    render(
      <Provider store={store}>
        <NavigationContainer>
          <LanguageSelectionScreen />
        </NavigationContainer>
      </Provider>,
    );

    // Use screen.debug() here to check if the button is rendered
    screen.debug();

    // Find and press the button
    const button = screen.getByText("I'm looking for a flat");
    console.log('this button', button);
    fireEvent.press(button);

    // Check if the expected behavior happens
    // Adjust assertions as needed
    expect(screen.getByText('What language(s) do you speak?')).toBeTruthy();
  });
});
