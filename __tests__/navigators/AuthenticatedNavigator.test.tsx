import * as React from 'react';

import {render} from '@testing-library/react-native';
import AuthenticatedNavigator from 'navigationStacks/AuthenticatedNavigator';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('../../src/navigationStacks/AuthenticatedNavigator', () => {
  const {Text} = require('react-native');
  return ({userType, admin}: {userType: string; admin: boolean}) => {
    return <Text testID={`${userType}-admin:${admin ? 'true' : 'false'}`} />;
  };
});

describe('AuthenticatedNavigator', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders NewUserNavigator when userType is "newuser"', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <AuthenticatedNavigator userType="newuser" admin={false} />
      </NavigationContainer>,
    );

    expect(getByTestId('newuser-admin:false')).toBeTruthy();
  });

  test('renders LessorNavigator when userType is "lessor"', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <AuthenticatedNavigator userType="lessor" admin={false} />
      </NavigationContainer>,
    );

    expect(getByTestId('lessor-admin:false')).toBeTruthy();
  });

  test('renders TenantNavigator when userType is "tenant"', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <AuthenticatedNavigator userType="tenant" admin={false} />
      </NavigationContainer>,
    );

    expect(getByTestId('tenant-admin:false')).toBeTruthy();
  });

  test('renders AdminScreen when admin is true userType is undefined', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <AuthenticatedNavigator admin={true} />
      </NavigationContainer>,
    );

    expect(getByTestId('undefined-admin:true')).toBeTruthy();
  });

  test('renders AdminScreen when admin is true userType is "newuser"', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <AuthenticatedNavigator userType="newuser" admin={true} />
      </NavigationContainer>,
    );

    expect(getByTestId('newuser-admin:true')).toBeTruthy();
  });
});
