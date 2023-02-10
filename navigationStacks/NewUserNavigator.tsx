import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Find Lofft Journey
import StartJourney from '@Screens/StartJourney';
import AboutYouFlatHuntScreen from '@Screens/userJourneyScreens/renterJourney/AboutUserScreen';
import GenderIdentityScreen from '@Screens/userJourneyScreens/renterJourney/GenderIdentityScreen';
import SelectCityScreen from '@Screens/userJourneyScreens/renterJourney/SelectCityScreen';
import FinderBudgetScreen from '@Screens/userJourneyScreens/renterJourney/FinderBudgetScreen';
import FlatFeaturesScreen from '@Screens/userJourneyScreens/renterJourney/FlatFeaturesScreen';
import SelfDescribeScreen from '@Screens/userJourneyScreens/renterJourney/SelfDescribeScreen';
import UserConditionsScreen from '@Screens/UserConditionsScreen';

// Lessor Journey
import WhereIsFlatScreen from '@Screens/userJourneyScreens/lessorJourney/WhereIsFlatScreen';
import FlatLengthAvailableScreen from '@Screens/userJourneyScreens/lessorJourney/FlatLengthAvailableScreen';
import FlatPhotoUploadScreen from '@Screens/userJourneyScreens/lessorJourney/FlatPhotoUploadScreen';

const NewUserNavigatorFlow = createNativeStackNavigator();

const NewUserNavigator = () => {
  return (
    <NewUserNavigatorFlow.Navigator>
      <NewUserNavigatorFlow.Group screenOptions={{headerShown: false}}>
        {/* Rentor Screens */}
        <NewUserNavigatorFlow.Screen
          name="StartJourney"
          component={StartJourney}
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
          name="UserConditionsScreen"
          component={UserConditionsScreen}
        />
      </NewUserNavigatorFlow.Group>
    </NewUserNavigatorFlow.Navigator>
  );
};

export default NewUserNavigator;
