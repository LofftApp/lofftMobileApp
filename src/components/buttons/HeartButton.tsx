import React, {useRef} from 'react';
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Color from 'styleSheets/lofftColorPallet.json';
import {HeartDefault, HeartSaved} from 'assets';
import {size} from 'react-native-responsive-sizes';

type HeartButtonProps = {
  style?: StyleProp<ViewStyle>;
  favorite?: boolean;
  onPress?: () => void;
};

const HeartButton = ({
  style = styles.iconContainer,
  favorite,
  onPress,
}: HeartButtonProps) => {
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

const styles = StyleSheet.create({
  iconContainer: {
    paddingLeft: size(10),
    paddingRight: size(10),
    paddingTop: size(7),
    paddingBottom: size(7),
    borderRadius: 12,
    backgroundColor: Color.White[80],
  },
});

export default HeartButton;
