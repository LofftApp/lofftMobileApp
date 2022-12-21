import React, {useState} from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';

// StyleSheet 🖼️
import Color from '../../styles/lofftColorPallet.json';

const SignUpButton = ({title}: any) => {
  return (
    <Pressable style={styles.signUpButton}>
      <Text style={styles.btnText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  signUpButton: {
    width: '100%',
    height: 48,
    backgroundColor: Color.Lavendar['100'],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  btnText: {
    fontSize: 18,
    color: Color.White[100],
    fontWeight: '600',
  },
});

export default SignUpButton;
