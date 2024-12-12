import React from 'react';
import { View } from 'react-native';

export const createNativeStackNavigator = jest.fn(() => ({
  Navigator: jest.fn().mockImplementation(({ children }) => <>{children}</>),
  Screen: jest.fn().mockImplementation(({ name, children }) => (
    <View testID={name}>{children}</View>
  )),
}));
