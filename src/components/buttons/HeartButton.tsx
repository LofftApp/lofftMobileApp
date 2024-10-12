import React, {useRef} from 'react';
import {Animated, Pressable, StyleProp, ViewStyle} from 'react-native';
import {HeartDefault, HeartSaved} from 'assets'; // Assuming these are your SVG assets

type HeartButtonProps = {
  style?: StyleProp<ViewStyle>;
  favorite?: boolean;
  onPress?: () => void;
};

const HeartButton = ({style, favorite, onPress}: HeartButtonProps) => {
  // Animation values for scaling
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  const handleOnPress = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1.4,
          duration: 70,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0.7,
          duration: 70,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 70,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 70,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
    if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable style={style} onPress={handleOnPress}>
      <Animated.View
        style={{
          transform: [{scale: scaleValue}],
          opacity: opacityValue,
        }}>
        {favorite ? <HeartSaved /> : <HeartDefault />}
      </Animated.View>
    </Pressable>
  );
};

export default HeartButton;
