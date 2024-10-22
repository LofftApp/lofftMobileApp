import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Find Lofft Journey
import ConfirmEmailScreen from 'screens/registration/ConfirmEmailScreen';
import NewUserJourney from 'screens/registration/NewUserJourneyScreen';
import AboutUserFlatScreen from 'screens/registration/AboutUserFlatScreen';
import GenderIdentityScreen from 'screens/registration/tenant/GenderIdentityScreen';
import SelectCityScreen from 'screens/registration/tenant/SelectCityScreen';
import BudgetScreen from 'screens/registration/tenant/BudgetScreen';
import FlatFeaturesScreen from 'screens/registration/tenant/FlatFeaturesScreen';
import ConditionsOfUseScreen from 'screens/registration/ConditionsOfUseScreen';
import LanguageSelectionScreen from 'screens/registration/LanguageSelectionScreen';

// Lessor Journey
import WhereIsFlatScreen from 'screens/registration/lessor/WhereIsFlatScreen';
import FlatLengthAvailableScreen from 'screens/registration/lessor/FlatLengthAvailableScreen';
import NameProfileScreen from 'screens/registration/NameProfileScreen';
import FlatImageUploadScreen from 'screens/registration/FlatImageUploadScreen';
import SelfFlatDescribeScreen from 'screens/registration/tenant/SelfFlatDescribeScreen';
import FlatDetailsScreen from 'screens/registration/lessor/FlatDetailsScreen';

const NewUserNavigatorFlow = createNativeStackNavigator();

const NewUserNavigator = () => {
  return (
    <NewUserNavigatorFlow.Navigator>
      <NewUserNavigatorFlow.Group screenOptions={{headerShown: false}}>
        {/* Intial screen after sign up */}
        <NewUserNavigatorFlow.Screen
          name="ConfirmEmail"
          component={ConfirmEmailScreen}
        />
        {/* Which journey screen */}
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
          component={FlatImageUploadScreen}
        />
        <NewUserNavigatorFlow.Screen
          name="FlatDetailsScreen"
          component={FlatDetailsScreen}
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
          name="SelfFlatDescribeScreen"
          component={SelfFlatDescribeScreen}
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
