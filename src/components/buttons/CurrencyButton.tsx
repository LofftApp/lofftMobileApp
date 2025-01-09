import React from 'react';
import {Text, StyleSheet, Pressable, View} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {Currency} from 'reduxFeatures/assets/types';

// Styles
import Color from 'styleSheets/lofftColorPallet.json';
import { useTheme } from 'components/themes/ThemeContext';
import { createFontStyles } from 'styleSheets/fontStyles';
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
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? Color.Dark : Color.Light;
  const fontStyles = createFontStyles(isDarkMode);
  const colorText = {color: toggle ? colors.White[100] : colors.Black[100]};

  const styles = StyleSheet.create({
    emojiIcon: {
      borderColor: colors.Black[100],
    },
    selectedEmojiIcon: {
      borderColor: colors.Lavendar[100],
      backgroundColor: colors.Lavendar[100],
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
      backgroundColor: colors.Black[5],
      borderColor: colors.Black[10],
    },
  });

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
        {currency === 'eur' && (
          <Text style={[fontStyles.bodySmall, colorText]}>EUR</Text>
        )}
        {currency === 'gbp' && (
          <Text style={[fontStyles.bodySmall, colorText]}>GBP</Text>
        )}
        {currency === 'usd' && (
          <Text style={[fontStyles.bodySmall, colorText]}>USD</Text>
        )}
      </Pressable>
    </View>
  );
};

export default CurrencyButton;
