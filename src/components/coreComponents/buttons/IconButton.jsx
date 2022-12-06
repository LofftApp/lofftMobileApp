import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {fontStyles} from '../../../styles/fontStyles';
import Color from '../../../styles/lofftColorPallet.json';
import Icon from 'react-native-vector-icons/Ionicons';

const IconButton = ({text, icon, iconSize = 20, onPress}) => {
  return (
    <TouchableOpacity style={styles.buttonBorder}>
      <View style={styles.content}>
        <Icon name={icon} size={iconSize} />
        <Text style={[fontStyles.headerSmall, styles.text]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBorder: {
    borderColor: Color.Black[100],
    borderWidth: 2,
    borderRadius: 12,
    marginVertical: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 25,
  },
  text: {
    marginLeft: 15,
  },
});

export default IconButton;
