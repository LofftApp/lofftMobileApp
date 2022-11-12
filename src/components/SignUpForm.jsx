import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import Input from './Input';
import Color from '../styles/lofftColorPallet.json';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import SignUpButton from './coreComponents/buttons/SignUpButton';

const SignUpForm = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <View style={styles.textInputWrap}>
        <Input props="Email"></Input>
        <Input props="Create password"></Input>
        <Input props="Repeat password"></Input>
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
            onPress={(isChecked: boolean) => {}}
          />
          <Text style={{fontSize: 13}}>
            I agree to terms & conditions and Lofft’s privacy policy.
          </Text>
        </View>
      </View>
      <SignUpButton props="Sign Up"></SignUpButton>
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
    width: '85%',
    flexDirection: 'row',
    paddingTop: 15,
    paddingHorizontal: 10,
  },
});

export default SignUpForm;
0;
