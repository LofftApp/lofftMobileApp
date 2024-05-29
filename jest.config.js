module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@rnmapbox/maps$': '<rootDir>/__mocks__/@rnmapbox/maps.ts',
    '^react-native-encrypted-storage$':
      '<rootDir>/__mocks__/react-native-encrypted-storage.ts',
  },
};
