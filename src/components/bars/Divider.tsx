import React from 'react';
import {StyleSheet, View} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import Color from 'styleSheets/lofftColorPallet.json';

const Divider = ({color}: {color?: string}) => {
  const borderColor = color
    ? {borderColor: color}
    : {borderColor: Color.Black[30]};
  return <View style={[styles.pageBreak, borderColor]} />;
};

const styles = StyleSheet.create({
  pageBreak: {
    borderBottomWidth: 1,
    paddingVertical: size(5),
  },
});

export default Divider;
