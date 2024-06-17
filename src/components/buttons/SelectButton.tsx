import React, {useRef, useEffect} from 'react';

import {Text, StyleSheet, Pressable, Animated} from 'react-native';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

// Helper 🥷🏻
import {size} from 'react-native-responsive-sizes';

const SelectButton = ({
  value,
  id,
  toggle,
  selectGender,
}: {
  value: string;
  id: number;
  toggle: boolean;
  selectGender: (id: number) => void;
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
          selectGender(id);
        }}
        style={toggle ? styles.buttonActive : styles.button}
        disabled={toggle}>
        <Text style={fontStyles.headerSmall}>{value}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: size(12),
    paddingHorizontal: size(16),
    borderWidth: size(2),
    borderRadius: size(12),
    borderColor: Color.Black[100],
    flexDirection: 'row',
    marginRight: size(8),
    marginBottom: size(16),
  },
  buttonActive: {
    paddingVertical: size(12),
    paddingHorizontal: size(16),
    borderWidth: size(2),
    borderRadius: size(12),
    borderColor: Color.Lavendar[100],
    flexDirection: 'row',
    marginRight: size(8),
    marginBottom: size(16),
    backgroundColor: Color.Lavendar[10],
  },
});

export default SelectButton;
