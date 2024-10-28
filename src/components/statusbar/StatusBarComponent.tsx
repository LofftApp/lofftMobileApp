import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, StyleSheet, Dimensions, DimensionValue} from 'react-native';

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
import {applicationStatusIndex} from 'helpers/applicationStatusIndex';
import {advertStatusIndex} from 'helpers/advertStatusIndex';

// Types
import {StatusBarNavigationProp, StatusBarProps} from './types';
import {CoreButton} from 'components/buttons/CoreButton';
import {LessorNavigatorScreenNavigationProp} from '../../navigationStacks/types';

const StatusBarComponent = ({
  application,
  _advert,
  isLessor,
}: StatusBarProps) => {
  const advert = isLessor ? _advert : application?.advert;

  const [statusBar, setStatusBar] = useState('');
  const navigation = useNavigation<
    StatusBarNavigationProp | LessorNavigatorScreenNavigationProp
  >();

  const currentApplicationStatus = applicationStatusIndex(application?.status);
  const currentAdvertStatus = advertStatusIndex(advert?.status ?? '');
  const round1 = application?.round1;
  const round2 = application?.round2;
  const round3 = application?.round3;

  const active = isLessor
    ? !['closed'].includes(advert?.status ?? '')
    : ['active'].includes(application?.status ?? '') &&
      !['closed'].includes(advert?.status ?? '');

  const screenheight = Dimensions.get('window').height;

  const iconsCreated = statusBarText[advert?.lessor ? 'lessor' : 'tenant'].map(
    (key, index: number) => {
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
    },
  );

  const statusText = statusBarText[advert?.lessor ? 'lessor' : 'tenant'].map(
    (key, index: number) => {
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
                    navigation.navigate('seeApplicants', {
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
                    navigation.navigate('seeProfiles', {
                      advertId: advert?.id ?? 0,
                    })
                  }
                />
              )}
              {currentAdvertStatus === 2 && currentAdvertStatus === index && (
                <CoreButton
                  value="Go to chat"
                  style={styles.button}
                  onPress={() => navigation.navigate('chat')}
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
                onPress={() => navigation.navigate('chat')}
                icon={
                  <LofftIcon name="send" size={20} color={Color.White[100]} />
                }
              />
            )
          )}
        </View>
      );
    },
  );

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

  // The background color height of the statusbar is set here 👨🏻‍🍳
  // The Index needs to be stored in state or in the advert.status enum for the color to change
  // useEffect(() => {
  //   calculateStatusBar(currentAdvertStatus);
  // }, [currentAdvertStatus, calculateStatusBar]);

  useEffect(() => {
    const index = active
      ? advertStatusIndex(advert?.status ?? '')
      : advertStatusIndex('offered');
    calculateStatusBar(index);
  }, [advert?.status, active, calculateStatusBar]);

  return (
    <>
      <View style={styles.maincontainer}>
        <View
          style={[
            styles.progressContainer,
            {
              maxHeight: advert?.lessor
                ? screenheight / 1.2
                : screenheight / 1.6,
            },
          ]}>
          <View
            style={[
              styles.progressBarOutline,
              {
                backgroundColor: active
                  ? advert?.lessor
                    ? Color.Lavendar[10]
                    : Color.Mint[10]
                  : Color.Tomato[10],
              },
            ]}>
            <View style={styles.iconsPosition}>{iconsCreated}</View>
            <View
              style={[
                styles.progressBar,
                {
                  height: `${Number(statusBar)}%` as DimensionValue,
                  backgroundColor: active
                    ? advert?.lessor
                      ? Color.Lavendar[100]
                      : Color.Mint[100]
                    : Color.Tomato[100],
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
    </>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: size(0),
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
