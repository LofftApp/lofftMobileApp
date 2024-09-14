import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Redux 🏗️
import {useAppSelector} from 'reduxCore/hooks';

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
import {UserState} from 'reduxFeatures/user/types';
import {tagSorter} from 'helpers/tagSorter';
import {truncateTextAtWord} from 'helpers/truncateTextAtWord';

const FlatInfoContainer = ({advert}: FlatInfoContainerProps) => {
  const currentUser = useAppSelector(
    (state: {user: UserState}) => state.user.user,
  );

  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  const [flatCharExpand, setFlatCharExpand] = useState(false);
  const [matchExpand, setMatchExpand] = useState(false);
  const [otherExpand, setOtherExpand] = useState(false);

  const toggleDescriptionExpand = () => {
    setDescriptionExpanded(prev => !prev);
  };
  const toggleFlatCharExpand = () => {
    setFlatCharExpand(prev => !prev);
  };
  const toggleMatchExpand = () => {
    setMatchExpand(prev => !prev);
  };
  const toggleOtherExpand = () => {
    setOtherExpand(prev => !prev);
  };

  const charTags = tagSorter(
    currentUser.profile.characteristics ?? [],
    advert.flat.characteristics,
  );

  const positiveCharTags = charTags.positiveTags;
  const negativeCharTags = charTags.negativeTags;

  const featuresTags = tagSorter(
    currentUser.filter ?? [],
    advert.flat.features,
  );

  const positiveFeaturesTags = featuresTags.positiveTags;
  const negativeFeaturesTags = featuresTags.negativeTags;

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
                onPress={toggleDescriptionExpand}
              />
            )}
        </View>

        {currentUser.userType === 'lessor' && (
          <>
            {/* Features */}
            <View style={styles.chipsContainer}>
              <Text style={fontStyles.headerSmall}>Flat Characteristics</Text>
              <View style={styles.seeMoreContainer}>
                <Text
                  style={[fontStyles.bodySmall, styles.seeMore]}
                  onPress={toggleFlatCharExpand}>
                  {flatCharExpand ? 'See less' : 'See more'}
                </Text>
                {flatCharExpand ? (
                  <>
                    <LofftIcon
                      name="chevron-up"
                      size={25}
                      color={Color.Blue[100]}
                    />
                  </>
                ) : (
                  <>
                    <LofftIcon
                      name="chevron-down"
                      size={25}
                      color={Color.Blue[100]}
                    />
                  </>
                )}
              </View>
            </View>
            <Chips
              positiveTags={positiveFeaturesTags}
              features={true}
              emoji
              expand={flatCharExpand}
            />
            <Chips
              positiveTags={positiveCharTags}
              features={false}
              emoji
              expand={flatCharExpand}
            />
          </>
        )}

        {currentUser.userType === 'tenant' && (
          <>
            {/* Match with you */}
            <View style={styles.chipsContainer}>
              <Text style={fontStyles.headerSmall}>Match with you</Text>
              <View style={styles.seeMoreContainer}>
                <Text
                  style={[fontStyles.bodySmall, styles.seeMore]}
                  onPress={toggleMatchExpand}>
                  {matchExpand ? 'See less' : 'See more'}
                </Text>
                {matchExpand ? (
                  <>
                    <LofftIcon
                      name="chevron-up"
                      size={25}
                      color={Color.Blue[100]}
                    />
                  </>
                ) : (
                  <>
                    <LofftIcon
                      name="chevron-down"
                      size={25}
                      color={Color.Blue[100]}
                    />
                  </>
                )}
              </View>
            </View>
            <View style={styles.matchWithYouContainer}>
              <Chips
                tags={positiveFeaturesTags}
                features={true}
                emoji
                expand={matchExpand}
              />
            </View>
            <View style={styles.matchWithYouContainer}>
              <Chips
                tags={positiveCharTags}
                features={false}
                emoji
                expand={matchExpand}
              />
            </View>

            {/* Other */}
            <View style={styles.chipsContainer}>
              <Text style={fontStyles.headerSmall}>Other</Text>
              <View style={styles.seeMoreContainer}>
                <Text
                  onPress={toggleOtherExpand}
                  style={[fontStyles.bodySmall, styles.seeMore]}>
                  {otherExpand ? 'See less' : 'See more'}
                </Text>
                {otherExpand ? (
                  <>
                    <LofftIcon
                      name="chevron-up"
                      size={25}
                      color={Color.Blue[100]}
                    />
                  </>
                ) : (
                  <>
                    <LofftIcon
                      name="chevron-down"
                      size={25}
                      color={Color.Blue[100]}
                    />
                  </>
                )}
              </View>
            </View>

            <View style={styles.matchWithYouContainer}>
              <Chips
                tags={negativeFeaturesTags}
                features={true}
                emoji
                expand={otherExpand}
              />
            </View>
            <View style={styles.matchWithYouContainer}>
              <Chips
                tags={negativeCharTags}
                features={false}
                emoji
                expand={otherExpand}
              />
            </View>
          </>
        )}
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
    marginTop: size(23),
    marginBottom: size(5),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'baseline',
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

  seeMoreContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  seeMore: {
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
