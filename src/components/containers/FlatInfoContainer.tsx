import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Redux 🏗️
import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';
import {applyForAdvert} from 'reduxFeatures/adverts/advertMiddleware';

// StyleSheet 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

import Chips from 'components/buttons/Chips';
import {CoreButton} from 'components/buttons/CoreButton';
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Helpers
import {dateFormatConverter} from 'helpers/dateFormatConverter';
import {size} from 'react-native-responsive-sizes';

// Types 🏷
import type {FlatInfoContainerProps} from './types';
import type {SearchScreenNavigationProp} from '../../../navigationStacks/types';
import {UserState} from 'reduxFeatures/user/types';
import {tagSorter} from 'helpers/tagSorter';
import {truncateTextAtWord} from 'helpers/truncateTextAtWord';

const FlatInfoContainer = ({advert}: FlatInfoContainerProps) => {
  console.log('USERTYPE', advert.user);
  const currentUser = useAppSelector((state: {user: UserState}) => state.user.user);
  console.log('USER', currentUser);

  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const toggleExpand = () => {
    setDescriptionExpanded(prev => !prev);
  };

  const {flat} = advert;
  const {
    characteristics: flatCharacteristics,
    features: flatFeatures,
    photos,
  } = flat;
  const {profile, filter: userFilter} = currentUser;

  const {characteristics: userCharacteristics} = profile;

  const characteristicsTags = tagSorter(
    userCharacteristics,
    flatCharacteristics,
  );
  console.log('characteristicsTags', characteristicsTags);

  const featuresTags = tagSorter(userFilter, flatFeatures);
  console.log('featuresTags', featuresTags);

  const maxDescriptionLength = 100;
  const displayDescription = descriptionExpanded
    ? advert.flat.description
    : truncateTextAtWord(advert.flat.description, maxDescriptionLength);

  return (
    <View style={styles.centralizerContainer}>
      {!advert.lessor && (
        <View style={styles.matchContainer}>
          <View>
            <Text style={fontStyles.headerLarge}>🌟</Text>
          </View>
          <View>
            <Text style={fontStyles.headerSmall}>
              {advert.matchScore}% match with your lifestyles
              {'\n'}& flat expectations
            </Text>
          </View>
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={fontStyles.bodySmall}>{advert.flat.address}</Text>
        <Text style={[fontStyles.headerSmall]}>{advert.flat.tagLine}</Text>
        <View style={styles.LegendContainer}>
          <View style={styles.firstRowLegendContainer}>
            <View style={styles.iconContainer}>
              <LofftIcon name="banke-note" size={23} color={Color.Black[30]} />
              <Text style={[fontStyles.bodyMedium, styles.iconMargin]}>
                {advert.monthlyRent}€
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <LofftIcon name="ruler" size={23} color={Color.Black[30]} />
              <Text style={[fontStyles.bodyMedium, styles.iconMargin]}>
                {advert.flat.size}
                {advert.flat.measurementUnit}
              </Text>
            </View>
          </View>
          <View style={styles.secondRowLegendContainer}>
            <LofftIcon name="calendar" size={23} color={Color.Black[30]} />
            <Text style={[fontStyles.bodyMedium, styles.dateText]}>
              From: {dateFormatConverter({date: {seconds: advert.fromDate}})}{' '}
              {`- ${dateFormatConverter({
                date: {seconds: advert.toDate || 1715990400},
              })}`}
            </Text>
          </View>
        </View>
        <View style={styles.descriptionMargin}>
          <Text style={{color: Color.Black[80]}}>
            {displayDescription}
            {!descriptionExpanded &&
              advert.flat.description.length > maxDescriptionLength &&
              '...'}
          </Text>

          {advert.flat.description &&
            advert.flat.description.length > maxDescriptionLength && (
              <CoreButton
                value={descriptionExpanded ? 'Read Less' : 'Read More'}
                style={styles.coreButtonStyle}
                textStyle={[
                  fontStyles.headerSmall,
                  {color: Color.Lavendar[100]},
                ]}
                disabled={false}
                onPress={toggleExpand}
              />
            )}
        </View>

        {advert.user?.userType === 'lessor' && (
          <>
            <Text style={[fontStyles.headerSmall, styles.flatCharText]}>
              Flat Characteristics
            </Text>
            <View style={styles.chipsContainer}>
              <Chips sortedTags={characteristicsTags} features={true} emoji />
            </View>
          </>
        )}

        {currentUser.userType === 'renter' && (
          <>
            <Text style={[fontStyles.headerSmall, styles.matchText]}>
              Match with you
            </Text>
            <View style={styles.matchWithYouContainer}>
              <Chips tags={flatCharacteristics} features={true} emoji />
            </View>

            <Text style={[fontStyles.headerSmall, styles.otherText]}>
              Other
            </Text>
          </>
        )}

        {/* Continue codeing from here !!!! */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: Color.White[100],
  },
  centralizerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: size(20),
  },
  matchContainer: {
    width: '100%',
    backgroundColor: Color.Mint[10],
    marginVertical: size(20),
    borderRadius: size(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: size(20),
    alignItems: 'center',
  },
  infoContainer: {
    width: '100%',
    marginTop: size(15),
  },
  LegendContainer: {
    width: '90%',
    marginTop: size(20),
  },
  firstRowLegendContainer: {
    flexDirection: 'row',
    marginBottom: size(20),
  },
  secondRowLegendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pricePlacementContainer: {
    marginLeft: size(10),
    marginRight: size(100),
  },
  sizePlacementContainer: {
    marginLeft: size(10),
  },
  dateText: {
    marginLeft: size(10),
  },
  descriptionContainer: {
    marginTop: size(10),
  },
  flatCharText: {
    marginTop: size(23),
    marginBottom: size(5),
  },
  chipsContainer: {
    marginTop: size(10),
    marginBottom: size(20),
  },
  matchText: {
    marginTop: size(23),
    marginBottom: size(5),
  },
  matchWithYouContainer: {
    marginTop: size(10),
  },
  otherText: {
    marginTop: size(23),
    marginBottom: size(5),
  },
  line: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',
  },
  countDownTimer: {
    textAlign: 'center',
    color: Color.Mint[100],
    marginTop: size(20),
  },
  coreButtonCustom: {
    marginTop: size(14),
  },
  coreButtonStyle: {
    backgroundColor: 'white',
    borderWidth: size(2),
    marginTop: size(14),
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMargin: {
    marginLeft: size(10),
    marginRight: size(100),
  },
  descriptionMargin: {
    marginTop: size(20),
  },
  readMoreButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    marginTop: size(14),
    height: size(40),
  },
  seeReadMore: {
    color: Color.Blue[100],
    alignSelf: 'flex-end',
    marginRight: size(10),
    marginBottom: size(10),
  },
  marginFlatCharacteristics: {marginTop: size(23), marginBottom: size(5)},
  marginChipsCharacteristics: {marginTop: size(10), marginBottom: size(20)},
  marginChipsOther: {marginTop: size(10)},
});

export default FlatInfoContainer;
