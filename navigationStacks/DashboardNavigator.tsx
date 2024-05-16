import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Redux 🏪
import {useAppSelector} from '@ReduxCore/hooks';

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Navigator
import FlatSearchNavigator from './FlatSearchNavigator';

// Screens
import ApplicationIndexScreen from 'screens/dashboard/renter/ApplicationIndexScreen';
import UserScreen from 'screens/dashboard/renter/UserScreen';
// import SavedListingsScreen from 'screens/dashboard/renter/SavedScreens/SavedListingsScreen'; Commented out because it is not used
import AdminScreen from 'screens/admin/adminScreen';
import TempScreen from 'screens/dashboard/renter/TempScreen';

const Tab = createBottomTabNavigator();
const DashboardNavigator = () => {
  const admin = useAppSelector(state => state.user.admin);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName = 'settings';
          switch (route.name) {
            case 'search':
              iconName = 'search-sm';
              break;
            case 'favorite':
              iconName = 'list';
              break;
            case 'alerts':
              iconName = 'heart';
              break;
            case 'user':
              iconName = 'user';
              break;
            case 'admin':
              iconName = 'gaming-pad';
              break;
          }
          return <LofftIcon name={iconName} size={25} color={color} />;
        },
        tabBarActiveTintColor: Color.Lavendar[100],
        tabBarInActiveTintColor: Color.Black[30],
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="search"
        component={FlatSearchNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="favorite"
        component={ApplicationIndexScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="user"
        component={UserScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Ello"
        component={TempScreen}
        options={{headerShown: false}}
      />
      {admin ? (
        <Tab.Screen
          name="admin"
          component={AdminScreen}
          options={{headerShown: false}}
        />
      ) : null}
    </Tab.Navigator>
  );
};

export default DashboardNavigator;
