import {CoreButton} from 'components/buttons/CoreButton';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import React from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

const NotificationCard = () => {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.outterContainer, {width: width - 30}]}>
      <View style={[styles.innerContainer]}>
        <View style={styles.iconImageContainer}>
          <LofftIcon name="calendar" size={30} color={Color.Black[100]} />
          <View style={styles.imageContainer}>
            <Image
              style={styles.advertImage}
              source={{
                uri: 'https://www.friendsoffriends.com/app/uploads/an-artists-farm-in-upstate-new-york-envisions-a-path-towards-food-sovereignty/Friends-of-Friends-SkyHighFarm-Tompkins-061.jpg.webp',
              }}
            />
          </View>
        </View>
        <View style={styles.details}>
          <Text style={[fontStyles.bodySmall, {color: Color.Black[100]}]}>
            Someone has just applied for{' '}
            <Text style={[fontStyles.bodySmall, {color: Color.Blue[100]}]}>
              Awesome 2 Bedroom Flat
            </Text>
          </Text>
          <Text
            style={[
              fontStyles.bodyExtraSmall,
              {color: Color.BlackOpacity[50]},
            ]}>
            just now
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
    backgroundColor: Color.Lavendar[10],
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
