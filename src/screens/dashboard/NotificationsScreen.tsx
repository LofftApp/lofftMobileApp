import {useNavigation} from '@react-navigation/native';
import NotificationCard from 'components/cards/NotificationCard';
import React, {useEffect} from 'react';
import {View, StyleSheet, Text, SafeAreaView, FlatList} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
} from 'reduxFeatures/firebaseNotifications/fcmApi';

//Styles
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';
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
  const navigation = useNavigation();
  const {data} = useGetNotificationsQuery();
  const notifications = data?.notifications;
  const [markAsRead] = useMarkAsReadMutation();

  useEffect(() => {
    const unreadIds = notifications?.filter(n => !n.read).map(n => n.id);
    console.log('unreadIds', unreadIds);
    if (unreadIds && unreadIds.length > 0) {
      markAsRead(unreadIds ?? []);
    }
  }, [notifications, markAsRead]);
  return (
    <SafeAreaView style={[CoreStyleSheet.safeAreaViewShowContainer]}>
      <View style={CoreStyleSheet.headerContainer}>
        <Text style={fontStyles.headerLarge}>Notifications</Text>
      </View>
      <View style={styles.screenContainer}>
        <FlatList
          data={dummyData}
          keyExtractor={item => item.id.toString()}
          renderItem={() => <NotificationCard />}
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
