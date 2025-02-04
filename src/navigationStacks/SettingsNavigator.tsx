import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import SettingsScreen from 'screens/settings/SettingsScreen';

//Types
import type {SettingsStackParamsList} from './types';
import AppLanguageScreen from 'screens/settings/AppLanguageScreen';
import SwitchUserScreen from 'screens/settings/SwitchUserScreen';
import TermsAndConditionsScreen from 'screens/settings/TermsAndConditionsScreen';
import SendFeedbackScreen from 'screens/settings/SendFeedbackScreen';
import GetTokensScreen from 'screens/settings/GetTokensScreen';
import EditProfileScreen from 'screens/settings/EditProfileScreen';
import EditAdvertScreen from 'screens/settings/EditAdvertScreen';
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
