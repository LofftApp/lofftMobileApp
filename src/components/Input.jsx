import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import Color from '../styles/lofftColorPallet.json';

const Input = ({props}) => {
  return (
    <TextInput
      style={styles.textInput}
      placeholderTextColor={Color.Black['50']}
      placeholder={props}></TextInput>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    height: 48,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderColor: 'black',
    borderWidth: 2,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Input;
