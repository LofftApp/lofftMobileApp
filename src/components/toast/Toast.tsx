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
import { ToastTypes } from 'reduxFeatures/settings/types';
import {useToast} from 'reduxFeatures/settings/useToast';
import {fontStyles} from 'styleSheets/fontStyles';

type ToastProps = {
  condition: boolean;
  type: ToastTypes;
  message: string;
  position?: 'top' | 'bottom';
};

const Toast = ({condition, message, type, position = 'top'}: ToastProps) => {
  const {getToastStyles} = useToast({type, message, condition});
  const {bg, icon, iconColor} = getToastStyles(type);
  const {height} = useWindowDimensions();
  const top = position === 'top';

  const translateY = useRef(new Animated.Value(top ? 0 : height * 0.1)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (condition) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: top ? height * 0.04 : 0,
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
              toValue: top ? 0 : height * 0.1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
          ]).start();
        }, 3000);
      });
      return () => clearTimeout(timer);
    }
  }, [condition, translateY, opacity, height, top]);

  return (
    <Animated.View
      style={[
        styles.messageContainer,
        {
          top: top ? height * 0.1 : undefined,
          bottom: top ? undefined : height * 0.1,
          backgroundColor: bg,
          opacity,
          transform: [{translateY}],
        },
      ]}>
      <View style={styles.messageTextContainer}>
        {icon && <LofftIcon name={icon} size={size(25)} color={iconColor} />}
        <Text
          style={[fontStyles.headerTiny, styles.messageText]}
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
    elevation: 5,
  },
  messageTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size(10),
    justifyContent: 'center',
    padding: size(10),
    width: '100%',
    flexWrap: 'wrap',
  },

  messageText: {
    flexShrink: 1,
    flexWrap: 'wrap',
    textAlign: 'left',
    maxWidth: '95%',
  },
});

export default Toast;
