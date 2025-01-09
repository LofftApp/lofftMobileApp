import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {size} from 'react-native-responsive-sizes';
// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Types 🏷
import type {HeaderPageContentSwitchProps} from './types';
import { useTheme } from 'components/themes/ThemeContext';
import { createFontStyles } from 'styleSheets/fontStylesTest';

const HeaderPageContentSwitch = ({
  toggleNames,
  toggleIcons,
  activeScreen,
  setActiveScreen,
  markers,
}: HeaderPageContentSwitchProps) => {


  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? Color.Dark : Color.Light;
  const fontStyles = createFontStyles(isDarkMode);

  const styles = StyleSheet.create({
  viewToggle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: colors.Lavendar[100],
    borderWidth: size(2),
    borderRadius: 12,
    marginTop: size(7),
    height: size(40),
    marginBottom: size(12),
    marginHorizontal: size(16),
    backgroundColor: colors.White[100],
    zIndex: 4,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  toggleButtonActive: {
    backgroundColor: colors.Lavendar[100],
  },
  toggleButtonText: {
    marginLeft: 5,
    color: colors.Lavendar[100],
  },
  toggleButtonTextActive: {
    color: isDarkMode
      ? colors.Black[100]
      : activeScreen === markers[0]
      ? colors.White[100]
      : colors.Lavendar[50],
  },
});

  return (
    <View style={styles.viewToggle}>
      <Pressable
        style={[
          styles.toggleButton,
          activeScreen === markers[0] && styles.toggleButtonActive,
        ]}
        onPress={() => setActiveScreen(markers[0])}>
       <LofftIcon
          name={toggleIcons[0]}
          size={size(20)}
          color={
          isDarkMode
            ? activeScreen === markers[0]
              ? colors.Black[100]
              : colors.Lavendar[100]
            : activeScreen === markers[0]
            ? colors.White[100]
            : colors.Lavendar[50]
        }
        />
        <Text
          style={[
            fontStyles.bodyMedium,
            styles.toggleButtonText,
            activeScreen === markers[0] && styles.toggleButtonTextActive,
          ]}>
          {toggleNames[0]}
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.toggleButton,
          activeScreen === markers[1] && styles.toggleButtonActive,
        ]}
        onPress={() => setActiveScreen(markers[1])}>
        <LofftIcon
          name={toggleIcons[1]}
          size={20}
         color={
          isDarkMode
            ? activeScreen === markers[1]
              ? colors.Black[100]
              : colors.Lavendar[100]
            : activeScreen === markers[1]
            ? colors.White[100]
            : colors.Lavendar[50]
        }
        />
        <Text
          style={[
            fontStyles.bodyMedium,
            styles.toggleButtonText,
            activeScreen === markers[1] && styles.toggleButtonTextActive,
          ]}>
          {toggleNames[1]}
        </Text>
      </Pressable>
    </View>
  );
};



export default HeaderPageContentSwitch;
