import React from 'react';

import {render, screen} from '@testing-library/react-native';
import AuthenticatedNavigator from 'navigationStacks/AuthenticatedNavigator';

describe('AuthenticatedNavigator', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders NewUserNavigator when userType is "newuser"', () => {
    render(<AuthenticatedNavigator userType="newuser" admin={false} />);

    expect(screen.getByTestId('NewUserStack')).toBeTruthy();
  });

  test('renders AdminNavigator when admin is true', () => {
    render(<AuthenticatedNavigator userType="newuser" admin={true} />);

    expect(screen.getByTestId('AdminStack')).toBeTruthy();
  });

  test('renders LessorNavigator when userType is "lessor"', () => {
    render(<AuthenticatedNavigator userType="lessor" admin={false} />);

    expect(screen.getByTestId('LessorDashboardStack')).toBeTruthy();
  });

  test('renders TenantNavigator when userType is "tenant"', () => {
    render(<AuthenticatedNavigator userType="tenant" admin={false} />);

    expect(screen.getByTestId('TenantDashboardStack')).toBeTruthy();
  });

  test('renders nothing when userType is not provided', () => {
    render(<AuthenticatedNavigator admin={false} />);

    expect(screen.queryByTestId('NewUserStack')).toBeNull();
    expect(screen.queryByTestId('AdminStack')).toBeNull();
    expect(screen.queryByTestId('LessorDashboardStack')).toBeNull();
    expect(screen.queryByTestId('TenantDashboardStack')).toBeNull();
  });
});
