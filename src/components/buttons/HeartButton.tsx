import React, {useEffect, useRef} from 'react';
import {Animated, Pressable, StyleProp, ViewStyle} from 'react-native';
import {HeartDefault, HeartSaved} from 'assets'; // Assuming these are your SVG assets

type HeartButtonProps = {
  style?: StyleProp<ViewStyle>;
  favorite?: boolean;
  onPress: () => void;
};

const HeartButton = ({style, favorite, onPress}: HeartButtonProps) => {
  // Animation values for scaling and opacity
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  const handleOnPress = () => {
    // Run the animation when pressed
    Animated.sequence([
      // Scale up the heart when clicked
      Animated.timing(scaleValue, {
        toValue: 1.2, // Increase size
        duration: 100,
        useNativeDriver: true,
      }),
      // Scale back down to normal size
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Change the opacity during the toggle
    Animated.timing(opacityValue, {
      toValue: favorite ? 0.7 : 1, // Fade effect
      duration: 100,
      useNativeDriver: true,
    }).start();

    onPress(); // Toggle the favorite state
  };

  return (
    <Pressable style={style} onPress={handleOnPress}>
      <Animated.View
        style={{
          transform: [{scale: scaleValue}], // Apply scaling
          opacity: opacityValue, // Apply opacity change
        }}>
        {favorite ? <HeartSaved /> : <HeartDefault />}
      </Animated.View>
    </Pressable>
  );
};

export default HeartButton;
