import React, { ReactNode } from 'react';
import { View } from 'react-native';

// Mock SafeAreaProvider
const SafeAreaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <View>{children}</View>;
};

// Mock SafeAreaConsumer
const SafeAreaConsumer: React.FC<{
  children: (insets: { top: number; bottom: number; left: number; right: number }) => ReactNode;
}> = ({ children }) => {
  return <>{children({ top: 0, bottom: 0, left: 0, right: 0 })}</>;
};

// Mock useSafeAreaInsets
const useSafeAreaInsets = jest.fn(() => ({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}));

export { SafeAreaProvider, SafeAreaConsumer, useSafeAreaInsets };
