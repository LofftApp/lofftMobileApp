import {useNavigation} from '@react-navigation/native';
import {NoFlatImage} from 'assets';
import {CoreButton} from 'components/buttons/CoreButton';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import {NotificationsScreenNavigationProp} from 'navigationStacks/types';
import React from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {
  LessorNotification,
  LessorNotificationType,
  Notification,
  TenantNotification,
} from 'reduxFeatures/firebaseNotifications/types';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const NotificationCard = ({
  notification,
}: {
  notification: LessorNotification | TenantNotification;
}) => {
  const navigation = useNavigation<NotificationsScreenNavigationProp>();
  const {width} = useWindowDimensions();
  const {data: currentUser} = useGetUserQuery();
  const isLessor = currentUser?.userType === 'lessor';
  const isLessorNotification = notification.userType === 'lessor';

  const isRead = notification.read;

  const lessorIconHelper = (notificationType: LessorNotificationType) => {
    switch (notificationType) {
      case 'open':
        return 'user';
      case 'review':
        return 'calendar';
      case 'viewing':
        return 'hourglass';
      case 'offered':
        return 'home-smile';
      case 'closed':
        return 'thumbs-down';
      default:
        return 'calendar';
    }
  };

  const lessorButtonIcon = () => {
    if (notification.notificationType === 'viewing') {
      return 'send';
    }
    if (notification.notificationType === 'offered') {
      return 'send';
    }
    return '';
  };

  const tenantIconHelper = (notificationType: string) => {
    switch (notificationType) {
      case 'round1':
        return 'thumbs-up';
      case 'round2':
        return 'thumbs-up';
      case 'round3':
        return 'thumbs-up';
      case 'offered':
        return 'thumbs-up';
      case 'closed':
        return 'thumbs-down';
      default:
        return 'calendar';
    }
  };

  const backgroundLessor = isLessorNotification
    ? isRead
      ? Color.White[100]
      : Color.Lavendar[20]
    : undefined;

  const tenantPositiveNotification =
    tenantIconHelper(notification.notificationType) === 'thumbs-up';

  const backgroundTenant = !isLessorNotification
    ? isRead
      ? Color.White[100]
      : tenantPositiveNotification
      ? Color.Mint[20]
      : Color.Tomato[20]
    : undefined;

  const body = notification.body || '';
  const [beforeTagLine, afterTagLine] = body.split(
    notification.advert.flat.tagLine,
  );
  const timeFromNow = dayjs(notification.createdAt).fromNow();

  const handleAdvertNavigation = () => {
    navigation.navigate('LessorIndexNavigator', {
      screen: 'ApplicationShowScreen',
      params: {id: notification.advert.id},
    });
  };

  return (
    <View
      style={[
        styles.outterContainer,
        {
          width: width - 30,
          backgroundColor: isLessorNotification
            ? backgroundLessor
            : backgroundTenant,
        },
      ]}>
      <View style={[styles.innerContainer]}>
        <View style={styles.iconImageContainer}>
          <LofftIcon
            name={
              isLessorNotification
                ? lessorIconHelper(notification.notificationType)
                : tenantIconHelper(notification.notificationType)
            }
            size={30}
            color={Color.Black[100]}
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
          <CoreButton
            textSize={fontStyles.headerExtraSmall}
            value="See applicants"
            onPress={() =>
              navigation.navigate('LessorIndexNavigator', {
                screen: 'SeeApplicantsScreen',
                params: {advertId: notification.advert.id},
              })
            }
            icon={
              <LofftIcon
                name={lessorButtonIcon()}
                size={20}
                color={Color.White[100]}
              />
            }
          />
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
