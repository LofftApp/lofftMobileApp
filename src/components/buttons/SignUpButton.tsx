import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

// StyleSheet 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';

const SignUpButton = ({title, onPress}: any) => {
  return (
    <TouchableOpacity style={styles.signUpButton} onPress={onPress}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
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
