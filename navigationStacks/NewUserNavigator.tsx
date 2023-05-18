import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Find Lofft Journey
import NewUserJourney from '@Screens/registration/NewUserJourneyScreen';
import AboutYouFlatHuntScreen from '@Screens/registration/renter/AboutUserScreen';
import GenderIdentityScreen from '@Screens/registration/renter/GenderIdentityScreen';
import SelectCityScreen from '@Screens/registration/renter/SelectCityScreen';
import FinderBudgetScreen from '@Screens/registration/renter/FinderBudgetScreen';
import FlatFeaturesScreen from '@Screens/registration/renter/FlatFeaturesScreen';
import SelfDescribeScreen from '@Screens/registration/renter/SelfDescribeScreen';
import ConditionsOfUseScreen from '@Screens/registration/ConditionsOfUseScreen';
import LanguageSelectionScreen from '@Screens/registration/renter/LanguageSelectionScreen';

// Lessor Journey
import WhereIsFlatScreen from '@Screens/registration/lessor/WhereIsFlatScreen';
import FlatLengthAvailableScreen from '@Screens/registration/lessor/FlatLengthAvailableScreen';
import FlatPhotoUploadScreen from '@Screens/registration/lessor/FlatPhotoUploadScreen';

const NewUserNavigatorFlow = createNativeStackNavigator();

const NewUserNavigator = () => {
  return (
    <NewUserNavigatorFlow.Navigator>
      <NewUserNavigatorFlow.Group screenOptions={{headerShown: false}}>
        {/* Rentor Screens */}
        <NewUserNavigatorFlow.Screen
          name="NewUserJourney"
          component={NewUserJourney}
        />
        <NewUserNavigatorFlow.Screen
          name="LanguageSelectionScreen"
          component={LanguageSelectionScreen}
        />
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
          component={FinderBudgetScreen}
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
          name="FlatFeaturesScreen"
          component={FlatFeaturesScreen}
        />
        <NewUserNavigatorFlow.Screen
          name="AboutYouFlatHuntScreen"
          component={AboutYouFlatHuntScreen}
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
