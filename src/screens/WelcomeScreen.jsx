import React, {useState} from 'react';
import {Text, StyleSheet, Button, View} from 'react-native';
import ScreenBackButton from '../components/coreComponents/CoreScreens/ScreenBackButton';
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
    <ScreenBackButton navigation={navigation} title="Back Button">
      <Text style={fontStyles.headerDisplay}>
        This is the Screen with a back button
      </Text>
      <InputFieldText placeholder="Password" type="password" />
      <InputFieldText placeholder="Search" type="search" />
      <InputFieldText placeholder="First Name" />
      <CheckBox value={checkbox} onPress={() => setCheckBox(!checkbox)} />
      <CustomSwitch
        value={switchV}
        onValueChange={() => setSwitchV(!switchV)}
      />
      <Button
        onPress={() => navigation.navigate('SignUpScreen')}
        title="Sign Up Screen =>"
      />
      <Button
        onPress={() => navigation.navigate('SignInScreen')}
        title="Sign In Screen =>"
      />
      <Button
        // onPress={() => navigation.navigate('SignUpScreen')}
        onPress={handleSignOut}
        title="Sign Out =>"
      />
    </ScreenBackButton>
  );
};

const styles = StyleSheet.create({});

export default WelcomeScreen;
