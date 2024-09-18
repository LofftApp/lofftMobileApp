import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// StyleSheet 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// Helpers 🥷🏻
import {size as sizeResponsive} from 'react-native-responsive-sizes';

// Types 🏷️
import type {MatchingScoreButtonProps} from './types';

const MatchingScoreButton = ({size, score}: MatchingScoreButtonProps) => {
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

const styles = StyleSheet.create({
  flatCardMatchingScoreButtonBig: {
    height: sizeResponsive(38),
    width: sizeResponsive(77),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontColor: {
    color: Color.Mint[100],
  },
  flatCardMatchingScoreButtonSmall: {
    backgroundColor: Color.Mint[10],
    height: sizeResponsive(27),
    width: sizeResponsive(80),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatCardMatchingScoreButtonFontSmall: {
    fontWeight: '700',
    fontSize: 15,
    color: Color.Mint[100],
  },
});

export default MatchingScoreButton;
