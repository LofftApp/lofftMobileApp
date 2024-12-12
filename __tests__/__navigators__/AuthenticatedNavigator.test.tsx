import React from 'react';

import {screen} from '@testing-library/react-native';
import AuthenticatedNavigator from 'navigationStacks/AuthenticatedNavigator';
import {renderWithProviders} from '../../__utils__/testUtils';

describe('AuthenticatedNavigator', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders NewUserNavigator when userType is "newuser"', () => {
    renderWithProviders(
      <AuthenticatedNavigator userType="newuser" admin={false} />,
    );

    expect(screen.getByTestId('NewUserStack')).toBeTruthy();
  });

  test('renders AdminNavigator when admin is true', () => {
    renderWithProviders(
      <AuthenticatedNavigator userType="newuser" admin={true} />,
    );

    expect(screen.getByTestId('AdminStack')).toBeTruthy();
  });

  test('renders LessorNavigator when userType is "lessor"', () => {
    renderWithProviders(
      <AuthenticatedNavigator userType="lessor" admin={false} />,
    );

    expect(screen.getByTestId('LessorDashboardStack')).toBeTruthy();
  });

  test('renders TenantNavigator when userType is "tenant"', () => {
    renderWithProviders(
      <AuthenticatedNavigator userType="tenant" admin={false} />,
    );

    expect(screen.getByTestId('TenantDashboardStack')).toBeTruthy();
  });

  test('renders nothing when userType is not provided', () => {
    renderWithProviders(<AuthenticatedNavigator admin={false} />);

    expect(screen.queryByTestId('NewUserStack')).toBeNull();
    expect(screen.queryByTestId('AdminStack')).toBeNull();
    expect(screen.queryByTestId('LessorDashboardStack')).toBeNull();
    expect(screen.queryByTestId('TenantDashboardStack')).toBeNull();
  });
});
