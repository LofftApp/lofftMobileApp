import {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

export const useFadeInAnimation = (isReady?: boolean) => {
  const fadeInAnim = useRef(
    new Animated.Value(isReady === false ? 0 : 1),
  ).current;

  useEffect(() => {
    if (isReady === undefined || isReady) {
      fadeInAnim.setValue(0);
      Animated.timing(fadeInAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [isReady, fadeInAnim]);

  return {fadeInAnim};
};
