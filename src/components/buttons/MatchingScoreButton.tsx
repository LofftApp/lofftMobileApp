import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// StyleSheet 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Helpers 🥷🏻
import {size as sizeResponsive} from 'react-native-responsive-sizes';

// Types 🏷️
import type {MatchingScoreButtonProps} from './types';
import { useTheme } from 'components/themes/ThemeContext';
import { createFontStyles } from 'styleSheets/fontStylesTest';

const MatchingScoreButton = ({size, score}: MatchingScoreButtonProps) => {

  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? Color.Dark : Color.Light;
  const fontStyles = createFontStyles(isDarkMode);


  const styles = StyleSheet.create({
    flatCardMatchingScoreButtonBig: {
      height: sizeResponsive(38),
      width: sizeResponsive(90),
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: sizeResponsive(5),
    },
    fontColor: {
      color: colors.Mint[100],
    },
    flatCardMatchingScoreButtonSmall: {
      backgroundColor: colors.Mint[10],
      height: sizeResponsive(27),
      width: sizeResponsive(80),
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    flatCardMatchingScoreButtonFontSmall: {
      fontWeight: '700',
      fontSize: 15,
      color: colors.Mint[100],
    },
  });

  return (
    <View
      style={
        size === 'Big'
          ? styles.flatCardMatchingScoreButtonBig
          : styles.flatCardMatchingScoreButtonSmall
      }>
      <Text
        style={
          size === 'Big'
            ? [fontStyles.headerSmall, styles.fontColor]
            : styles.flatCardMatchingScoreButtonFontSmall
        }>
        🌟 {score}%
      </Text>
    </View>
  );
};

export default MatchingScoreButton;
