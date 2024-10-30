import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import {height, size} from 'react-native-responsive-sizes';

// Stylesheets 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

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
            color={neutral ? Color.Black[50] : Color.Lavendar[80]}
          />
        ) : (
          <LofftIcon
            name="chevron-left"
            size={35}
            color={neutral ? Color.Black[50] : Color.Lavendar[80]}
          />
        )}
      </Pressable>
    </View>
  );
};

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
    backgroundColor: Color.White[50],
  },
});

export default BackButton;
