import React, {useEffect, useRef} from 'react';
import {Text, StyleSheet, Pressable, Animated} from 'react-native';
import {size} from 'react-native-responsive-sizes';

// Styles
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

const EmojiIcon = ({
  id,
  emojiIcon,
  value,
  toggle,
  selectedEmojis,
  disabled = false,
}: {
  id: number;
  emojiIcon?: string;
  value: string;
  toggle: boolean;
  selectedEmojis: (id: number) => void;
  disabled?: boolean;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      <Pressable
        onPress={() => {
          selectedEmojis(id);
        }}
        style={[
          styles.buttonStyle,
          toggle ? styles.selectedEmojiIcon : styles.emojiIcon,
          disabled && styles.disabled,
        ]}
        disabled={disabled}>
        <Text
          style={[
            fontStyles.bodyMedium,
            toggle ? styles.colorWhite : styles.colorBlack,
          ]}>
          {emojiIcon} {value}
        </Text>
      </Pressable>
    </Animated.View>
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
  colorWhite: {
    color: Color.White[100],
  },
  colorBlack: {
    color: Color.Black[100],
  },
});

export default EmojiIcon;
