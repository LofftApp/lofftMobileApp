import {HeartDefault, HeartSaved} from 'assets';
import React from 'react';
import {Pressable, PressableProps, StyleProp, ViewStyle} from 'react-native';
type HeartButtonProps = {
  style?: StyleProp<ViewStyle>;
  favorite?: boolean;
  onPress?: () => void;
};

const HeartButton = ({style, favorite, onPress}: HeartButtonProps) => {
  return (
    <Pressable style={style} onPress={onPress}>
      {favorite ? <HeartSaved /> : <HeartDefault />}
    </Pressable>
  );
};

export default HeartButton;
