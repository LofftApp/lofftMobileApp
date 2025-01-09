import React, {useMemo} from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//Components
import {CoreButton} from 'components/buttons/CoreButton';

//Styles
import { useTheme } from 'components/themes/ThemeContext';
import { createFontStyles } from 'styleSheets/fontStyles';
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
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? Color.Dark : Color.Light;
  const fontStyles = createFontStyles(isDarkMode);
  const navigation = useNavigation<NotificationsScreenNavigationProp>();
  const {width} = useWindowDimensions();
  const isLessorNotification = notification.userType === 'lessor';
  const isRead = notification.read;

  const lessorBgColor = isRead ? colors.White[100] : colors.Lavendar[20];
  const advertStatus = notification.advert.status;

  const lessorNotificationHelper = useMemo(
    () => (notificationType: LessorNotificationType) => {
      switch (notificationType) {
        case 'open':
          return {
            icon: 'calendar',
            iconColor: colors.Black[100],
            bgColor: lessorBgColor,
            value: advertStatus === 'open' ? 'See applicants' : undefined,
            buttonColor: colors.Lavendar[100],
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
            iconColor: colors.Black[100],
            bgColor: lessorBgColor,
            value: advertStatus === 'review' ? 'See applicants' : undefined,
            buttonColor: colors.Lavendar[100],
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
            iconColor: colors.Black[100],
            bgColor: lessorBgColor,
            value: advertStatus === 'viewing' ? 'Go to chat' : undefined,
            buttonColor: colors.Lavendar[100],
            buttonIcon: 'send',
            buttonNavigation: () =>
              navigation.navigate('ChatroomsNavigator', {
                screen: 'ChatShow',
                 params: {chatroomId: notification.advert.chatroomId},
              }),
          };
        case 'offered':
          return {
            icon: 'home-smile',
            iconColor: colors.Black[100],
            bgColor: lessorBgColor,
            value: advertStatus === 'offered' ? 'Go to chat' : undefined,
            buttonColor: colors.Lavendar[100],
            buttonIcon: 'send',
            buttonNavigation: () =>
               navigation.navigate('ChatroomsNavigator', {
                screen: 'ChatShow',
                 params: {chatroomId: notification.advert.chatroomId},
              }),
          };
        case 'closed':
          return {
            icon: 'calendar',
            iconColor: colors.Black[100],
            bgColor: lessorBgColor,
            value: undefined,
            buttonColor: undefined,
            buttonIcon: undefined,
            buttonNavigation: undefined,
          };

        case 'new_applicant':
          return {
            icon: 'face-wink',
            iconColor: colors.Black[100],
            bgColor: lessorBgColor,
            value: advertStatus === 'open' ? 'See applicants' : undefined,
            buttonColor: colors.Lavendar[100],
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
            iconColor: colors.Black[100],
            bgColor: lessorBgColor,
            value: undefined,
            buttonColor: undefined,
            buttonIcon: undefined,
            buttonNavigation: undefined,
          };
      }
    },
    [colors.Black, colors.Lavendar, lessorBgColor, advertStatus, navigation, notification.advert.id, notification.advert.chatroomId],
  );

  const tenantPositiveBgColor = isRead ? colors.White[100] : colors.Mint[20];
  const tenantNegativeBgColor = isRead ? colors.White[100] : colors.Tomato[20];
  const applicationStatus =
    !isLessorNotification && notification.application.status;

  const tenantNotificationHelper = useMemo(
    () => (notificationType: TenantNotificationType) => {
      switch (notificationType) {
        case 'round_1':
          return {
            icon: 'thumbs-up',
            iconColor: colors.Mint[100],
            bgColor: tenantPositiveBgColor,
            value: undefined,
            buttonColor: undefined,
            buttonIcon: undefined,
            buttonNavigation: undefined,
          };
        case 'round_2':
          return {
            icon: 'thumbs-up',
            iconColor: colors.Mint[100],
            bgColor: tenantPositiveBgColor,
            value: undefined,
            buttonColor: colors.Mint[100],
            buttonIcon: undefined,
            buttonNavigation: undefined,
          };
        case 'round_3':
          return {
            icon: 'thumbs-up',
            iconColor: colors.Mint[100],
            bgColor: tenantPositiveBgColor,
            value: applicationStatus === 'active' ? 'Go to chat' : undefined,
            buttonColor: colors.Mint[100],
            buttonIcon: 'send',
            buttonNavigation: () =>
               navigation.navigate('ChatroomsNavigator', {
                screen: 'ChatShow',
                 params: {chatroomId: notification.advert.chatroomId},
              }),
          };
        case 'offered':
          return {
            icon: 'thumbs-up',
            iconColor: colors.Mint[100],
            bgColor: tenantPositiveBgColor,
            value: applicationStatus === 'offered' ? 'Accept' : undefined,
            buttonColor: colors.Mint[100],
            buttonIcon: 'home-smile',
            buttonNavigation: () =>
              navigation.navigate('ApplicationNavigator', {
                screen: 'LessorChatScreen',
              }),
          };
        case 'closed':
          return {
            icon: 'thumbs-down',
            iconColor: colors.Tomato[100],
            bgColor: tenantNegativeBgColor,
            value: undefined,
            buttonColor: undefined,
            buttonIcon: undefined,
            buttonNavigation: undefined,
          };
        default:
          return {
            icon: 'thumbs-up',
            iconColor: colors.Mint[100],
            bgColor: tenantPositiveBgColor,
            value: undefined,
            buttonColor: undefined,
            buttonIcon: undefined,
            buttonNavigation: undefined,
          };
      }
    },
    [colors.Mint, colors.Tomato, tenantPositiveBgColor, applicationStatus, tenantNegativeBgColor, navigation, notification.advert.chatroomId],
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

  const handleButtonNavigation = () => {
    notificationAssets.buttonNavigation &&
      notificationAssets.buttonNavigation();
  };

  return (
    <View
      style={[
        styles.outterContainer,
        {
          width: width - 30,
          backgroundColor: notificationAssets.bgColor,
        },
      ]}
      testID="notification-card-container">
      <View style={[styles.innerContainer]}>
        <View style={styles.iconImageContainer}>
          <LofftIcon
            name={notificationAssets.icon}
            size={size(30)}
            color={notificationAssets.iconColor}
            testID={notificationAssets.icon}
          />
          <View style={styles.imageContainer}>
            <Image
              style={styles.advertImage}
              source={
                notification.advert.flat.url
                  ? {uri: notification.advert.flat.url}
                  : NoFlatImage
              }
              testID={notification.advert.flat.url ? 'flat-image' : 'no-flat'}
            />
          </View>
        </View>
        <View style={styles.details}>
          <Text style={[fontStyles.bodySmall, {
              color: isDarkMode
                ? isRead
                  ? colors.Black[100]
                  : colors.White[100]
                : colors.Black[100],
            }]}>
            {beforeTagLine}
            <Text
              onPress={handleAdvertNavigation}
              style={[fontStyles.bodySmall, {color: colors.Blue[100]}]}>
              {notification.advert.flat.tagLine}
            </Text>
            {afterTagLine}.
          </Text>
          <Text
            style={[
              fontStyles.bodyExtraSmall,
              {color: colors.BlackOpacity[50]},
            ]}>
            {timeFromNow.charAt(0).toUpperCase() + timeFromNow.slice(1)}
          </Text>
          {notificationAssets.value && (
            <CoreButton
              textSize={fontStyles.headerExtraSmall}
              value={notificationAssets.value}
              onPress={handleButtonNavigation}
              style={[
                styles.buttonStyle,
                {
                  backgroundColor: notificationAssets.buttonColor,
                  borderColor: notificationAssets.buttonColor,
                },
              ]}
              icon={
                notificationAssets.buttonIcon ? (
                  <LofftIcon
                    name={notificationAssets.buttonIcon}
                    size={size(25)}
                    color={colors.White[100]}
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

  buttonStyle: {
    width: '96%',
    height: size(50),
  },
});

export default NotificationCard;
