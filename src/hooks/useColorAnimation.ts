import {useRef, useMemo, useEffect, useState} from 'react';
import {Animated} from 'react-native';

const useColorAnimation = (color: string) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const anim = useMemo(() => new Animated.Value(0), [color]);
  const [finished, setFinished] = useState(true);
  const currentColor = useRef(color);
  const nextColor = useMemo(() => color, [color]);

  const animColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [currentColor.current, nextColor],
  });

  useEffect(() => {
    setFinished(false);
    Animated.spring(anim, {
      toValue: 1,



      useNativeDriver: false,
    }).start(() => {
      currentColor.current = nextColor;
      setFinished(true);
    });
  }, [color, anim, nextColor]);

  return [animColor, finished];
};

export default useColorAnimation;
