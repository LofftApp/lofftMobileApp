import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import ScreenBackButton from '../components/coreComponents/CoreScreens/ScreenBackButton';
import {fontStyles} from '../styles/fontStyles';
import InputFieldText from '../components/coreComponents/inputField/InputFieldText';
import CheckBox from '../components/coreComponents/interactiveElements/CheckBox';
import Switch from '../components/coreComponents/interactiveElements/Switch';
const WelcomeScreen = ({navigation}) => {
  const [checkbox, setCheckBox] = useState(false);
  return (
    <ScreenBackButton navigation={navigation} title="Back Button">
      <Text style={fontStyles.headerDisplay}>
        This is the Screen with a back button
      </Text>
      <InputFieldText placeholder="Password" type="password" />
      <InputFieldText placeholder="Search" type="search" />
      <InputFieldText placeholder="First Name" />
      <CheckBox value={checkbox} onPress={() => setCheckBox(!checkbox)} />
      <Switch />
    </ScreenBackButton>
  );
};

const styles = StyleSheet.create({});

export default WelcomeScreen;
