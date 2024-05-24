import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Redux 🏗️
import {useAppDispatch} from 'reduxCore/hooks';
import {applyForAdvert} from 'reduxFeatures/adverts/advertMiddleware';

// StyleSheet 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

import Chips from 'components/buttons/Chips';
import {CoreButton} from 'components/buttons/CoreButton';
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Helpers
import {dateFormatConverter} from 'helpers/dateFormatConverter';

// Types 🏷
import type {FlatInfoContainerProps} from './types';
import {size} from 'react-native-responsive-sizes';

const FlatInfoContainer = ({
  advert,
  button,
  navigation,
}: FlatInfoContainerProps) => {
  const dispatch = useAppDispatch();

  const [descriptionExpanded, setDescriptionExpansion] = useState(false);
  const expander = () => {
    setDescriptionExpansion(!descriptionExpanded);
  };

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
        <Text style={[fontStyles.headerSmall]}>{advert.flat.tagline}</Text>
        <View style={styles.LegendContainer}>
          <View style={styles.firstRowLegendContainer}>
            <View style={styles.iconContainer}>
              <LofftIcon name="banke-note" size={23} color={Color.Black[30]} />
              <Text style={[fontStyles.bodyMedium, styles.iconMargin]}>
                {advert.price}€
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <LofftIcon name="ruler" size={23} color={Color.Black[30]} />
              <Text style={[fontStyles.bodyMedium, styles.iconMargin]}>
                26m2
              </Text>
            </View>
          </View>
          <View style={styles.secondRowLegendContainer}>
            <LofftIcon name="calendar" size={23} color={Color.Black[30]} />
            <Text style={[fontStyles.bodyMedium, styles.iconMargin]}>
              From: {dateFormatConverter({date: {seconds: advert.fromDate}})}{' '}
              {advert.toDate &&
                `- ${dateFormatConverter({
                  date: {seconds: advert.toDate},
                })}`}
            </Text>
          </View>
        </View>
        <View style={styles.descriptionMargin}>
          <Text style={{color: Color.Black[80]}}>
            {advert.flat.description?.substring(
              0,
              Number(
                `${descriptionExpanded ? advert.flat.description.length : 200}`,
              ),
            )}
          </Text>
          {advert.flat.description && advert.flat.description.length > 200 && (
            <CoreButton
              value={descriptionExpanded ? 'Read Less' : 'Read More'}
              style={styles.readMoreButton}
              textStyle={[fontStyles.headerSmall, {color: Color.Lavendar[100]}]}
              disabled={false}
              onPress={() => expander()}
            />
          )}
        </View>

        {advert.user?.user_type === 'lessor' ? (
          <>
            <Text
              style={[
                fontStyles.headerSmall,
                styles.marginFlatCharacteristics,
              ]}>
              Flat Characteristics
            </Text>
            <View style={styles.marginChipsCharacteristics}>
              <Chips tags={advert.flat.characteristics} features={true} emoji />
            </View>
          </>
        ) : (
          <>
            <Text
              style={[
                fontStyles.headerSmall,
                styles.marginFlatCharacteristics,
              ]}>
              Match with you
            </Text>
            <View style={styles.marginChipsOther}>
              <Chips tags={advert.flat.characteristics} features={true} emoji />
            </View>

            <Text
              style={[
                fontStyles.headerSmall,
                styles.marginFlatCharacteristics,
              ]}>
              Other
            </Text>
            <View style={styles.marginChipsOther}>
              {/* <Chips tags={featuresTags.negativeTags} features={true} emoji />
          <Chips
            tags={characteristicsTags.negativeTags}
            features={false}
            emoji
          /> */}
            </View>
          </>
        )}

        {button && (
          <View>
            <Text style={[fontStyles.bodySmall, styles.countDownTimer]}>
              Application closing in 1d 8h
            </Text>

            <CoreButton
              value={advert.applied ? 'Applied' : 'Apply'}
              style={styles.coreButtonCustom}
              disabled={advert.applied}
              onPress={() => {
                dispatch(applyForAdvert(advert.id ?? 1));
                navigation.navigate('applyforflat');
              }}
            />
          </View>
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
    marginVertical: size(10),
    borderRadius: 8,
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
  iconContainer: {flexDirection: 'row', alignItems: 'center'},
  iconMargin: {marginLeft: size(10), marginRight: size(100)},
  descriptionMargin: {marginTop: size(20)},
  readMoreButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    marginTop: size(14),
    height: size(40),
  },
  marginFlatCharacteristics: {marginTop: size(23), marginBottom: size(5)},
  marginChipsCharacteristics: {marginTop: size(10), marginBottom: size(20)},
  marginChipsOther: {marginTop: size(10)},
});

export default FlatInfoContainer;
