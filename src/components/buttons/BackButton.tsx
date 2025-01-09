import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import {height, size} from 'react-native-responsive-sizes';

// Stylesheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import { useTheme } from 'components/themes/ThemeContext';
import { createFontStyles } from 'styleSheets/fontStyles';

// Types 🏷️
import type {BackButtonProps} from './types';

const BackButton = ({
  onPress,
  title = '',
  close = false,
  style,
  neutral = false,
  absolute = false,
}: BackButtonProps) => {
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ?  Color.Dark : Color.Light;
  const fontStyles = createFontStyles(isDarkMode);

  const styles = StyleSheet.create({
    headerContainer: {
      marginLeft: size(5),
      maxHeight: height(75),
      flexDirection: 'row-reverse',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerContainerAbsolute: {
      position: 'absolute',
      top: size(52),
      left: size(10),
      right: 0,
      zIndex: 100,
    },

    headerContainClose: {
      marginTop: size(5),
      marginRight: size(5),
      maxHeight: height(75),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    header: {
      flex: 1,
      marginRight: size(40),
      textAlign: 'center',
    },
    headerRight: {
      flex: 1,
      marginLeft: size(77),
      textAlign: 'center',
    },
    neutral: {
      backgroundColor: colors.White[50],
    },
  });

  return (
    <View
      style={[
        absolute ? styles.headerContainerAbsolute : styles.headerContainer,
        style,
        close ? styles.headerContainClose : null,
      ]}>
      <Text
        style={[
          styles.header,
          fontStyles.headerSmall,
          close ? styles.headerRight : null,
        ]}>
        {title}
      </Text>
      <Pressable onPress={onPress}>
        {close ? (
          <LofftIcon
            name="x-close"
            size={35}
            color={neutral ? colors.Black[50] : colors.Lavendar[80]}
          />
        ) : (
          <LofftIcon
            name="chevron-left"
            size={35}
            color={neutral ? colors.Black[50] : colors.Lavendar[80]}
          />
        )}
      </Pressable>
    </View>
  );
};

export default BackButton;
