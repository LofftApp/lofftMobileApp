import {useNavigation} from '@react-navigation/native';
import BackButton from 'components/buttons/BackButton';
import {CoreButton} from 'components/buttons/CoreButton';
import NotificationCard from 'components/cards/NotificationCard';
import React from 'react';
import {View, StyleSheet, Text, SafeAreaView, ScrollView} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {useGetNotificationsQuery} from 'reduxFeatures/firebaseNotifications/fcmApi';

//Styles
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

const AlertsScreen = () => {
  const navigation = useNavigation();
  const {data} = useGetNotificationsQuery();
  console.log('alerts data', data);
  return (
    <SafeAreaView style={[CoreStyleSheet.safeAreaViewShowContainer]}>
      <View style={CoreStyleSheet.headerContainer}>
        <Text style={fontStyles.headerLarge}>Notifications</Text>
      </View>

      <View style={styles.screenContainer}>
        <ScrollView bounces={true} showsVerticalScrollIndicator={false}>
          <NotificationCard />
          <NotificationCard />
        </ScrollView>
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

export default AlertsScreen;
