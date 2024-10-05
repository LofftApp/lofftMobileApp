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
import SeeMoreButton from 'components/buttons/SeeMoreButton';
import Collapsible from 'react-native-collapsible';

// Helpers
import {dateFormatConverter} from 'helpers/dateFormatConverter';
import {size} from 'react-native-responsive-sizes';
import {truncateTextAtWord} from 'helpers/truncateTextAtWord';
import {tagSorter} from 'helpers/tagSorter';

// Types 🏷
import {UserState} from 'reduxFeatures/user/types';
import {Advert} from 'reduxFeatures/adverts/types';

const FlatInfoSubScreen = ({advert}: {advert: Advert}) => {
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
  const truncatedDescription = truncateTextAtWord(
    advert.flat.description,
    maxDescriptionLength,
  );
  const hiddenDescription = advert.flat.description.slice(
    truncatedDescription.length,
  );
  const isTruncated =
    advert.flat.description.length > truncatedDescription.length;

  return (
    <>
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
                {advert.monthlyRent} {advert.currency}
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
            <Text style={fontStyles.bodyMedium}>
              From: {dateFormatConverter({date: {seconds: advert.fromDate}})}{' '}
              {`- ${dateFormatConverter({
                date: {seconds: advert.toDate || 1715990400},
              })}`}
            </Text>
          </View>
        </View>

        <View style={styles.descriptionMargin}>
          <Text style={{color: Color.Black[80]}}>
            {truncatedDescription}
            {!descriptionExpanded && isTruncated && '...'}
          </Text>

          {isTruncated && (
            <Collapsible collapsed={!descriptionExpanded} duration={300}>
              <Text style={{color: Color.Black[80]}}>{hiddenDescription}</Text>
            </Collapsible>
          )}

          {advert.flat.description &&
            advert.flat.description.length > maxDescriptionLength && (
              <CoreButton
                value={descriptionExpanded ? 'Read Less' : 'Read More'}
                style={styles.coreButtonStyle}
                textStyle={[
                  fontStyles.headerSmall,
                  {color: Color.Lavendar[100]},
                ]}
                invert
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
              <SeeMoreButton
                collapsed={flatCharExpand}
                toggleExpand={toggleFlatCharExpand}
              />
            </View>
            <Chips
              tags={advert.flat.features}
              features={true}
              emoji
              expand={flatCharExpand}
            />
            <Chips
              tags={advert.flat.characteristics}
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

              <SeeMoreButton
                collapsed={matchExpand}
                toggleExpand={toggleMatchExpand}
              />
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
              <SeeMoreButton
                collapsed={otherExpand}
                toggleExpand={toggleOtherExpand}
              />
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
    </>
  );
};

const styles = StyleSheet.create({
  matchContainer: {
    width: '100%',
    backgroundColor: Color.Mint[10],
    marginVertical: size(20),
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: size(20),
    alignItems: 'center',
  },
  infoContainer: {
    width: '100%',
    marginTop: size(10),
  },
  LegendContainer: {
    width: '100%',
    marginTop: size(20),
  },
  firstRowLegendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: size(20),
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size(10),
  },
  iconMargin: {
    marginRight: size(70),
  },
  secondRowLegendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size(10),
  },

  descriptionContainer: {
    marginTop: size(10),
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

  line: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',
  },

  coreButtonStyle: {
    marginTop: size(20),
  },

  descriptionMargin: {
    marginTop: size(20),
  },
});

export default FlatInfoSubScreen;
