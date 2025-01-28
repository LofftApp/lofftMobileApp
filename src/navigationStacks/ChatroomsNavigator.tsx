import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens 📱
import ChatIndexScreen from 'screens/dashboard/ChatIndexScreen';
import ChatShowScreen from 'screens/dashboard/ChatShowScreen';
// Types 🦄
import type { ChatroomsStackParamsList } from './types';

const Chatroom = createNativeStackNavigator<ChatroomsStackParamsList>();

const ChatroomsNavigator = () => {
  return(
     <Chatroom.Navigator screenOptions={{ headerShown: false }}>
      <Chatroom.Screen
        name="ChatIndex"
        component={ChatIndexScreen}
      />
      <Chatroom.Screen
        name="ChatShow"
        component={ChatShowScreen}
      />

    </Chatroom.Navigator>
  );
};

export default ChatroomsNavigator;
