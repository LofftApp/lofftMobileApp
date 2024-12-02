import React from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

const NotificationCard = () => {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.outterContainer, {width: width - 30}]}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.advertImage}
          source={{
            uri: 'https://www.friendsoffriends.com/app/uploads/an-artists-farm-in-upstate-new-york-envisions-a-path-towards-food-sovereignty/Friends-of-Friends-SkyHighFarm-Tompkins-061.jpg.webp',
          }}
        />
      </View>
      <View style={[styles.innerContainer]}>
        <View style={styles.details}>
          <Text style={[fontStyles.bodyMedium, styles.nameMargin]}>Text 1</Text>
          <Text style={[fontStyles.bodyMedium, {color: Color.Mint[100]}]}>
            Text 2
          </Text>
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
    padding: size(15),
    height: 'auto',
  },
  innerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    padding: size(15),
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  matcher: {
    color: Color.Mint[100],
  },
  collapsedExpand: {
    marginTop: size(10),
    gap: size(10),
    height: 'auto',
  },

  nameMargin: {
    marginRight: size(20),
  },
  chipsContainer: {
    flexWrap: 'wrap',
  },
});

export default NotificationCard;
