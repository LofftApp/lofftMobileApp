import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Find Lofft Journey
import NewUserJourney from 'screens/registration/NewUserJourneyScreen';
import AboutUserScreen from 'screens/registration/AboutUserScreen';
import GenderIdentityScreen from 'screens/registration/renter/GenderIdentityScreen';
import SelectCityScreen from 'screens/registration/renter/SelectCityScreen';
import BudgetScreen from 'screens/registration/renter/BudgetScreen';
import FlatFeaturesScreen from 'screens/registration/renter/FlatFeaturesScreen';
import SelfDescribeScreen from 'screens/registration/renter/SelfDescribeScreen';
import ConditionsOfUseScreen from 'screens/registration/ConditionsOfUseScreen';
import LanguageSelectionScreen from 'screens/registration/LanguageSelectionScreen';

// Lessor Journey
import WhereIsFlatScreen from 'screens/registration/lessor/WhereIsFlatScreen';
import FlatLengthAvailableScreen from 'screens/registration/lessor/FlatLengthAvailableScreen';
import FlatPhotoUploadScreen from 'screens/registration/lessor/FlatPhotoUploadScreen';

const NewUserNavigatorFlow = createNativeStackNavigator();

const NewUserNavigator = () => {
  return (
    <NewUserNavigatorFlow.Navigator>
      <NewUserNavigatorFlow.Group screenOptions={{headerShown: false}}>
        {/* initial screen */}
        <NewUserNavigatorFlow.Screen
          name="NewUserJourney"
          component={NewUserJourney}
        />
        {/* Renter Screens */}
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
        <NewUserNavigatorFlow.Screen
          name="SelfDescribeScreen"
          component={SelfDescribeScreen}
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
          name="FlatPhotoUploadScreen"
          component={FlatPhotoUploadScreen}
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
          name="AboutUserScreen"
          component={AboutUserScreen}
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