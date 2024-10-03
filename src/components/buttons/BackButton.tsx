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
      <Pressable
        onPress={() => {
          console.log('onPress clicked', onPress);
          onPress();
        }}>
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
    maxHeight: height(75),
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContainerAbsolute: {
    position: 'absolute',
    top: size(52),
    left: size(10),
    right: size(0),
    zIndex: 100,
  },

  headerContainClose: {
    flexDirection: 'row',
    alignContent: 'flex-end',
    right: size(12),
    top: size(6),
  },

  header: {
    flex: 1,
    // marginLeft: size(-48),
    left: size(22),
    textAlign: 'center',
  },
  headerRight: {
    // marginLeft: 0,
    // marginRight: size(-48),
  },
  neutral: {
    backgroundColor: Color.White[50],
  },
});

export default BackButton;
