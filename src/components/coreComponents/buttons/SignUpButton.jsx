import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native';
import Color from '../../../styles/lofftColorPallet.json';

const SignUpButton = ({props}) => {
  return (
    <Pressable style={styles.signUpBtn}>
      <Text>{props}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  signUpBtn: {
    width: '100%',
    height: 48,
    backgroundColor: Color.Lavendar['100'],
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignUpButton;
