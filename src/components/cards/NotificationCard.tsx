import React, {useMemo} from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//Components
import {CoreButton} from 'components/buttons/CoreButton';

//Styles
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

//Assets
import {NoFlatImage} from 'assets';
import LofftIcon from 'components/lofftIcons/LofftIcon';

//Helpers
import {size} from 'react-native-responsive-sizes';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

//Types
import {
  LessorNotification,
  LessorNotificationType,
  TenantNotification,
  TenantNotificationType,
} from 'reduxFeatures/firebaseNotifications/types';
import {NotificationsScreenNavigationProp} from 'navigationStacks/types';

const NotificationCard = ({
  notification,
}: {
  notification: LessorNotification | TenantNotification;
}) => {
  const navigation = useNavigation<NotificationsScreenNavigationProp>();
  const {width} = useWindowDimensions();
  const isLessorNotification = notification.userType === 'lessor';
  const isRead = notification.read;

  const lessorBgColor = isRead ? Color.White[100] : Color.Lavendar[20];
  const advertStatus = notification.advert.status;

  const lessorNotificationHelper = useMemo(
    () => (notificationType: LessorNotificationType) => {
      switch (notificationType) {
        case 'open':
          return {
            icon: 'calendar',
            iconColor: Color.Black[100],
            bgColor: lessorBgColor,
            value: advertStatus === 'open' ? 'See applicants' : undefined,
            buttonIcon: undefined,
            buttonNavigation: () =>
              navigation.navigate('LessorIndexNavigator', {
                screen: 'SeeApplicantsScreen',
                params: {advertId: notification.advert.id},
              }),
          };
        case 'review':
          return {
            icon: 'calendar',
            iconColor: Color.Black[100],
            bgColor: lessorBgColor,
            value: advertStatus === 'review' ? 'See applicants' : undefined,
            buttonIcon: undefined,
            buttonNavigation: () =>
              navigation.navigate('LessorIndexNavigator', {
                screen: 'SeeProfilesScreen',
                params: {advertId: notification.advert.id},
              }),
          };
        case 'viewing':
          return {
            icon: 'hourglass',
            iconColor: Color.Black[100],
            bgColor: lessorBgColor,
            value: advertStatus === 'viewing' ? 'Go to chat' : undefined,
            buttonIcon: 'send',
            buttonNavigation: () =>
              navigation.navigate('LessorIndexNavigator', {
                screen: 'LessorChatScreen',
              }),
          };
        case 'offered':
          return {
            icon: 'home-smile',
            iconColor: Color.Black[100],
            bgColor: lessorBgColor,
            value: advertStatus === 'offered' ? 'Go to chat' : undefined,
            buttonIcon: 'send',
            buttonNavigation: () =>
              navigation.navigate('LessorIndexNavigator', {
                screen: 'LessorChatScreen',
              }),
          };
        case 'closed':
          return {
            icon: 'calendar',
            iconColor: Color.Black[100],
            bgColor: lessorBgColor,
            value: undefined,
            buttonIcon: undefined,
            buttonNavigation: undefined,
          };

        case 'new_applicant':
          return {
            icon: 'face-wink',
            iconColor: Color.Black[100],
            bgColor: lessorBgColor,
            value: advertStatus === 'open' ? 'See applicants' : undefined,
            buttonIcon: undefined,
            buttonNavigation: () =>
              navigation.navigate('LessorIndexNavigator', {
                screen: 'SeeApplicantsScreen',
                params: {advertId: notification.advert.id},
              }),
          };
        default:
          return {
            icon: 'calendar',
            iconColor: Color.Black[100],
            bgColor: lessorBgColor,
            value: undefined,
            buttonIcon: undefined,
            buttonNavigation: undefined,
          };
      }
    },
    [navigation, notification.advert.id, lessorBgColor, advertStatus],
  );

  const tenantPositiveBgColor = isRead ? Color.White[100] : Color.Mint[20];
  const tenantNegativeBgColor = isRead ? Color.White[100] : Color.Tomato[20];
  const applicationStatus = !isLessorNotification
    ? notification.application.status
    : undefined;

  const tenantNotificationHelper = useMemo(
    () => (notificationType: TenantNotificationType) => {
      switch (notificationType) {
        case 'round_1':
          return {
            icon: 'thumbs-up',
            iconColor: Color.Mint[100],
            bgColor: tenantPositiveBgColor,
            value: undefined,
            buttonIcon: undefined,
            buttonNavigation: undefined,
          };
        case 'round_2':
          return {
            icon: 'thumbs-up',
            iconColor: Color.Mint[100],
            bgColor: tenantPositiveBgColor,
            value: applicationStatus === 'active' ? 'Go to chat' : undefined,
            buttonIcon: 'send',
            buttonNavigation: () =>
              navigation.navigate('ApplicationNavigator', {
                screen: 'LessorChatScreen',
              }),
          };
        case 'round_3':
          return {
            icon: 'thumbs-up',
            iconColor: Color.Mint[100],
            bgColor: tenantPositiveBgColor,
            value: applicationStatus === 'active' ? 'Go to chat' : undefined,
            buttonIcon: 'send',
            buttonNavigation: () =>
              navigation.navigate('ApplicationNavigator', {
                screen: 'LessorChatScreen',
              }),
          };
        case 'offered':
          return {
            icon: 'thumbs-up',
            iconColor: Color.Mint[100],
            bgColor: tenantPositiveBgColor,
            value: applicationStatus === 'offered' ? 'Accept' : undefined,
            buttonIcon: 'home-smile',
            buttonNavigation: () =>
              navigation.navigate('ApplicationNavigator', {
                screen: 'LessorChatScreen',
              }),
          };
        case 'closed':
          return {
            icon: 'thumbs-down',
            iconColor: Color.Tomato[100],
            bgColor: tenantNegativeBgColor,
            value: undefined,
            buttonIcon: undefined,
            buttonNavigation: undefined,
          };
        default:
          return {
            icon: 'thumbs-up',
            iconColor: Color.Mint[100],
            bgColor: tenantPositiveBgColor,
            value: undefined,
            buttonIcon: undefined,
            buttonNavigation: undefined,
          };
      }
    },
    [
      tenantNegativeBgColor,
      tenantPositiveBgColor,
      navigation,
      applicationStatus,
    ],
  );

  const notificationAssets = isLessorNotification
    ? lessorNotificationHelper(notification.notificationType)
    : tenantNotificationHelper(notification.notificationType);

  const [beforeTagLine, afterTagLine] = notification.body.split(
    notification.advert.flat.tagLine,
  );

  const timeFromNow = dayjs(notification.createdAt).fromNow();

  const handleAdvertNavigation = () => {
    isLessorNotification
      ? navigation.navigate('LessorIndexNavigator', {
          screen: 'ApplicationShowScreen',
          params: {id: notification.advert.id},
        })
      : navigation.navigate('ApplicationNavigator', {
          screen: 'ApplicationShowScreen',
          params: {id: notification.application.id},
        });
  };

  return (
    <View
      style={[
        styles.outterContainer,
        {
          width: width - 30,
          backgroundColor: notificationAssets.bgColor,
        },
      ]}>
      <View style={[styles.innerContainer]}>
        <View style={styles.iconImageContainer}>
          <LofftIcon
            name={notificationAssets.icon}
            size={30}
            color={notificationAssets.iconColor}
          />
          <View style={styles.imageContainer}>
            <Image
              style={styles.advertImage}
              source={
                notification.advert.flat.url
                  ? {uri: notification.advert.flat.url}
                  : NoFlatImage
              }
            />
          </View>
        </View>
        <View style={styles.details}>
          <Text style={[fontStyles.bodySmall, {color: Color.Black[100]}]}>
            {beforeTagLine}
            <Text
              onPress={handleAdvertNavigation}
              style={[fontStyles.bodySmall, {color: Color.Blue[100]}]}>
              {notification.advert.flat.tagLine}
            </Text>
            {afterTagLine}.
          </Text>
          <Text
            style={[
              fontStyles.bodyExtraSmall,
              {color: Color.BlackOpacity[50]},
            ]}>
            {timeFromNow.charAt(0).toUpperCase() + timeFromNow.slice(1)}
          </Text>
          {notificationAssets.value && (
            <CoreButton
              textSize={fontStyles.headerExtraSmall}
              value={notificationAssets.value}
              onPress={() =>
                notificationAssets.buttonNavigation &&
                notificationAssets.buttonNavigation()
              }
              icon={
                notificationAssets.buttonIcon ? (
                  <LofftIcon
                    name={notificationAssets.buttonIcon}
                    size={20}
                    color={Color.White[100]}
                  />
                ) : undefined
              }
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outterContainer: {
    borderRadius: 10,
    marginBottom: size(20),
    paddingVertical: size(20),
    paddingHorizontal: size(12),
    height: 'auto',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: size(10),
  },

  iconImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size(5),
  },

  imageContainer: {
    width: 100,
    aspectRatio: 1,
    overflow: 'hidden',
  },

  advertImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  details: {
    alignItems: 'flex-start',
    flex: 1,
    gap: size(3),
  },

  chipsContainer: {
    flexWrap: 'wrap',
  },
});

export default NotificationCard;
