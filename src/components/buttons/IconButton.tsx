import React, {useEffect, useRef} from 'react';
import {View, Text, Pressable, Animated, StyleSheet} from 'react-native';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import Color from 'styleSheets/lofftColorPallet.json';
import {size} from 'react-native-responsive-sizes';
import {IconButtonProps} from './types';
import { createFontStyles } from 'styleSheets/fontStyles';
import { useSelector } from 'react-redux';
import { RootState } from 'reduxCore/store';

const IconButton = ({
  text,
  icon,
  iconSize = size(30),
  onPress,
  style,
  animation,
  isActive,
  color,
}: IconButtonProps) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const fontStyles = createFontStyles(isDarkMode);
  const colors = isDarkMode ? Color.Dark : Color.Light;
  color = colors.Lavendar[100];
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
    outputRange: [colors.White[100], color],
  });

  const animatedTextColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.Black[100], colors.White[100]],
  });

  const animatedBorderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.Black[100], color],
  });

  const backgroundColor = isActive ? color : colors.White[100];
  const textColor = isActive ? colors.White[100] : colors.Black[100];
  const borderColor = isActive ? color : colors.Black[100];

  const styles = StyleSheet.create({
    buttonContainer: {
      borderColor: colors.Black[100],
      borderWidth: 2,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: size(15),
      paddingVertical: size(30),
      gap: size(20),
    },
  });

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
              color={isActive ? colors.White[100] : colors.Black[100]}
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
              color={isActive ? colors.White[100] : colors.Black[100]}
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

export default IconButton;
