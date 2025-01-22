import {useCallback, useRef, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {baseUrl} from 'helpers/baseUrl';
import {toCamelCaseKeys} from 'helpers/toCamelCaseKeys';
import {sortMessages} from 'helpers/sortMessages';
import {Message} from 'reduxFeatures/chatrooms/types';
import {useFocusEffect} from '@react-navigation/native';

const useWebSocket = (chatroomId: number) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useFocusEffect(
    useCallback(() => {
      const setupWebSocket = async () => {
        try {
          const token = await EncryptedStorage.getItem('token');
          const wsBase = baseUrl.split('http:')[1];
          const wsUrl = token
            ? `ws:${wsBase}/cable?token=${encodeURIComponent(token)}`
            : `ws:${wsBase}/cable`;

          ws.current = new WebSocket(wsUrl);

          ws.current.onopen = () => {
            console.log('WebSocket connection opened');
            ws.current?.send(
              JSON.stringify({
                command: 'subscribe',
                identifier: JSON.stringify({
                  id: chatroomId,
                  channel: 'ChatroomsChannel',
                }),
              }),
            );
          };

          ws.current.onmessage = event => {
            const response = JSON.parse(event.data);
            console.log('Received WebSocket message:', response);

            if (response.message?.message) {
              const newMsg = toCamelCaseKeys(response.message.message);
              setMessages((prevMessages: any) =>
                sortMessages([...prevMessages, newMsg]),
              );
            }
          };

          ws.current.onclose = () => console.log('WebSocket connection closed');
          ws.current.onerror = error =>
            console.error('WebSocket error:', error);
        } catch (error) {
          console.error('Error setting up WebSocket:', error);
        }
      };

      if (chatroomId) {
        setupWebSocket();
      }

      // Clean up WebSocket connection when unfocused
      return () => {
        if (ws.current) {
          ws.current.close();
          console.log('WebSocket connection closed on unfocus');
        }
      };
    }, [chatroomId]),
  );

  return {messages, setMessages};
};

export default useWebSocket;
