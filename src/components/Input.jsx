import React from 'react';
import {StyleSheet, TextInput, Image, View} from 'react-native';
import Color from '../styles/lofftColorPallet.json';

const Input = ({props}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholderTextColor={Color.Black['50']}
        placeholder={props} />
      <Image
        style={styles.icon}
        source={require('../assets/icons/Visible-icon.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    marginBottom: 8,
  },
  textInput: {
    width: '100%',
    height: 48,
    padding: 16,
    borderRadius: 12,
    borderColor: 'black',
    borderWidth: 2,
    fontSize: 16,
    fontWeight: '500',
  },
  icon: {
    position: 'absolute',
    right: 18,
  },
});

export default Input;
