import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Assets 🖼
import color from '../../../styles/lofftColorPallet.json';
// Stylesheets 🖌
import {fontStyles} from '../../../styles/fontStyles';

const BackButton = ({
  onPress,
  title = '',
  close = false,
  style = {},
  neutral = false,
}) => {
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
          <Icon name="close" size={35} color={color.Black[50]} />
        ) : (
          <Icon
            name="chevron-back"
            size={35}
            color={neutral ? color.Black[50] : color.Lavendar[80]}
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
    backgroundColor: color.White[50],
  },
});

export default BackButton;
