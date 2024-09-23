import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  DimensionValue,
} from 'react-native';

// Styles
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// Components
import {useNavigation} from '@react-navigation/native';

// Assets 🪴
import LofftIcon from 'components/lofftIcons/LofftIcon';
import statusBarText from 'Assets/coreText/statusBarText.json';

// Helpers
import {size} from 'react-native-responsive-sizes';
// import {applicationStatusIndex} from 'helpers/applicationStatusIndex';

// Types
import {StatusBarNavigationProp, StatusBarProps} from './types';

const StatusBarComponent = ({
  application,
  _advert,
  isLessor,
}: StatusBarProps) => {
  const advert = isLessor ? _advert : application?.advert;

  const [statusBar, setStatusBar] = useState('');
  const navigation = useNavigation<StatusBarNavigationProp>();

  // const currentApplicationStatus = applicationStatusIndex(
  //   application?.status || advert?.status,
  // );
  // hardcoded to test status bar
  const currentApplicationStatus = 0;

  const screenheight = Dimensions.get('window').height;

  const iconsCreated = statusBarText[advert?.lessor ? 'lessor' : 'renter'].map(
    (key, index: number) => {
      return (
        <LofftIcon
          key={index + 1}
          name={key.icon}
          size={28}
          color={
            (currentApplicationStatus === 1 && index <= 2 && !isLessor) ||
            (currentApplicationStatus === 2 && index <= 3) ||
            (currentApplicationStatus === 3 && index <= 4) ||
            currentApplicationStatus === index ||
            currentApplicationStatus > index
              ? Color.White[100]
              : Color.Lavendar[50]
          }
        />
      );
    },
  );

  const statusText = statusBarText[advert?.lessor ? 'lessor' : 'renter'].map(
    (key, index: number) => {
      return (
        <View key={key.icon}>
          <Text
            style={[
              fontStyles.headerSmall,
              styles.infoBlockHeader,
              (currentApplicationStatus === 1 && index <= 2 && !isLessor) ||
              (currentApplicationStatus === 2 && index <= 3) ||
              (currentApplicationStatus === 3 && index <= 4) ||
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
              (currentApplicationStatus === 1 && index <= 2 && !isLessor) ||
              (currentApplicationStatus === 2 && index <= 3) ||
              (currentApplicationStatus === 3 && index <= 4) ||
              currentApplicationStatus === index ||
              currentApplicationStatus > index
                ? styles.infoBlockActive
                : styles.infoBlock,
            ]}>
            {key.subText}
          </Text>

          {isLessor ? (
            <>
              {currentApplicationStatus === 0 &&
                currentApplicationStatus === index && (
                  <View style={[styles.landlordActionButton, styles.button]}>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('allApplicants', {
                          id: advert?.id ?? 0,
                        })
                      }>
                      <Text style={[fontStyles.headerSmall, styles.buttonText]}>
                        See Applicants
                      </Text>
                    </Pressable>
                  </View>
                )}
              {currentApplicationStatus === 1 &&
                currentApplicationStatus === index && (
                  <View style={[styles.landlordActionButton, styles.button]}>
                    <Pressable onPress={() => navigation.navigate('chat')}>
                      <Text style={[fontStyles.headerSmall, styles.buttonText]}>
                        See Profiles
                      </Text>
                    </Pressable>
                  </View>
                )}
              {currentApplicationStatus === 3 &&
                currentApplicationStatus === index && (
                  <View style={[styles.landlordActionButton, styles.button]}>
                    <Pressable onPress={() => navigation.navigate('chat')}>
                      <Text style={[fontStyles.headerSmall, styles.buttonText]}>
                        Chat with tenant
                      </Text>
                    </Pressable>
                  </View>
                )}
            </>
          ) : (
            currentApplicationStatus === 2 &&
            currentApplicationStatus === index && (
              <View style={[styles.landlordActionButton, styles.button]}>
                <Pressable onPress={() => navigation.navigate('chat')}>
                  <Text style={[fontStyles.headerSmall, styles.buttonText]}>
                    Chat with landlord
                  </Text>
                </Pressable>
              </View>
            )
          )}
        </View>
      );
    },
  );

  const calculateStatusBar = (currentStatusIndex: number) => {
    switch (currentStatusIndex) {
      case 1:
        setStatusBar(isLessor ? '50' : '60');
        break;
      case 2:
        setStatusBar(isLessor ? '75' : '80');
        break;
      case 3:
        setStatusBar('100');
        break;
      default:
        setStatusBar('20');
        break;
    }
  };

  // The background color height of the statusbar is set here 👨🏻‍🍳
  // The Index needs to be stored in state or in the advert.status enum for the color to change
  useEffect(() => {
    calculateStatusBar(currentApplicationStatus);
  }, [currentApplicationStatus]);

  return (
    <View style={styles.maincontainer}>
      <View
        style={[
          styles.progressContainer,
          {maxHeight: advert?.lessor ? screenheight / 1.7 : screenheight / 2},
        ]}>
        <View
          style={[
            styles.progressBarOutline,
            {
              backgroundColor: advert?.lessor
                ? Color.Lavendar[10]
                : Color.Mint[10],
            },
          ]}>
          <View style={styles.iconsPosition}>{iconsCreated}</View>
          <View
            style={[
              styles.progressBar,
              {
                height: `${statusBar}%` as DimensionValue,
                backgroundColor: advert?.lessor
                  ? Color.Lavendar[100]
                  : Color.Mint[100],
              },
            ]}
          />
        </View>
        <View
          style={[
            styles.progressTextContainer,
            advert?.lessor ? styles.height95 : styles.height98,
          ]}>
          {statusText}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    paddingHorizontal: size(20),
    width: '100%',
    alignItems: 'center',
    paddingVertical: size(20),
    marginBottom: size(80),
  },
  infoBlockHeader: {
    marginTop: size(15),
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
  },
  progressBarOutline: {
    height: '120%',
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
    marginLeft: size(15),
    justifyContent: 'space-around',
  },
  landlordActionButton: {
    backgroundColor: Color.Lavendar[100],
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: size(8),
    paddingHorizontal: size(16),
    marginTop: size(10),
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: Color.White[100],
  },
  height95: {
    height: '95%',
  },
  height98: {
    height: '98%',
  },
});

export default StatusBarComponent;
