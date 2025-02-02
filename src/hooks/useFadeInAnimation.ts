import {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

export const useFadeInAnimation = () => {
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeInAnim]);

  return {fadeInAnim};
};
