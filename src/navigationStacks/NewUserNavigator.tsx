import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Find Lofft Journey
import ConfirmEmailScreen from 'screens/registration-edit/shared/ConfirmEmailScreen';
import NewUserJourney from 'screens/registration-edit/shared/NewUserJourneyScreen';
import AboutUserFlatScreen from 'screens/registration-edit/shared/AboutUserFlatScreen';
import GenderIdentityScreen from 'screens/registration-edit/tenant/GenderIdentityScreen';
import SelectCityScreen from 'screens/registration-edit/tenant/SelectCityScreen';
import BudgetScreen from 'screens/registration-edit/tenant/BudgetScreen';
import FlatFeaturesScreen from 'screens/registration-edit/shared/FlatFeaturesScreen/FlatFeaturesScreen';
import ConditionsOfUseScreen from 'screens/registration-edit/shared/ConditionsOfUseScreen';
import LanguageSelectionScreen from 'screens/registration-edit/shared/LanguageSelectionScreen';

// Lessor Journey
import WhereIsFlatScreen from 'screens/registration-edit/lessor/WhereIsFlatScreen';
import FlatLengthAvailableScreen from 'screens/registration-edit/lessor/FlatLengthAvailableScreen';
import NameProfileScreen from 'screens/registration-edit/shared/NameProfileScreen';
import FlatUserImageUploadScreen from 'screens/registration-edit/shared/FlatImageUploadScreen';
import FlatDetailsScreen from 'screens/registration-edit/lessor/FlatDetailsScreen';
import SafeSpaceForScreen from 'screens/registration-edit/tenant/SafeSpaceForScreen';
import UserImageUploadScreen from 'screens/registration-edit/shared/UserImageUploadScreen';
import FlatDescribeScreen from 'screens/registration-edit/lessor/FlatDescribeScreen';
import UserDescribeScreen from 'screens/registration-edit/tenant/UserDescribeScreen';
import {NewUserStackParamsList} from './types';

const NewUserNavigatorFlow =
  createNativeStackNavigator<NewUserStackParamsList>();

const NewUserNavigator = () => {
  return (
    <NewUserNavigatorFlow.Navigator>
      <NewUserNavigatorFlow.Group screenOptions={{headerShown: false}}>
        {/* Intial screen after sign up */}
        <NewUserNavigatorFlow.Screen
          name="ConfirmEmail"
          component={ConfirmEmailScreen}
        />

        <NewUserNavigatorFlow.Screen
          name="NewUserJourney"
          component={NewUserJourney}
        />

        {/* tenant Screens */}
        <NewUserNavigatorFlow.Screen
          name="GenderIdentityScreen"
          component={GenderIdentityScreen}
        />
        <NewUserNavigatorFlow.Screen
          name="SelectCityScreen"
          component={SelectCityScreen}
        />
        <NewUserNavigatorFlow.Screen
          name="FinderBudgetScreen"
          component={BudgetScreen}
        />
        {/* Lessor Screens */}
        <NewUserNavigatorFlow.Screen
          name="WhereIsFlatScreen"
          component={WhereIsFlatScreen}
        />
        <NewUserNavigatorFlow.Screen
          name="FlatLengthAvailableScreen"
          component={FlatLengthAvailableScreen}
        />
        <NewUserNavigatorFlow.Screen
          name="FlatImageUploadScreen"
          component={FlatUserImageUploadScreen}
        />
        <NewUserNavigatorFlow.Screen
          name="FlatDetailsScreen"
          component={FlatDetailsScreen}
        />
        <NewUserNavigatorFlow.Screen
          name="FlatDescribeScreen"
          component={FlatDescribeScreen}
        />
        <NewUserNavigatorFlow.Screen
          name="SafeSpaceForScreen"
          component={SafeSpaceForScreen}
        />

        {/* Shared screens */}

        <NewUserNavigatorFlow.Screen
          name="LanguageSelectionScreen"
          component={LanguageSelectionScreen}
        />
        <NewUserNavigatorFlow.Screen
          name="FlatFeaturesScreen"
          component={FlatFeaturesScreen}
        />
        <NewUserNavigatorFlow.Screen
          name="AboutUserFlatScreen"
          component={AboutUserFlatScreen}
        />
        <NewUserNavigatorFlow.Screen
          name="UserDescribeScreen"
          component={UserDescribeScreen}
        />

        <NewUserNavigatorFlow.Screen
          name="UserImageUploadScreen"
          component={UserImageUploadScreen}
        />
        <NewUserNavigatorFlow.Screen
          name="NameProfileScreen"
          component={NameProfileScreen}
        />
        <NewUserNavigatorFlow.Screen
          name="ConditionsOfUseScreen"
          component={ConditionsOfUseScreen}
        />
      </NewUserNavigatorFlow.Group>
    </NewUserNavigatorFlow.Navigator>
  );
};

export default NewUserNavigator;
