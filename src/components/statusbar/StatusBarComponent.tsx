import React, {useState, useEffect} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

// Styles
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

// Components
import {CoreButton} from '@Components/buttons/CoreButton';

// Assets 🪴
import LofftIcon from '@Components/lofftIcons/LofftIcon';
import statusBarText from '@Assets/coreText/statusBarText.json';

const StatusBarComponent = ({advert, navigation}: any) => {
  //const navigation = useNavigation();
  const screenheight = Dimensions.get('window').height;
  const [statusBar, setStatusBar] = useState('');

  // const currentApplicationStatus = [
  //   'open',
  //   'review',
  //   'viewing',
  //   'offered',
  //   'closed',
  // ].indexOf(advert.status);

  const currentApplicationStatus = 1;

  const iconsCreated = statusBarText[advert.lessor ? 'lessor' : 'renter'].map(
    (key: any, index: number) => {
      return (
        <LofftIcon
          key={index + 1}
          name={key.icon}
          size={28}
          color={
            advert.lessor
              ? currentApplicationStatus === index ||
                currentApplicationStatus > index
                ? Color.White[100]
                : Color.Lavendar[50]
              : currentApplicationStatus === index ||
                currentApplicationStatus > index
              ? Color.White[100]
              : Color.Mint[50]
          }
        />
      );
    },
  );

  const statusText = statusBarText[advert.lessor ? 'lessor' : 'renter'].map(
    (key: any, index: number) => {
      const navigationScreen = advert.lessor
        ? key.buttonText.split(' ').join('')
        : null;

      const actionView = advert.lessor ? (
        <View style={[styles.landlordActionButton, styles.button]}>
          <TouchableOpacity
            onPress={() => navigation.navigate(navigationScreen)}>
            <Text style={[fontStyles.headerSmall, styles.buttonText]}>
              {key.buttonText}
            </Text>
            {/* <Text style={[fontStyles.headerSmall, styles.buttonText]}>
                {key.buttonText}
              </Text> */}
          </TouchableOpacity>
        </View>
      ) : null;

      return (
        <View key={index + 1}>
          <Text
            style={[
              fontStyles.headerSmall,
              styles.infoBlockHeader,
              currentApplicationStatus === index ||
              currentApplicationStatus > index
                ? styles.infoBlockActive
                : styles.infoBlock,
            ]}>
            {key.header}
          </Text>
          <Text
            style={[
              fontStyles.bodySmall,
              currentApplicationStatus === index ||
              currentApplicationStatus > index
                ? styles.infoBlockActive
                : styles.infoBlock,
            ]}>
            {key.subText}
          </Text>

          {currentApplicationStatus === index ? (
            <View style={[styles.landlordActionButton, styles.button]}>
              <TouchableOpacity
                onPress={() => navigation.navigate(navigationScreen)}>
                <Text style={[fontStyles.headerSmall, styles.buttonText]}>
                  {key.buttonText}
                </Text>
                {/* <Text style={[fontStyles.headerSmall, styles.buttonText]}>
                {key.buttonText}
              </Text> */}
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      );
    },
  );

  const calculateStatusBar = (currentStatusIndex: any) => {
    let status = null;
    switch (currentStatusIndex) {
      case 1:
        status = '50';
        break;
      case 2:
        status = '75';
        break;
      case 3:
        status = '100';
        break;
      default:
        status = '25';
        break;
    }
    setStatusBar(status);
  };

  useEffect(() => {
    calculateStatusBar(advert.status);
  });

  return (
    <View style={[styles.maincontainer]}>
      <View
        style={[
          styles.progressContainer,
          {maxHeight: advert.lessor ? screenheight / 1.7 : screenheight / 2},
        ]}>
        <View
          style={[
            styles.progressBarOutline,
            {
              backgroundColor: advert.lessor
                ? Color.Lavendar[10]
                : Color.Mint[10],
            },
          ]}>
          <View style={styles.iconsPosition}>{iconsCreated}</View>
          <View
            style={[
              styles.progressBar,
              {
                height: `${statusBar}%`,
                backgroundColor: advert.lessor
                  ? Color.Lavendar[100]
                  : Color.Mint[100],
              },
            ]}
          />
        </View>
        <View
          style={[
            styles.progressTextContainer,
            {height: advert.lessor ? '95%' : '98%'},
          ]}>
          {statusText}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: Color.Black[10],
    paddingTop: 15,
  },
  infoBlockHeader: {
    marginTop: 15,
  },
  infoBlock: {
    color: Color.Black[50],
  },
  infoBlockActive: {
    color: Color.Black[100],
  },
  progressContainer: {
    flexDirection: 'row',
    maxHeight: '50%',
    /* 🤖 This one effects the layout of the progress bar look and text */
    justifyContent: 'space-between',
  },
  progressBarOutline: {
    height: '100%',
    width: '15%',
    borderRadius: 28,
    alignItems: 'center',
  },
  iconsPosition: {
    position: 'absolute',
    zIndex: 400,
    height: '100%',
    justifyContent: 'space-around',
  },
  progressBar: {
    width: '100%',
    backgroundColor: Color.Mint[100],
    borderRadius: 30,
  },
  progressTextContainer: {
    width: '85%',
    marginLeft: 15,
    justifyContent: 'space-around',
  },
  landlordActionButton: {
    backgroundColor: Color.Lavendar[100],
  },
  // rentorActionButton: {
  //   backgroundColor: Color.Mint[100],
  // },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: Color.White[100],
  },
});

export default StatusBarComponent;
