module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|react-native-collapsible|@react-native|@react-navigation)',
  ],
  moduleNameMapper: {
    '^@rnmapbox/maps$': '<rootDir>/__mocks__/@rnmapbox/maps.ts',
    '^react-native-encrypted-storage$':
      '<rootDir>/__mocks__/react-native-encrypted-storage.ts',
    '^@AsyncStorage/async-storage$':
      '<rootDir>/__mocks__/@AsyncStorage/async-storage.ts',
    '^@react-navigation/native-stack$':
      '<rootDir>/__mocks__/@react-navigation/native-stack.ts',
    '^react-navigation/bottom-tabs$': '<rootDir>/__mocks__/react-navigation.ts',
    '^react-native-splash-screen$':
      '<rootDir>/__mocks__/react-native-splash-screen.ts',
    '^react-native-responsive-sizes$':
      '<rootDir>/__mocks__/react-native-responsive-sizes.ts',
    '^react-native-slider$': '<rootDir>/__mocks__/react-native-slider.ts',
    '^@react-native-firebase/messaging$':
      '<rootDir>/__mocks__/@react-native-firebase/messaging.ts',
    '^@notifee/react-native$': '<rootDir>/__mocks__/notifee.ts',
  },
};
