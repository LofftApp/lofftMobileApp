import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Color from 'styleSheets/lofftColorPallet.json';
// Redux
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

// Components
import {CoreButton} from 'components/buttons/CoreButton';

// Styles
import { createFontStyles } from 'styleSheets/fontStylesTest';
import {useSignOutMutation} from 'reduxFeatures/auth/authApi';
import {useTheme} from 'components/themes/ThemeContext';
import CustomSwitch from 'components/buttons/CustomSwitch';

const UserScreen = () => {
  const {data} = useGetUserQuery();
  const [signOut] = useSignOutMutation();

  const userCredits = data?.credits;

  const {isDarkMode, toggleTheme}: any = useTheme();
  const fontStyles = createFontStyles(isDarkMode);
  const colors = isDarkMode ? Color.Dark : Color.Light;

  const handleSignOut = () => {
    signOut();
  };

  const handleTheme = () => {
    toggleTheme()
  };

  const styles = StyleSheet.create({
    userScreenContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.White['100'],
    },
    coreButtonStyle: {
      width: '40%',
      marginTop: 20,
    },
  });

  return (
    <View style={styles.userScreenContainer}>
      <Text style={{color: isDarkMode ? 'white' : 'black'}}>Hi from User Screen 👋</Text>
      <Text style={fontStyles.headerLarge}>Current Credits: {userCredits}</Text>
      <CustomSwitch value={isDarkMode} onValueChange={handleTheme} />
      <CoreButton
        value="Sign Out"
        style={styles.coreButtonStyle}
        onPress={handleSignOut}
      />

    </View>
  );
};

export default UserScreen;
