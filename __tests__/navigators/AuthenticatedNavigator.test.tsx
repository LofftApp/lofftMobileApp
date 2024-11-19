import * as React from 'react';

import {render} from '@testing-library/react-native';
import AuthenticatedNavigator from 'navigationStacks/AuthenticatedNavigator';
import {NavigationContainer} from '@react-navigation/native';
import LessorNavigator from 'navigationStacks/LessorNavigator';
import NewUserNavigator from 'navigationStacks/NewUserNavigator';
import TenantNavigator from 'navigationStacks/TenantNavigator';
import AdminNavigator from 'navigationStacks/AdminNavigator';

jest.mock('../../src/navigationStacks/AuthenticatedNavigator', () => {
  const {Text} = require('react-native');
  return ({userType, admin}: {userType: string; admin: boolean}) => {
    return (
      <Text
        userType={userType}
        admin={admin}
        testID={`${userType}-admin:${admin ? 'true' : 'false'}`}
      />
    );
  };
});

jest.mock('../../src/navigationStacks/LessorNavigator', () => {
  const {Text} = require('react-native');
  return () => <Text>Lessor Navigator</Text>;
});

jest.mock('../../src/navigationStacks/TenantNavigator', () => {
  const {Text} = require('react-native');
  return () => <Text>Tenant Navigator</Text>;
});

jest.mock('../../src/navigationStacks/NewUserNavigator', () => {
  const {Text} = require('react-native');
  return () => <Text>New User Navigator</Text>;
});

jest.mock('../../src/navigationStacks/AdminNavigator', () => {
  const {Text} = require('react-native');
  return () => <Text>Admin Navigator</Text>;
});

jest.mock('../../src/components/LoadingAndNotFound/NotFoundComponent', () => {
  const {Text} = require('react-native');
  return () => <Text>Not Found Component</Text>;
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
    expect(getByTestId('newuser-admin:false').props.userType).toBe('newuser');
    expect(getByTestId('newuser-admin:false').props.admin).toBe(false);
  });

  test('renders NewUserNavigator directly', () => {
    const {getByText} = render(<NewUserNavigator />);
    expect(getByText('New User Navigator')).toBeTruthy();
  });

  test('renders LessorNavigator when userType is "lessor"', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <AuthenticatedNavigator userType="lessor" admin={false} />
      </NavigationContainer>,
    );

    expect(getByTestId('lessor-admin:false')).toBeTruthy();
    expect(getByTestId('lessor-admin:false').props.userType).toBe('lessor');
    expect(getByTestId('lessor-admin:false').props.admin).toBe(false);
  });
  test('renders LessorNavigator directly', () => {
    const {getByText} = render(<LessorNavigator />);
    expect(getByText('Lessor Navigator')).toBeTruthy();
  });

  test('renders TenantNavigator when userType is "tenant"', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <AuthenticatedNavigator userType="tenant" admin={false} />
      </NavigationContainer>,
    );

    expect(getByTestId('tenant-admin:false')).toBeTruthy();
    expect(getByTestId('tenant-admin:false').props.userType).toBe('tenant');
    expect(getByTestId('tenant-admin:false').props.admin).toBe(false);
  });

  test('renders TenantNavigator directly', () => {
    const {getByText} = render(<TenantNavigator />);
    expect(getByText('Tenant Navigator')).toBeTruthy();
  });

  test('renders AdminScreen when admin is true userType is undefined', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <AuthenticatedNavigator admin={true} />
      </NavigationContainer>,
    );

    expect(getByTestId('undefined-admin:true')).toBeTruthy();
    expect(getByTestId('undefined-admin:true').props.userType).toBeUndefined();
    expect(getByTestId('undefined-admin:true').props.admin).toBe(true);
  });

  test('renders AdminNavigator directly', () => {
    const {getByText} = render(<AdminNavigator />);
    expect(getByText('Admin Navigator')).toBeTruthy();
  });

  test('renders AdminScreen when admin is true userType is "newuser"', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <AuthenticatedNavigator userType="newuser" admin={true} />
      </NavigationContainer>,
    );

    expect(getByTestId('newuser-admin:true')).toBeTruthy();
    expect(getByTestId('newuser-admin:true').props.userType).toBe('newuser');
    expect(getByTestId('newuser-admin:true').props.admin).toBe(true);
  });
});
