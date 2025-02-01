import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import SettingsScreen from 'screens/profile/SettingsScreen';

//Types
import type {SettingsStackParamsList} from './types';
import AppLanguageScreen from 'screens/profile/AppLanguageScreen';
import SwitchUserScreen from 'screens/profile/SwitchUserScreen';
import TermsAndConditionsScreen from 'screens/profile/TermsAndConditionsScreen';
import SendFeedbackScreen from 'screens/profile/SendFeedbackScreen';
import GetTokensScreen from 'screens/profile/GetTokensScreen';
import EditProfileScreen from 'screens/profile/EditProfileScreen';
import EditAdvertScreen from 'screens/profile/EditAdvertScreen';
import NewUserNavigator from './NewUserNavigator';

const Settings = createNativeStackNavigator<SettingsStackParamsList>();
const SettingsNavigator = () => {
  return (
    <Settings.Navigator screenOptions={{headerShown: false}}>
      <Settings.Screen name="SettingsScreen" component={SettingsScreen} />
      <Settings.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Settings.Screen name="EditAdvertScreen" component={EditAdvertScreen} />

      <Settings.Screen name="GetTokensScreen" component={GetTokensScreen} />

      <Settings.Screen name="AppLanguageScreen" component={AppLanguageScreen} />
      <Settings.Screen
        name="SendFeedbackScreen"
        component={SendFeedbackScreen}
      />

      <Settings.Screen
        name="TermsAndConditionsScreen"
        component={TermsAndConditionsScreen}
      />

      <Settings.Screen name="SwitchUserScreen" component={SwitchUserScreen} />
      <Settings.Screen
        name="NewUserNavigator"
        component={NewUserNavigator}
        options={{headerShown: false}}
      />
    </Settings.Navigator>
  );
};

export default SettingsNavigator;
