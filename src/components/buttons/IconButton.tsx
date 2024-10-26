import React, {useEffect, useRef} from 'react';
import {View, Text, Pressable, Animated, StyleSheet} from 'react-native';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';
import {size} from 'react-native-responsive-sizes';
import {IconButtonProps} from './types';

const IconButton = ({
  text,
  icon,
  iconSize = size(30),
  onPress,
  style,
  animation,
  isActive,
  color = Color.Lavendar[100],
}: IconButtonProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isActive ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isActive, animatedValue]);

  const handleOnPress = () => {
    if (animation) {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start(() => {
        onPress();
      });
    } else {
      onPress();
    }
  };

  const animatedBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Color.White[100], color],
  });

  const animatedTextColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Color.Black[100], Color.White[100]],
  });

  const animatedBorderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Color.Black[100], color],
  });

  const backgroundColor = isActive ? color : Color.White[100];
  const textColor = isActive ? Color.White[100] : Color.Black[100];
  const borderColor = isActive ? color : Color.Black[100];
  return (
    <Pressable onPress={animation ? handleOnPress : onPress}>
      {animation ? (
        <Animated.View
          style={[
            style ? style : styles.buttonContainer,
            {backgroundColor: animatedBackgroundColor},
            {borderColor: animatedBorderColor},
          ]}>
          {icon && (
            <LofftIcon
              name={icon}
              size={iconSize}
              color={isActive ? Color.White[100] : Color.Black[100]}
            />
          )}
          <Animated.Text
            style={[fontStyles.headerSmall, {color: animatedTextColor}]}>
            {text}
          </Animated.Text>
        </Animated.View>
      ) : (
        <View
          style={[
            style ? style : styles.buttonContainer,
            {backgroundColor, borderColor},
          ]}>
          {icon && (
            <LofftIcon
              name={icon}
              size={iconSize}
              color={isActive ? Color.White[100] : Color.Black[100]}
            />
          )}
          <Text style={[fontStyles.headerSmall, {color: textColor}]}>
            {text}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderColor: Color.Black[100],
    borderWidth: 2,
    borderRadius: 12,
    marginVertical: size(0),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: size(15),
    paddingVertical: size(30),
    gap: size(20),
  },
});

export default IconButton;
