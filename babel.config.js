module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          src: './src',
          api: './src/api',
          components: './src/components',
          screens: './src/screens',
          styleSheets: './src/styles',
          helpers: './src/helpers',
          Assets: './src/assets',
          reduxFeatures: './src/features',
          persistance: './src/persistance',
          reduxCore: './src/app',
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
