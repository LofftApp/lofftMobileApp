import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../../styles/lofftColorPallet.json';
import {Transition, animated} from 'react-spring';

const Switch = () => {
  const [value, setValue] = useState(false);
  return (
    <View
      style={[
        styles.switchContainer,
        {alignItems: value ? 'flex-end' : 'flex-start'},
      ]}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => setValue(!value)}>
        <View style={styles.ball} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    height: 32,
    width: 64,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.Lavendar[100],
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  ball: {
    width: 32,
    height: 32,
    backgroundColor: colors.Lavendar[100],
    borderRadius: 40,
  },
});

export default Switch;
