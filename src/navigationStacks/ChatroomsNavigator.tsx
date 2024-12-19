import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens 📱
import ChatIndexScreen from 'screens/dashboard/ChatIndexScreen';

// Types 🦄
import { ChatroomsStackParamsList } from './types';
const Chatroom = createNativeStackNavigator<ChatroomsStackParamsList>();

const ChatroomsNavigator = () => {
  return(
     <Chatroom.Navigator screenOptions={{headerShown: false}}>
      <Chatroom.Screen
        name="ChatIndex"
        component={ChatIndexScreen}
      />
      </Chatroom.Navigator>
  );
};

export default ChatroomsNavigator;
