module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
     [
            'react-native-reanimated/plugin', {
                relativeSourceLocation: true,
            },
        ],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: [
          {api: './src/api'},
          {components: './src/components'},
          {screens: './src/screens'},
          {styleSheets: './src/styles'},
          {helpers: './src/helpers'},
          {Assets: './src/assets'},
          {reduxFeatures: './src/features'},
          {persistance: './src/persistance'},
          {reduxCore: './src/app'},
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
