import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Styles 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import { useTheme } from 'components/themes/ThemeContext';
import { createFontStyles } from 'styleSheets/fontStyles';

// assets 🛠️
import {Looking} from '../../../assets';

const FavoritesScreen: React.FC = () => {
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? Color.Dark : Color.Light;
  const fontStyles = createFontStyles(isDarkMode);

  const styles = StyleSheet.create({
    pageContainer: {
      backgroundColor: colors.White[100],
      paddingHorizontal: 16,
      flex: 1,
    },
    headerText: {
      marginTop: 68,
      marginHorizontal: 16,
    },
    image: {
      height: '70%',
      overflow: 'visible',
      marginTop: 50,
    },
    bodyContainer: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 35,
    },
    subText: {
      marginTop: 16,
      color: colors.Black[50],
    },
  });

  return (
    <View style={styles.pageContainer}>
      <View style={styles.headerText}>
        <Text style={fontStyles.headerLarge}>Saved Listings - hardcoded</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Looking style={styles.image} />
        <Text style={fontStyles.headerMedium}>
          You don't have any saved listings
        </Text>
        <Text style={[fontStyles.bodyMedium, styles.subText]}>
          Find the saved listings that you've applied to in the applications
          tab.
        </Text>
      </View>
    </View>
  );
};

export default FavoritesScreen;
