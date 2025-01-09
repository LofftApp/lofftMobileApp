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
import Color from 'styleSheets/lofftColorPallet.json';

//Helpers
import {size} from 'react-native-responsive-sizes';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {
  LessorNotification,
  TenantNotification,
} from 'reduxFeatures/firebaseNotifications/types';
import { useTheme } from 'components/themes/ThemeContext';
import { createFontStyles } from 'styleSheets/fontStyles';

const NotificationsScreen = () => {
  const coreStyles = CoreStyleSheet();
  const {isDarkMode} = useTheme();
  const fontStyles = createFontStyles(isDarkMode);
  const colors = isDarkMode ? Color.Dark : Color.Light;

  const navigation = useNavigation();

  const {data: currentUser} = useGetUserQuery();
  const isLessor = currentUser?.userType === 'lessor';

  const {data, isLoading, isError, refetch} = useGetNotificationsQuery();
  const notifications = data?.notifications;

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


  const styles = StyleSheet.create({
    screenContainer: StyleSheet.flatten([
      coreStyles.screenContainer,
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
      color: colors.Mint[100],
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: size(10),
    },
  });

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
    <SafeAreaView
      testID="notifications-screen"
      style={[coreStyles.safeAreaViewShowContainer]}>
      <View style={coreStyles.headerContainer}>
        <Text style={fontStyles.headerLarge}>Notifications</Text>
      </View>
      {notifications?.length === 0 && (
        <NotFoundComponent message="No notifications yet" />
      )}
      <View style={styles.screenContainer}>
        {isLessor ? (
          <FlatList
            data={notifications as LessorNotification[]}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <NotificationCard notification={item} />}
            testID="lessor-flatlist"
          />
        ) : (
          <FlatList
            data={notifications as TenantNotification[]}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <NotificationCard notification={item} />}
            testID="tenant-flatlist"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
