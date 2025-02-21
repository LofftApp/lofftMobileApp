import LofftIcon from 'components/lofftIcons/LofftIcon';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ToastTypes} from 'reduxFeatures/settings/settingsSlice';
import {useToast} from 'reduxFeatures/settings/useToast';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

type ToastProps = {
  condition: boolean;
  type: ToastTypes;
  message: string;
  position?: 'top' | 'bottom';
};

const Toast = ({condition, message, type, position = 'top'}: ToastProps) => {
  const {getStyles} = useToast({type, message, condition});
  const {bg, icon, iconColor} = getStyles(type);
  const insets = useSafeAreaInsets();
  const {width, height} = useWindowDimensions();
  const topPosition = position === 'top' ? height * 0.1 : height * 0.816;

  // Animated value for slide-up effect
  const translateY = useRef(new Animated.Value(100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (condition) {
      // First, bring the toast into view
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0, // Move into view
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1, // Fade in
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // After delay, slide and fade out
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(translateY, {
              toValue: 100, // Move out of view
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0, // Fade out
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start();
        }, 3000); // Stay visible for 3 seconds
      });
    }
  }, [condition, translateY, opacity]);

  return (
    <Animated.View
      style={[
        styles.messageContainer,
        {
          // backgroundColor: getStyles(type).bg,
          // width: width * 0.9,
          top: topPosition,
          // left: width * 0.05,
          // height: height * 0.1,
          // transform: [{translateY}],
          backgroundColor: bg,
          opacity,
          transform: [{translateY}],
        },
      ]}>
      <View style={styles.messageTextContainer}>
        {icon && <LofftIcon name={icon} size={size(20)} color={iconColor} />}
        <Text style={[fontStyles.bodySmall, {color: Color.Black[100]}]}>
          {message}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    position: 'absolute',

    alignSelf: 'center',
    padding: size(10),
    borderRadius: 12,
    zIndex: 1000,
    height: size(75),
    width: '90%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  messageTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size(10),
    justifyContent: 'center',
  },
});

export default Toast;
