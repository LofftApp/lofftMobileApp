import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Input from './Input';
import Color from '../styles/lofftColorPallet.json';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import SignUpButton from './coreComponents/buttons/SignUpButton';
import InputFieldText from '../components/coreComponents/inputField/InputFieldText';

const SignUpForm = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <View style={styles.textInputWrap}>
        <InputFieldText placeholder="Email" type="email" />
        <InputFieldText placeholder="Create password" type="password" />
        <InputFieldText placeholder="Repeat password" type="password" />
        <View style={styles.checkBoxWrap}>
          <BouncyCheckbox
            style={{color: 'black'}}
            iconStyle={{borderRadius: 4}}
            innerIconStyle={{
              borderRadius: 4,
              borderColor: Color.Lavendar['100'],
              borderWidth: 2,
            }}
            unfillColor="transparent"
            fillColor={Color.Lavendar['100']}
            onPress={isChecked => {}}
          />
          <Text style={{fontSize: 13}}>
            I agree to terms & conditions and Lofft’s privacy policy.
          </Text>
        </View>
      </View>
      <View style={styles.signUpButtonView}>
        <SignUpButton props="Sign up"></SignUpButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
    paddingBottom: 20,
  },
  textInputWrap: {
    width: '100%',
    borderColor: 'black',
  },
  checkBoxWrap: {
    width: '90%',
    flexDirection: 'row',
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  signUpButtonView: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});

export default SignUpForm;
0;
