import React, {useEffect} from 'react';
import {View, StyleSheet, Text, SafeAreaView, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//Redux
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
} from 'reduxFeatures/firebaseNotifications/fcmApi';

//Components
import NotificationCard from 'components/cards/NotificationCard';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';

//Styles
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

//Helpers
import {size} from 'react-native-responsive-sizes';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {
  LessorNotification,
  TenantNotification,
} from 'reduxFeatures/firebaseNotifications/types';

const NotificationsScreen = () => {
  const navigation = useNavigation();
  const {data, isLoading, isError, refetch} = useGetNotificationsQuery();
  const {data: currentUser} = useGetUserQuery();
  const isLessor = currentUser?.userType === 'lessor';
  const notifications = data?.notifications;
  console.log('notifications in notificationsScreen', notifications);
  const [markAsRead] = useMarkAsReadMutation();

  const unreadIds = notifications?.filter(n => !n.read).map(n => n.id);

  useEffect(() => {
    const triggerRead = navigation.addListener('blur', () => {
      if (unreadIds && unreadIds.length > 0) {
        markAsRead(unreadIds ?? []);
      }
    });

    return triggerRead;
  }, [navigation, unreadIds, markAsRead]);

  const handleTryAgain = () => {
    refetch();
  };

  if (isLoading) {
    return <LoadingComponent />;
  }
  if (isError) {
    return (
      <NotFoundComponent
        message="Error loading notifications"
        buttonValue="Try again"
        onPress={handleTryAgain}
      />
    );
  }
  return (
    <SafeAreaView style={[CoreStyleSheet.safeAreaViewShowContainer]}>
      <View style={CoreStyleSheet.headerContainer}>
        <Text style={fontStyles.headerLarge}>Notifications</Text>
      </View>
      <View style={styles.screenContainer}>
        {isLessor ? (
          <FlatList
            data={notifications as LessorNotification[]}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <NotificationCard notification={item} />}
          />
        ) : (
          <FlatList
            data={notifications as TenantNotification[]}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <NotificationCard notification={item} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: StyleSheet.flatten([
    CoreStyleSheet.screenContainer,
    {paddingVertical: size(10)},
  ]),

  coreButton: {width: '100%'},

  iconContainer: {
    zIndex: 100,
  },
  selectedButtonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: size(20),
    paddingBottom: size(10),
    gap: size(15),
  },
  maxNumberText: {
    color: Color.Mint[100],
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size(10),
  },
});

export default NotificationsScreen;
