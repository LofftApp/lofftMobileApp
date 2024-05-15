import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LofftIcon from 'components/lofftIcons/LofftIcon';

// StyleSheet🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
import Color from '@StyleSheets/lofftColorPallet.json';

const IconButton = ({text, icon, iconSize = 20, onPress, style}: any) => {
  return (
    <TouchableOpacity style={[styles.buttonBorder, style]} onPress={onPress}>
      <View style={styles.content}>
        <LofftIcon name={icon} size={iconSize} />
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
