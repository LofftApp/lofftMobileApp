import React, {useEffect, useRef} from 'react';
import {Text, StyleSheet, Pressable, Animated} from 'react-native';

// Styles
import {fontStyles} from '../../styles/fontStyles';
import color from '../../styles/lofftColorPallet.json';

const EmojiIcon = ({id, emojiIcon, value, toggle, selectedEmojis}) => {
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
        style={toggle ? styles.selectedEmojiIcon : styles.emojiIcon}>
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: color.Black[100],
    flexDirction: 'row',
    marginRight: 8,
    marginBottom: 16,
  },
  selectedEmojiIcon: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: '#B8A7FC',
    backgroundColor: color.Lavendar[100],
    flexDirction: 'row',
    marginRight: 8,
    marginBottom: 16,
  },
});

export default EmojiIcon;
