import React, {useEffect, useRef} from 'react';
import {Text, StyleSheet, Pressable, Animated} from 'react-native';
import {size} from 'react-native-responsive-sizes';

// Styles
import Color from 'styleSheets/lofftColorPalletTest.json';

//Types
import {SelectionButtonProps} from './types';
import { useTheme } from 'components/themes/ThemeContext';
import { createFontStyles } from 'styleSheets/fontStylesTest';

const SelectionButton = ({
  id,
  emojiIcon,
  value,
  toggle,
  selectFn,
  disabled = false,
}: SelectionButtonProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const {isDarkMode}: any = useTheme();
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
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}>
      <Pressable
        onPress={() => {
          selectFn(id);
        }}
        style={[
          styles.buttonStyle,
          toggle ? styles.selectedEmojiIcon : styles.emojiIcon,
          disabled && styles.disabled,
        ]}
        disabled={disabled}>
        <Text style={[fontStyles.bodySmall, colorText]}>
          {emojiIcon} {value}
        </Text>
      </Pressable>
    </Animated.View>
  );
};


export default SelectionButton;
