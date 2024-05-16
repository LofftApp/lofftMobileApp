import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// StyleSheet 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

const MatchingScoreButton = ({size, score}: any) => {
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
    height: 38,
    width: 77,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontColor: {
    color: Color.Mint[100],
  },
  flatCardMatchingScoreButtonSmall: {
    backgroundColor: Color.Mint[10],
    height: 27,
    width: 63,
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
