import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  DimensionValue,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Components 🧬
import LofftIcon from 'components/lofftIcons/LofftIcon';
import LofftHeaderPhoto from './LofftHeaderPhoto';
import {CoreButton} from 'components/buttons/CoreButton';
import HeartButton from 'components/buttons/HeartButton';

// Redux 🐙
import {useToggleFavoriteMutation} from 'reduxFeatures/adverts/advertApi';
// StyleSheet 🖼
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// helpers 🧰
import {size} from 'react-native-responsive-sizes';
import {advertStatusIndex} from 'helpers/advertStatusIndex';
import {dateFormatConverter} from 'helpers/dateFormatConverter';

// Types 🏷
import type {ListFlatApplicationCardProps} from './types';
import {
  LessorNavigatorScreenNavigationProp,
  SearchScreenNavigationProp,
} from '../../navigationStacks/types';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useUserType} from 'reduxFeatures/user/useUserType';

//if isLessor is true, then the card will be of advert, otherwise it will be of application
const ListFlatApplicationCard = ({
  application,
  _advert,
}: ListFlatApplicationCardProps) => {
  const {isLessor} = useUserType();

  const advert = isLessor ? _advert : application?.advert;
  const {resetNewUserState} = useNewUserDetails(isLessor);

  const [toggleFavorite] = useToggleFavoriteMutation();

  const navigation = useNavigation<
    SearchScreenNavigationProp & LessorNavigatorScreenNavigationProp
  >();

  const active = isLessor
    ? !['closed'].includes(advert?.status ?? '')
    : ['active'].includes(application?.status ?? '') &&
      !['closed'].includes(advert?.status ?? '');

  const tenantActiveStatus = ['Applied', 'In review', 'Viewing', 'Offer'];
  const lessorActiveStatus = ['Received', 'Review', 'Viewing', 'Offer'];

  const [currentStatusBar, setCurrentStatusBar] = useState('');
  const [activeStage, setActiveStage] = useState(0);

  const calculateStatusBar = useCallback((currentStatusIndex: number) => {
    switch (currentStatusIndex) {
      case 1:
        setCurrentStatusBar('40');
        setActiveStage(1);
        break;
      case 2:
        setCurrentStatusBar('80');
        setActiveStage(2);
        break;
      case 3:
        setCurrentStatusBar('100');
        setActiveStage(3);
        break;
      default:
        setCurrentStatusBar('20');
        setActiveStage(0);
        break;
    }
  }, []);

  const animatedWidth = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const index = active
      ? advertStatusIndex(advert?.status ?? '')
      : advertStatusIndex('offered');
    calculateStatusBar(index);
    Animated.spring(animatedWidth, {
      toValue: Number(currentStatusBar),
      speed: 0.1,
      bounciness: 1,
      useNativeDriver: false,
    }).start();
  }, [
    animatedWidth,
    calculateStatusBar,
    active,
    advert?.status,
    currentStatusBar,
  ]);

  // useEffect(() => {
  //   const index = active
  //     ? advertStatusIndex(advert?.status ?? '')
  //     : advertStatusIndex('offered');
  //   calculateStatusBar(index);
  // }, [advert?.status, application?.status, active]);

  const textForStatusBar = isLessor ? lessorActiveStatus : tenantActiveStatus;

  const handleFavorite = () => {
    toggleFavorite(advert?.id ?? 0);
  };

  const handleEdit = () => {
    navigation.navigate('SettingsNavigator', {
      screen: 'EditAdvertScreen',
      params: {advertId: advert?.id ?? 0},
    });
    resetNewUserState();
  };

  return (
    <View style={styles.advertCardContainer}>
      <View style={styles.advertCardButtonsOverlay}>
        <View style={styles.advertCardbuttonsWrap}>
          {!isLessor && (
            <HeartButton favorite={advert?.favorite} onPress={handleFavorite} />
          )}
        </View>
      </View>

      {/* flat image */}
      <View style={styles.advertCardImage}>
        <LofftHeaderPhoto
          imageContainerHeight={size(300)}
          images={advert?.flat.photos ?? []}
        />
      </View>

      <View style={styles.metaDataContainer}>
        <Text style={[fontStyles.headerSmall]}>
          {advert?.monthlyRent} {advert?.currency}
        </Text>
        <Text style={[fontStyles.headerSmall]}>
          {advert?.flat.size} {advert?.flat.measurementUnit}
        </Text>
        <Text
          style={[
            fontStyles.bodySmall,
            {color: isLessor ? Color.Black[50] : Color.Mint[100]},
          ]}>
          {isLessor
            ? `Posted on ${dateFormatConverter({
                date: advert?.createdAt ?? '',
              })}`
            : `Applied on ${dateFormatConverter({
                date: application?.createdAt ?? '',
              })}`}
        </Text>
      </View>

      <View style={styles.locationContainer}>
        {advert?.flat.district && (
          <Text style={[fontStyles.bodySmall, styles.locationData]}>
            {advert?.flat.district}, {advert?.flat.city}
          </Text>
        )}
      </View>

      {isLessor && (
        <View style={styles.timeWrapper}>
          <LofftIcon size={20} name="alarm-clock" color={Color.Tomato[100]} />
          <Text style={styles.timeWrapperText}>
            3h left to make the decision for this round!
          </Text>
        </View>
      )}

      <View>
        <Animated.View
          style={[
            styles.progressBarOutline,
            {backgroundColor: active ? Color.Mint[10] : Color.Tomato[10]},
          ]}>
          <Animated.View
            style={[
              styles.actualProgress,
              {
                width: animatedWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'], // Maps values to % height
                }) as DimensionValue,
                backgroundColor: active ? Color.Mint[100] : Color.Tomato[100],
              },
            ]}
          />
        </Animated.View>

        <View style={styles.statusContainer}>
          {textForStatusBar.map(el => (
            <Text
              style={
                el === textForStatusBar[activeStage] && active
                  ? styles.active
                  : styles.inactive
              }
              key={el}>
              {el}
            </Text>
          ))}
        </View>
      </View>

      {isLessor ? (
        <View style={styles.buttonContainer}>
          <CoreButton
            value="Edit"
            textSize={fontStyles.headerExtraSmall}
            invert
            style={styles.button}
            onPress={handleEdit}
          />
          <CoreButton
            value="See Applicants"
            textSize={fontStyles.headerExtraSmall}
            style={styles.button}
            onPress={() =>
              navigation.navigate('ApplicationShowScreen', {
                id: advert?.id ?? 0,
              })
            }
          />
        </View>
      ) : (
        <View>
          <CoreButton
            invert
            value="View Application"
            onPress={() =>
              navigation.navigate('ApplicationShowScreen', {
                id: application?.id ?? 0,
              })
            }
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  advertCardContainer: {
    marginBottom: size(18),
  },
  advertCardButtonsOverlay: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
  },
  advertCardbuttonsWrap: {
    flex: 1,
    alignItems: 'flex-end',
    padding: size(15),
  },
  advertCardImage: {
    width: '100%',
    overflow: 'hidden',
    zIndex: 1,
    borderRadius: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: size(16),
    marginTop: size(10),
  },
  button: {
    flex: 1,
    maxWidth: size(200),
    height: size(50),
    paddingHorizontal: size(10),
    alignItems: 'center',
  },

  metaDataContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: size(10),
  },
  locationData: {
    color: Color.Black[50],
  },
  locationContainer: {
    marginTop: size(5),
    marginBottom: size(10),
  },

  progressBarOutline: {
    flex: 1,
    padding: size(6),
    borderRadius: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: size(10),
  },
  active: {
    fontWeight: 'bold',
    color: Color.Black[100],
  },
  inactive: {
    color: Color.Black[50],
  },
  actualProgress: {
    padding: size(8),
    borderRadius: 8,
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: size(15),
    marginTop: size(7),
  },
  timeWrapperText: {
    color: Color.Tomato[100],
    marginTop: size(2),
    marginLeft: size(7),
  },
});

export default ListFlatApplicationCard;
