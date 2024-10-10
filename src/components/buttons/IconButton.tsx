import React, {useEffect, useRef} from 'react';
import {View, Text, Pressable, Animated, StyleSheet} from 'react-native';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';
import {size} from 'react-native-responsive-sizes';

const IconButton = ({
  text,
  icon,
  iconSize = size(30),
  onPress,
  style,
  animation,
  isActive,
}: any) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  console.log(isActive);
  useEffect(() => {
    console.log('useEffect');
    // Animate the button whenever isActive changes
    Animated.timing(animatedValue, {
      toValue: isActive ? 1 : 0, // Set animation based on the isActive state
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isActive, animatedValue]); // Ensure animation runs when `isActive` changes

  const handleOnPress = () => {
    if (animation) {
      // Start animation when the button is pressed
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 200,
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
    outputRange: [Color.White[100], Color.Lavendar[100]],
  });

  const animatedTextColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Color.Black[100], Color.White[100]],
  });

  const animatedBorderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Color.Black[100], Color.Lavendar[100]],
  });

  const backgroundColor = isActive ? Color.Lavendar[100] : Color.White[100];
  const textColor = isActive ? Color.White[100] : Color.Black[100];
  const borderColor = isActive ? Color.Lavendar[100] : Color.Black[100];

  return (
    <Pressable onPress={animation ? handleOnPress : onPress}>
      {animation ? (
        <Animated.View
          style={[
            style,
            styles.buttonContainer,
            styles.content,
            {backgroundColor: animatedBackgroundColor},
            {borderColor: animatedBorderColor},
          ]}>
          <LofftIcon name={icon} size={iconSize} color={Color.White[100]} />
          <Animated.Text
            style={[fontStyles.headerSmall, {color: animatedTextColor}]}>
            {text}
          </Animated.Text>
        </Animated.View>
      ) : (
        <View
          style={[
            style,
            styles.buttonContainer,
            styles.content,
            {backgroundColor, borderColor},
          ]}>
          <LofftIcon name={icon} size={iconSize} />
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
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: size(15),
    paddingVertical: size(30),
    gap: size(20),
  },
});

export default IconButton;
