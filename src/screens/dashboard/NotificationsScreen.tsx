import React, {useEffect} from 'react';
import {View, StyleSheet, Text, SafeAreaView, FlatList} from 'react-native';
//Redux
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
} from 'reduxFeatures/firebaseNotifications/fcmApi';

//Components
import NotificationCard from 'components/cards/NotificationCard';
import {size} from 'react-native-responsive-sizes';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';

//Styles
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';
import {Notification} from 'reduxFeatures/firebaseNotifications/types';

const dummyData = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
  {
    id: 9,
  },
  {
    id: 10,
  },
  {
    id: 11,
  },
  {
    id: 12,
  },
];
const NotificationsScreen = () => {
  const {data, isLoading, isError, refetch} = useGetNotificationsQuery();
  const notifications = data?.notifications;
  // console.log('notifications in notificationsScreen', notifications);
  const [markAsRead] = useMarkAsReadMutation();
  const validNotifications = notifications?.filter(
    n => n.title !== null && n.body !== null,
  );
  console.log('validNotifications in tenant', validNotifications);

  useEffect(() => {
    const unreadIds = notifications?.filter(n => !n.read).map(n => n.id);
    console.log('unreadIds', unreadIds);
    if (unreadIds && unreadIds.length > 0) {
      markAsRead(unreadIds ?? []);
    }
  }, [notifications, markAsRead]);

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
        <FlatList
          data={validNotifications}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <NotificationCard notification={item} />}
        />
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
