import React, {useEffect, useRef} from 'react';
import {Text, StyleSheet, Pressable, Animated} from 'react-native';

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
}: any) => {
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
          disabled ? styles.disabled : null,
        ]}
        disabled={disabled}>
        <Text
          style={[fontStyles.bodyMedium, {color: toggle ? 'white' : 'black'}]}>
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirction: 'row',
    marginRight: 8,
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 2,
  },
  disabled: {
    backgroundColor: Color.Black[5],
    borderColor: Color.Black[10],
  },
});

export default EmojiIcon;
