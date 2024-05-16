import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import LofftIcon from 'components/lofftIcons/LofftIcon';
// Stylesheets 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

const BackButton = ({
  onPress,
  title = '',
  close = false,
  style = {},
  neutral = false,
  navigation = false,
}: any) => {
  return (
    <View
      style={[
        styles.headerContainer,
        close ? styles.headerContainClose : null,
        style,
      ]}>
      <Text
        style={[
          styles.header,
          fontStyles.headerSmall,
          close ? styles.headerRight : null,
        ]}>
        {title}
      </Text>
      <TouchableOpacity onPress={onPress}>
        {close ? (
          <LofftIcon name="x-close" size={35} color={Color.Black[50]} />
        ) : (
          <LofftIcon
            name="chevron-left"
            size={35}
            color={neutral ? Color.Black[50] : Color.Lavendar[80]}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    maxHeight: 75,
    alignContent: 'flex-start',
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  headerContainClose: {
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 22,
  },
  header: {
    flex: 1,
    marginLeft: -48,
    marginTop: 12,
    textAlign: 'center',
  },
  headerRight: {
    marginLeft: 0,
    marginRight: -48,
  },
  neutral: {
    backgroundColor: Color.White[50],
  },
});

export default BackButton;
