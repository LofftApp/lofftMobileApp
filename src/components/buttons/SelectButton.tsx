import React, {useState, useRef, useEffect} from 'react';

import {Text, StyleSheet, Pressable, Animated} from 'react-native';

// Styles 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
import Color from '@StyleSheets/lofftColorPallet.json';

const SelectButton = ({value, id, toggle, selectGender}: any) => {
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: Color.Black[100],
    flexDirction: 'row',
    marginRight: 8,
    marginBottom: 16,
  },
  buttonActive: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: Color.Lavendar[100],
    flexDirction: 'row',
    marginRight: 8,
    marginBottom: 16,
    backgroundColor: Color.Lavendar[10],
  },
});

export default SelectButton;
