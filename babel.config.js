module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          api: './src/api',
          components: './src/components',
          screens: './src/screens',
          styleSheets: './src/styles',
          Assets: './src/assets',
          redux: './src/features',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
  ],
};
