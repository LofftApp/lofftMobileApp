import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  DimensionValue,
  Animated,
  Easing,
  useWindowDimensions,
} from 'react-native';

// Styles
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

//Hooks
import {useUserType} from 'reduxFeatures/user/useUserType';

// Components
import {useNavigation} from '@react-navigation/native';
import {CoreButton} from 'components/buttons/CoreButton';

// Assets 🪴
import LofftIcon from 'components/lofftIcons/LofftIcon';
import statusBarText from 'Assets/coreText/statusBarText.json';

// Helpers
import {size} from 'react-native-responsive-sizes';
import {applicationStatusIndex} from 'helpers/applicationStatusIndex';
import {advertStatusIndex} from 'helpers/advertStatusIndex';

// Types
import {StatusBarNavigationProp, StatusBarProps} from './types';
import {LessorNavigatorScreenNavigationProp} from '../../navigationStacks/types';
import {UserType} from 'reduxFeatures/user/types';
import {AdvertStatus} from 'reduxFeatures/adverts/types';
import {ApplicationStatus} from 'reduxFeatures/applications/types';

const StatusBarComponent = ({application, _advert}: StatusBarProps) => {
  const {isLessor} = useUserType();
  const advert = isLessor ? _advert : application?.advert;

  const [statusBar, setStatusBar] = useState('');
  const navigation = useNavigation<
    StatusBarNavigationProp | LessorNavigatorScreenNavigationProp
  >();

  const currentApplicationStatus = applicationStatusIndex(application?.status);
  const currentAdvertStatus = advertStatusIndex(
    advert?.status ?? AdvertStatus.Open,
  );

  console.log('🐊', currentAdvertStatus);

  const round1 = application?.round1;
  const round2 = application?.round2;
  const round3 = application?.round3;
  const chatroomId = application?.chatroomId;

  const active = isLessor
    ? ![AdvertStatus.Closed].includes(advert?.status ?? AdvertStatus.Open)
    : [ApplicationStatus.Active].includes(
        application?.status ?? ApplicationStatus.Active,
      ) && ![AdvertStatus.Closed].includes(advert?.status ?? AdvertStatus.Open);

  const {height: screenHeight} = useWindowDimensions();

  const iconsCreated = statusBarText[
    isLessor ? UserType.LESSOR : UserType.TENANT
  ].map((key, index: number) => {
    return (
      <LofftIcon
        key={index + 1}
        name={key.icon}
        size={28}
        color={
          active
            ? isLessor
              ? (currentAdvertStatus === 0 && index <= 0) ||
                (currentAdvertStatus === 1 && index <= 1) ||
                (currentAdvertStatus === 2 && index <= 2) ||
                currentAdvertStatus === index ||
                currentAdvertStatus > index
                ? Color.White[100]
                : Color.Lavendar[50]
              : (currentApplicationStatus === 0 &&
                  currentAdvertStatus === 1 &&
                  round1 &&
                  index <= 2) ||
                (currentApplicationStatus === 0 &&
                  currentAdvertStatus === 2 &&
                  round2 &&
                  index <= 3) ||
                (currentApplicationStatus === 0 &&
                  currentAdvertStatus === 3 &&
                  round3 &&
                  index <= 4) ||
                currentApplicationStatus === index ||
                currentApplicationStatus > index
              ? Color.White[100]
              : Color.Lavendar[50]
            : Color.Black[50]
        }
      />
    );
  });

  const statusText = statusBarText[
    isLessor ? UserType.LESSOR : UserType.TENANT
  ].map((key, index: number) => {
    return (
      <View key={key.icon}>
        <Text
          style={[
            fontStyles.headerSmall,
            styles.infoBlockHeader,
            active
              ? isLessor
                ? (currentAdvertStatus === 0 && index <= 0) ||
                  (currentAdvertStatus === 1 && index <= 1) ||
                  (currentAdvertStatus === 2 && index <= 2) ||
                  currentAdvertStatus === index ||
                  currentAdvertStatus > index
                  ? styles.infoBlockActive
                  : styles.infoBlock
                : (currentApplicationStatus === 0 &&
                    currentAdvertStatus === 1 &&
                    round1 &&
                    index <= 2) ||
                  (currentApplicationStatus === 0 &&
                    currentAdvertStatus === 2 &&
                    round2 &&
                    index <= 3) ||
                  (currentApplicationStatus === 0 &&
                    currentAdvertStatus === 3 &&
                    round3 &&
                    index <= 4) ||
                  currentApplicationStatus === index ||
                  currentApplicationStatus > index
                ? styles.infoBlockActive
                : styles.infoBlock
              : styles.infoBlock,
          ]}>
          {key.header}
        </Text>
        <Text
          style={[
            fontStyles.bodySmall,
            active
              ? isLessor
                ? (currentAdvertStatus === 0 && index <= 0) ||
                  (currentAdvertStatus === 1 && index <= 1) ||
                  (currentAdvertStatus === 2 && index <= 2) ||
                  currentAdvertStatus === index ||
                  currentAdvertStatus > index
                  ? styles.infoBlockActive
                  : styles.infoBlock
                : (currentApplicationStatus === 0 &&
                    currentAdvertStatus === 1 &&
                    round1 &&
                    index <= 2) ||
                  (currentApplicationStatus === 0 &&
                    currentAdvertStatus === 2 &&
                    round2 &&
                    index <= 3) ||
                  (currentApplicationStatus === 0 &&
                    currentAdvertStatus === 3 &&
                    round3 &&
                    index <= 4) ||
                  currentApplicationStatus === index ||
                  currentApplicationStatus > index
                ? styles.infoBlockActive
                : styles.infoBlock
              : styles.infoBlock,
          ]}>
          {key.subText}
        </Text>

        {isLessor ? (
          <>
            {currentAdvertStatus === 0 && currentAdvertStatus === index && (
              <CoreButton
                value="See Applicants"
                style={styles.button}
                onPress={() =>
                  navigation.navigate('SeeApplicantsScreen', {
                    advertId: advert?.id ?? 0,
                  })
                }
              />
            )}
            {currentAdvertStatus === 1 && currentAdvertStatus === index && (
              <CoreButton
                value="See Profiles"
                style={styles.button}
                onPress={() =>
                  navigation.navigate('SeeProfilesScreen', {
                    advertId: advert?.id ?? 0,
                  })
                }
              />
            )}
            {currentAdvertStatus === 2 && currentAdvertStatus === index && (
              <CoreButton
                value="Go to chats"
                style={styles.button}
                onPress={() =>
                  navigation.navigate('ChatroomsNavigator', {
                    screen: 'ChatIndex',
                  })
                }
                icon={
                  <LofftIcon name="send" size={20} color={Color.White[100]} />
                }
              />
            )}

            {currentAdvertStatus === 3 && currentAdvertStatus === index && (
              <CoreButton
                value="Make an Offer"
                style={styles.button}
                onPress={() =>
                  navigation.navigate('OfferApplicantsScreen', {
                    advertId: advert?.id ?? 0,
                  })
                }
                icon={
                  <LofftIcon name="send" size={20} color={Color.White[100]} />
                }
              />
            )}
          </>
        ) : (
          currentAdvertStatus === 2 &&
          currentAdvertStatus === index &&
          currentApplicationStatus === 0 &&
          round2 && (
            <CoreButton
              value="Go to chat"
              style={[styles.button, styles.greenButton]}
              onPress={() =>
                navigation.navigate('ChatroomsNavigator', {
                  screen: 'ChatShow',
                  params: {
                    chatroomId: chatroomId,
                  },
                })
              }
              icon={
                <LofftIcon name="send" size={20} color={Color.White[100]} />
              }
            />
          )
        )}
      </View>
    );
  });

  const calculateStatusBar = useCallback(
    (currentStatusIndex: number) => {
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
          setStatusBar(isLessor ? '15' : '20');
          break;
      }
    },
    [isLessor],
  );

  const animatedHeight = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const index = active
      ? advertStatusIndex(advert?.status ?? AdvertStatus.Open)
      : advertStatusIndex(AdvertStatus.Offered);
    calculateStatusBar(index);
    Animated.timing(animatedHeight, {
      toValue: Number(statusBar),
      duration: 1500,
      easing: Easing.bezier(0.2, 0, 0.68, 1),
      useNativeDriver: false,
    }).start();
  }, [animatedHeight, calculateStatusBar, active, advert?.status, statusBar]);

  return (
    <>
      <View style={styles.maincontainer}>
        <View
          style={[
            styles.progressContainer,
            {
              maxHeight: isLessor ? screenHeight / 1.2 : screenHeight / 1.6,
            },
          ]}>
          <Animated.View
            style={[
              styles.progressBarOutline,
              {
                backgroundColor: active
                  ? isLessor
                    ? Color.Lavendar[10]
                    : Color.Mint[10]
                  : Color.Tomato[10],
              },
            ]}>
            <View style={styles.iconsPosition}>{iconsCreated}</View>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  height: animatedHeight.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }) as DimensionValue,
                  backgroundColor: active
                    ? isLessor
                      ? Color.Lavendar[100]
                      : Color.Mint[100]
                    : Color.Tomato[100],
                },
              ]}
            />
          </Animated.View>
          <View
            style={[
              styles.progressTextContainer,
              isLessor ? styles.height95 : styles.height98,
            ]}>
            {statusText}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    height: '100%',
    width: '15%',
    borderRadius: 28,
    alignItems: 'center',
  },
  iconsPosition: {
    position: 'absolute',
    zIndex: 400,
    height: '100%',
    justifyContent: 'space-between',
    paddingVertical: size(20),
  },
  progressBar: {
    width: '100%',
    borderRadius: 30,
  },
  progressTextContainer: {
    width: '84%',
    marginLeft: size(15),
    justifyContent: 'space-around',
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
  greenButton: {
    backgroundColor: Color.Mint[100],
    borderColor: Color.Mint[100],
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
