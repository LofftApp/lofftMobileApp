import React, {useRef} from 'react';
import {Animated, Pressable, StyleProp, ViewStyle} from 'react-native';
import {HeartDefault, HeartSaved} from 'assets'; // Assuming these are your SVG assets

type HeartButtonProps = {
  style?: StyleProp<ViewStyle>;
  favorite?: boolean;
  onPress: () => void;
};

const HeartButton = ({style, favorite, onPress}: HeartButtonProps) => {
  // Animation values for scaling
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  const handleOnPress = () => {
    // Run the animation when pressed
    Animated.sequence([
      // Scale up and reduce opacity briefly
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1.4, // Increase size
          duration: 70,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0.7, // Briefly reduce opacity
          duration: 70,
          useNativeDriver: true,
        }),
      ]),
      // Return to original size and opacity
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 70,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1, // Reset opacity to full after animation
          duration: 70,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    onPress(); // Toggle the favorite state
  };

  return (
    <Pressable style={style} onPress={handleOnPress}>
      <Animated.View
        style={{
          transform: [{scale: scaleValue}], // Apply scaling
          opacity: opacityValue, // Apply opacity change only during animation
        }}>
        {favorite ? <HeartSaved /> : <HeartDefault />}
      </Animated.View>
    </Pressable>
  );
};

export default HeartButton;
