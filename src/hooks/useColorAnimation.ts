import {useRef, useMemo, useEffect, useState} from 'react';
import {Animated, Easing} from 'react-native';

const useColorAnimation = (color: string) => {
  const anim = useMemo(() => new Animated.Value(0), []);
  const [finished, setFinished] = useState(true);
  const currentColor = useRef(color);
  const nextColor = useMemo(() => color, [color]);

  const animColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [currentColor.current, nextColor],
  });

  useEffect(() => {
    setFinished(false);
    Animated.timing(anim, {
      toValue: 1,
      duration: 800,
      easing: Easing.cubic,

      useNativeDriver: false,
    }).start(() => {
      currentColor.current = nextColor;
      setFinished(true);
    });
  }, [color, anim, nextColor]);

  return [animColor, finished];
};

export default useColorAnimation;
