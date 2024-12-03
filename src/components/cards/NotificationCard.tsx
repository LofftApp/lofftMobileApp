import {useNavigation} from '@react-navigation/native';
import {NoFlatImage} from 'assets';
import {CoreButton} from 'components/buttons/CoreButton';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import {SearchScreenNavigationProp} from 'navigationStacks/types';
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
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const {width} = useWindowDimensions();
  const {data: currentUser} = useGetUserQuery();
  const isLessor = currentUser?.userType === 'lessor';

  const isRead = notification.read;
  const backgroundColor = isRead
    ? Color.White[100]
    : isLessor
    ? Color.Lavendar[20]
    : Color.Mint[20];
  const [beforeTagLine, afterTagLine] = notification.body.split(
    notification.advert.flat.tagLine,
  );

  const handleAdvertNavigation = () => {
    navigation.navigate('FlatShowScreen', {
      advertId: notification.advert.id,
    });
  };

  return (
    <View
      style={[
        styles.outterContainer,
        {width: width - 30, backgroundColor: backgroundColor},
      ]}>
      <View style={[styles.innerContainer]}>
        <View style={styles.iconImageContainer}>
          <LofftIcon name="calendar" size={30} color={Color.Black[100]} />
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
            {dayjs(notification.createdAt).fromNow()}
          </Text>
          <CoreButton
            textSize={fontStyles.headerExtraSmall}
            value="See applicants"
            onPress={() => console.log('see applicants')}
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
