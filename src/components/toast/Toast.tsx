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
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (condition) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: height * 0.04,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => {
        timer = setTimeout(() => {
          Animated.parallel([
            Animated.timing(translateY, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start();
        }, 3000);
      });
      return () => clearTimeout(timer);
    }
  }, [condition, translateY, opacity, height]);

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
        {icon && <LofftIcon name={icon} size={size(25)} color={iconColor} />}
        <Text
          style={[fontStyles.bodySmall, styles.messageText]}
          numberOfLines={2}>
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

    width: '90%',
    height: 'auto',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  messageTextContainer: {
    flexDirection: 'row', // Ensure icon and text are side by side
    alignItems: 'center', // Align icon and text vertically
    gap: size(10), // Space between icon and text
    justifyContent: 'center',
    padding: size(10),
    width: '100%', // Make sure it takes full width
    flexWrap: 'wrap', // Enable wrapping
  },

  messageText: {
    flexShrink: 1, // Allows text to shrink instead of overflowing
    flexWrap: 'wrap', // Ensure wrapping
    textAlign: 'left', // Align text properly
    maxWidth: '95%', // Prevents text from stretching too far
  },
});

export default Toast;
