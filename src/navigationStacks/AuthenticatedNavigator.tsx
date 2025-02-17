import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Navigators 🧭
import NewUserNavigator from 'navigationStacks/NewUserNavigator';
import TenantNavigator from 'navigationStacks/TenantNavigator';
import LessorNavigator from 'navigationStacks/LessorNavigator';
import AdminNavigator from './AdminNavigator';

//Types
import type {RootStackParamsList} from './types';
import {UserType} from 'reduxFeatures/user/types';

type AuthenticatedNavigatorProps = {
  userType?: UserType;
  admin?: boolean;
};

const AuthStack = createNativeStackNavigator<RootStackParamsList>();
const AuthenticatedNavigator = ({
  userType,
  admin,
}: AuthenticatedNavigatorProps) => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      {admin && (
        <AuthStack.Screen name="AdminStack" component={AdminNavigator} />
      )}
      {userType === UserType.NEWUSER && (
        <AuthStack.Screen name="NewUserStack" component={NewUserNavigator} />
      )}
      {userType === UserType.LESSOR && (
        <AuthStack.Screen
          name="LessorDashboardStack"
          component={LessorNavigator}
        />
      )}
      {userType === UserType.TENANT && (
        <AuthStack.Screen
          name="TenantDashboardStack"
          component={TenantNavigator}
        />
      )}
    </AuthStack.Navigator>
  );
};

export default AuthenticatedNavigator;
