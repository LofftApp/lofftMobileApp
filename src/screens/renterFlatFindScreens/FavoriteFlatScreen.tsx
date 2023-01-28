import React from 'react';
import {View, Text} from 'react-native';

// Components 🪢
import PrimaryScreen from '@Components/coreComponents/ScreenTemplates/PrimaryScreen';

// Stylesheets 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';

const FavoriteFlatScreen = () => {
  return (
    <PrimaryScreen>
      <Text style={fontStyles.headerLarge}>Saved listings</Text>
    </PrimaryScreen>
  );
};

export default FavoriteFlatScreen;
