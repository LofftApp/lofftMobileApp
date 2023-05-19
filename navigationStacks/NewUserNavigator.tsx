import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Find Lofft Journey
import NewUserJourney from '@Screens/registration/NewUserJourneyScreen';
import AboutYouFlatHuntScreen from '@Screens/registration/renter/AboutUserScreen';
import RenterGenderIdentityScreen from '@Screens/registration/RenterGenderIdentityScreen';
import RenterSelectCityScreen from '@Screens/registration/RenterSelectCityScreen';
import RenterBudgetScreen from '@Screens/registration/RenterBudgetScreen';
import FlatFeaturesScreen from '@Screens/registration/FlatFeaturesScreen';
import SelfDescribeScreen from '@Screens/registration/SelfDescribeScreen';
import ConditionsOfUseScreen from '@Screens/registration/ConditionsOfUseScreen';
import LanguageSelectionScreen from '@Screens/registration/LanguageSelectionScreen';

// Lessor Journey
import LessorWhereIsFlatScreen from '@Screens/registration/LessorWhereIsFlatScreen';
import LessorFlatAvailableScreen from '@Screens/registration/LessorFlatAvailableScreen';
import LessorFlatDescriptionScreen from '@Screens/registration/LessorFlatDescriptionScreen';

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
          component={RenterGenderIdentityScreen}
        />
        <NewUserNavigatorFlow.Screen
          name="SelectCityScreen"
          component={RenterSelectCityScreen}
        />
        <NewUserNavigatorFlow.Screen
          name="FinderBudgetScreen"
          component={RenterBudgetScreen}
        />
        <NewUserNavigatorFlow.Screen
          name="SelfDescribeScreen"
          component={SelfDescribeScreen}
        />
        {/* Lessor Screens */}
        <NewUserNavigatorFlow.Screen
          name="WhereIsFlatScreen"
          component={LessorWhereIsFlatScreen}
        />
        <NewUserNavigatorFlow.Screen
          name="FlatLengthAvailableScreen"
          component={LessorFlatAvailableScreen}
        />
        <NewUserNavigatorFlow.Screen
          name="FlatPhotoUploadScreen"
          component={LessorFlatDescriptionScreen}
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
