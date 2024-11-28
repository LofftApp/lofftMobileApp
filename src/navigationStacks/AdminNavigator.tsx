import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AdminScreen from 'screens/admin/adminScreen';
import { AdminStackParamsList } from './types';

const Admin = createNativeStackNavigator<AdminStackParamsList>();
const AdminNavigator = () => {
  return (
    <Admin.Navigator screenOptions={{headerShown: false}}>
      <Admin.Screen name="AdminScreen" component={AdminScreen} />
    </Admin.Navigator>
  );
};

export default AdminNavigator;
