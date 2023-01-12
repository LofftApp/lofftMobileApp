import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// StyleSheet 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';

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
            ? styles.flatCardMatchingScoreButtonFontBig
            : styles.flatCardMatchingScoreButtonFontSmall
        }>
        🌟 {score}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flatCardMatchingScoreButtonBig: {
    backgroundColor: Color.Mint[10],
    height: 38,
    width: 77,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatCardMatchingScoreButtonFontBig: {
    fontWeight: '600',
    fontSize: 18,
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
