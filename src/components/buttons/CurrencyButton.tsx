import React from 'react';
import {Text, StyleSheet, Pressable, View} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {Currency} from 'reduxFeatures/registration/types';

// Styles
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

//Types

type CurrencyButtonProps = {
  currency: Currency;
  toggle: boolean;
  selectFn: (id: Currency) => void;
  disabled?: boolean;
};

const CurrencyButton = ({
  currency,
  toggle,
  selectFn,
  disabled = false,
}: CurrencyButtonProps) => {
  const colorText = {color: toggle ? Color.White[100] : Color.Black[100]};

  return (
    <View>
      <Pressable
        onPress={() => {
          selectFn(currency);
        }}
        style={[
          styles.buttonStyle,
          toggle ? styles.selectedEmojiIcon : styles.emojiIcon,
          disabled && styles.disabled,
        ]}
        disabled={disabled}>
        {currency === '€' && (
          <Text style={[fontStyles.bodySmall, colorText]}>EUR</Text>
        )}
        {currency === '£' && (
          <Text style={[fontStyles.bodySmall, colorText]}>GBP</Text>
        )}
        {currency === '$' && (
          <Text style={[fontStyles.bodySmall, colorText]}>USD</Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  emojiIcon: {
    borderColor: Color.Black[100],
  },
  selectedEmojiIcon: {
    borderColor: Color.Lavendar[100],
    backgroundColor: Color.Lavendar[100],
  },
  buttonStyle: {
    paddingVertical: size(12),
    paddingHorizontal: size(16),

    marginRight: size(8),
    marginBottom: size(16),
    borderRadius: size(16),
    borderWidth: size(2),
  },
  disabled: {
    backgroundColor: Color.Black[5],
    borderColor: Color.Black[10],
  },
});

export default CurrencyButton;
