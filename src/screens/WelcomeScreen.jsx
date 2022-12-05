import React, {useState} from 'react';
import {Text, StyleSheet, Button} from 'react-native';
import PrimaryScreen from '../components/coreComponents/CoreScreens/PrimaryScreen';
import {fontStyles} from '../styles/fontStyles';
import InputFieldText from '../components/coreComponents/inputField/InputFieldText';
import CheckBox from '../components/coreComponents/interactiveElements/CheckBox';
import CustomSwitch from '../components/coreComponents/interactiveElements/CustomSwitch';
import auth from '@react-native-firebase/auth';

const WelcomeScreen = ({navigation}) => {
  const [checkbox, setCheckBox] = useState(true);
  const [switchV, setSwitchV] = useState(false);
  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <PrimaryScreen navigation={navigation} title="Back Button">
      <Text>Hello</Text>
    </PrimaryScreen>
  );
};

const styles = StyleSheet.create({});

export default WelcomeScreen;
