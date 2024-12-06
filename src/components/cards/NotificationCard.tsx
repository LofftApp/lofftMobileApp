import {useNavigation} from '@react-navigation/native';
import {NoFlatImage} from 'assets';
import {CoreButton} from 'components/buttons/CoreButton';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import {NotificationsScreenNavigationProp} from 'navigationStacks/types';
import React from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {Notification} from 'reduxFeatures/firebaseNotifications/types';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const NotificationCard = ({notification}: {notification: Notification}) => {
  const navigation = useNavigation<NotificationsScreenNavigationProp>();
  const {width} = useWindowDimensions();
  const {data: currentUser} = useGetUserQuery();
  const isLessor = currentUser?.userType === 'lessor';

  const isRead = notification.read;

  const backgroundLessor = isRead ? Color.White[100] : Color.Lavendar[20];

  const positive =
    !isLessor &&
    (notification.application.status === 'active' ||
      notification?.application.status === 'offered');
  // const negative =
  //   (!isLessor && notification.application.status === 'closed') ||
  //   notification.application.status === 'deleted';

  const backgroundTenant = isRead
    ? Color.White[100]
    : positive
    ? Color.Mint[20]
    : Color.Tomato[20];

  const LessorNotificationIcon = 'calendar';
  const tenantNotificationIcon = positive ? 'thumbs-up' : 'thumbs-down';

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
          backgroundColor: isLessor ? backgroundLessor : backgroundTenant,
        },
      ]}>
      <View style={[styles.innerContainer]}>
        <View style={styles.iconImageContainer}>
          <LofftIcon
            name={isLessor ? LessorNotificationIcon : tenantNotificationIcon}
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
            icon={<LofftIcon name="send" size={20} color={Color.White[100]} />}
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
