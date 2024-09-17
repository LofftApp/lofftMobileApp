import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SignInScreen from './SignInScreen';
import {NavigationContainer} from '@react-navigation/native';

describe('SignInScreen', () => {
  // Mock navigation prop
  const navigation = {navigate: jest.fn()};

  // Basic render test
  it('renders correctly', () => {
    const {getByText, getByTestId} = render(
      <NavigationContainer>
        <SignInScreen navigation={navigation} />
      </NavigationContainer>,
    );

    // Check if SignInForm and SignInWith components are rendered
    expect(getByTestId('sign-in-form')).toBeTruthy(); // Assuming you've added testID to SignInForm
    expect(getByTestId('sign-in-with')).toBeTruthy(); // Assuming you've added testID to SignInWith
    expect(getByText("Don't have an account yet?")).toBeTruthy(); // Check if the text is rendered
  });

  // Interaction and navigation test
  it('navigates to SignUpScreen when "Sign Up" link is pressed', () => {
    const {getByText} = render(
      <NavigationContainer>
        <SignInScreen navigation={navigation} />
      </NavigationContainer>,
    );

    const signUpLink = getByText('Sign Up');

    // Simulate pressing the "Sign Up" link
    fireEvent.press(signUpLink);

    // Check if navigation to "SignUpScreen" has been triggered
    expect(navigation.navigate).toHaveBeenCalledWith('SignUpScreen');
  });

  // Snapshot test
  it('matches the snapshot', () => {
    const {toJSON} = render(
      <NavigationContainer>
        <SignInScreen navigation={navigation} />
      </NavigationContainer>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
