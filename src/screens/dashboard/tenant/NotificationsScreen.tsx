import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useGetUserQuery } from 'reduxFeatures/user/userApi';
import { useGetNotificationsQuery } from 'reduxFeatures/notifications/notificationApi';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';

const NotificationsScreen = () => {
  const { data: userData } = useGetUserQuery();
  const { data, refetch, isLoading } = useGetNotificationsQuery({
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    let ws:any;

    // WebSocket setup
    async function setupWebSocket() {
      try {
        const token = await EncryptedStorage.getItem('token');
        const wsUrl = token
          ? `ws://localhost:3000/cable?token=${encodeURIComponent(token)}`
          : 'ws://localhost:3000/cable';

        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
          console.log('WebSocket connection opened');
          ws.send(
            JSON.stringify({
              command: 'subscribe',
              identifier: JSON.stringify({
                id: userData?.id,
                channel: 'NotificationsChannel',
              }),
            })
          );
        };

        ws.onmessage = (event:any) => {
          console.log('Message received:', event.data);
          const response = JSON.parse(event.data);
          if (response.message) {
            const newNotification = response.message;
            console.log('New notification received:', newNotification);

            // Refetch notifications if a new one comes in
            refetch(); // This will fetch the latest notifications from the server
          }
        };

        ws.onclose = () => console.log('WebSocket connection closed');
        ws.onerror = (error:any) => console.error('WebSocket error:', error);

      } catch (error) {
        console.error('Error setting up WebSocket:', error);
      }
    }

    if (userData?.id) {
      setupWebSocket();
    }

    // Clean up WebSocket connection on component unmount
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [userData?.id, refetch]); // Re-run the WebSocket connection setup if userData changes

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <View style={styles.container}>
      <Text>Hello from NotificationsScreen</Text>
      {data?.notifications.length === 0 ? (
        <Text>No notifications available.</Text>
      ) : (
        data?.notifications.map((el) => (
          <Text key={el.id}>{el.id} - {el.message}</Text>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

export default NotificationsScreen;
