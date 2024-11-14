import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// Navigators 🧭
import NewUserNavigator from 'navigationStacks/NewUserNavigator';
import TenantNavigator from 'navigationStacks/TenantNavigator';
import LessorNavigator from 'navigationStacks/LessorNavigator';

//Screens
import AdminScreen from 'screens/admin/adminScreen';

//Types
import type {RootStackParamsList} from './types';

type AuthenticatedNavigatorProps = {
  userType?: string;
  admin?: boolean;
};

const AuthStack = createNativeStackNavigator<RootStackParamsList>();
const AuthenticatedNavigator = ({
  userType,
  admin,
}: AuthenticatedNavigatorProps) => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      {admin && <AuthStack.Screen name="AdminStack" component={AdminScreen} />}
      {userType === 'newuser' && (
        <AuthStack.Screen name="NewUserStack" component={NewUserNavigator} />
      )}
      {userType === 'lessor' && (
        <AuthStack.Screen
          name="LessorDashboardStack"
          component={LessorNavigator}
        />
      )}
      {userType === 'tenant' && (
        <AuthStack.Screen
          name="TenantDashboardStack"
          component={TenantNavigator}
        />
      )}
    </AuthStack.Navigator>
  );
};

export default AuthenticatedNavigator;
