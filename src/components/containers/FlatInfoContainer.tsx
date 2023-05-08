import React, {useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';

// Redux 🏗️
import {useAppDispatch} from '@ReduxCore/hooks';
import {applyForAdvert} from '@Redux/adverts/advertMiddleware';

// StyleSheet 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

import Chips from '@Components/buttons/Chips';
import {CoreButton} from '@Components/buttons/CoreButton';
import LofftIcon from '@Components/lofftIcons/LofftIcon';

// Helpers
import {dateFormatConverter} from '@Helpers/dateFormatConverter';

interface FlatInfoContainerProps {
  advert: {
    id: number;
    matchScore: number;
    address: string;
    price: number;
    fromDate: number;
    untilDate: number;
    applied: boolean;
    lessor: boolean;
    flat: {
      tagline: string;
      description: string;
      address: string;
    };
  };
  button: boolean;
  navigation: any;
}

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
      {!advert.lessor ? (
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
      ) : null}

      <View style={styles.infoContainer}>
        <Text style={fontStyles.bodySmall}>{advert.flat.address}</Text>
        <Text style={{color: Color.Black[80]}}>{advert.address}</Text>
        <Text style={[fontStyles.headerSmall]}>{advert.flat.tagline}</Text>
        <View style={styles.LegendContainer}>
          <View style={styles.firstRowLegendContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <LofftIcon name="banke-note" size={23} color={Color.Black[30]} />
              <Text
                style={[
                  fontStyles.bodyMedium,
                  {marginLeft: 10, marginRight: 100},
                ]}>
                {advert.price}€
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <LofftIcon name="ruler" size={23} color={Color.Black[30]} />
              <Text style={[fontStyles.bodyMedium, {marginLeft: 10}]}>
                26m2
              </Text>
            </View>
          </View>
          <View style={styles.secondRowLegendContainer}>
            <LofftIcon name="calendar" size={23} color={Color.Black[30]} />
            <Text style={[fontStyles.bodyMedium, {marginLeft: 10}]}>
              From: {dateFormatConverter({date: {seconds: advert.fromDate}})}{' '}
              {advert.untilDate
                ? `- ${dateFormatConverter({
                    date: {seconds: advert.untilDate},
                  })}`
                : null}
            </Text>
          </View>
        </View>
        <View style={{marginTop: 21}}>
          <Text style={{color: Color.Black[80]}}>
            {advert.flat.description.substring(
              0,
              `${descriptionExpanded ? advert.flat.description.length : 200}`,
            )}
          </Text>
          {advert.flat.description.length > 200 ? (
            <CoreButton
              value={descriptionExpanded ? 'Read Less' : 'Read More'}
              style={{
                backgroundColor: 'white',
                borderWidth: 2,
                marginTop: 14,
                height: 40,
              }}
              textStyle={[fontStyles.headerSmall, {color: Color.Lavendar[100]}]}
              disabled={false}
              onPress={() => expander()}
            />
          ) : null}
        </View>
        {/* ! Build logic to match the values common with the user */}
        <Text
          style={[fontStyles.headerSmall, {marginTop: 23, marginBottom: 5}]}>
          Match with you
        </Text>
        <View style={{marginTop: 10}}>
          <Chips />
        </View>

        <Text
          style={[fontStyles.headerSmall, {marginTop: 23, marginBottom: 5}]}>
          Other
        </Text>
        <View style={{marginTop: 10}}>
          <Chips />
        </View>

        {button ? (
          <View>
            <Text style={[fontStyles.bodySmall, styles.countDownTimer]}>
              Application closing in 1d 8h
            </Text>

            <CoreButton
              value={advert.applied ? 'Applied' : 'Apply'}
              style={styles.coreButtonCustom}
              disabled={advert.applied}
              onPress={() => {
                dispatch(applyForAdvert(advert.id));
                navigation.navigate('applyforflat');
              }}
            />
          </View>
        ) : null}

        {/* Continue codeing from here !!!! */}
      </View>
    </View>
  );
};

export default FlatInfoContainer;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: Color.White[100],
  },
  centralizerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchContainer: {
    width: '100%',
    backgroundColor: Color.Mint[10],
    marginVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  infoContainer: {
    width: '100%',
    marginTop: 15,
  },
  LegendContainer: {
    width: '90%',
    marginTop: 20,
  },
  firstRowLegendContainer: {
    flexDirection: 'row',
    marginBottom: 20,
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
    marginTop: 20,
  },
  coreButtonCustom: {
    marginTop: 14,
  },
});
