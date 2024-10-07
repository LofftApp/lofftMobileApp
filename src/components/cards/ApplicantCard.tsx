import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native';
//Redux

import {useGetAdvertByIdQuery} from 'reduxFeatures/adverts/advertApi';

//Styles
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// External
import CheckBox from 'components/coreComponents/interactiveElements/CheckBox';
import Collapsible from 'react-native-collapsible';

//Components
import LofftIcon from 'components/lofftIcons/LofftIcon';
import Chips from 'components/buttons/Chips';

// Helpers
import {size} from 'react-native-responsive-sizes';
import {tagSorter} from 'helpers/tagSorter';
import {matchMaker} from 'helpers/matchMaker';

// Constants
import {MAX_SELECT} from 'screens/dashboard/landlord/SubScreens/SeeApplicantsScreen';

// Types
import type {ApplicantCardProps} from './types';

const ApplicantCard = ({
  currentSelectedNums,
  selectApplication,
  application,
}: ApplicantCardProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const {width} = useWindowDimensions();

  const applicant = application.applicant;

  const {data: advert} = useGetAdvertByIdQuery(application.advertId);

  console.log('user characteristics', applicant?.characteristics);
  console.log('flat characteristics', advert?.flat.characteristics);
  console.log('user filter', applicant?.filters);
  console.log('flat features', advert?.flat.features);

  if (!applicant) {
    return null;
  }
  const {email: name} = applicant;

  const toggleCheckbox = () => {
    if (currentSelectedNums >= MAX_SELECT) {
      if (application.round1) {
        selectApplication(application.id);
      }
    } else {
      selectApplication(application.id);
    }
  };

  const toggleCollapsed = () => {
    setCollapsed(prev => !prev);
  };

  // const featuresTags = tagSorter(
  //   applicant.filters ?? [],
  //   advert?.flat.features ?? [],
  // );
  // const positiveFeaturesTags = featuresTags.positiveTags;
  // const negativeFeaturesTags = featuresTags.negativeTags;

  // const charTags = tagSorter(
  //   applicant.characteristics ?? [],
  //   advert?.flat.characteristics ?? [],
  // );

  // const positiveCharTags = charTags.positiveTags;
  // const negativeCharTags = charTags.negativeTags;

  const positiveFeaturesTags = matchMaker(
    applicant.filters ?? [],
    advert?.flat.features ?? [],
  )[0];
  const negativeFeaturesTags = matchMaker(
    applicant.filters ?? [],
    advert?.flat.features ?? [],
  )[1];

  const positiveCharTags = matchMaker(
    applicant.characteristics ?? [],
    advert?.flat.characteristics ?? [],
  )[0];

  const negativeCharTags = matchMaker(
    applicant.characteristics ?? [],
    advert?.flat.characteristics ?? [],
  )[1];

  return (
    <View style={[styles.outterContainer, {width: width - 30}]}>
      <View style={[styles.innerContainer]}>
        <CheckBox
          value={application.round1}
          disabled={!application.round1 && currentSelectedNums >= MAX_SELECT}
          onPress={toggleCheckbox}
        />
        <View style={styles.details}>
          <Text style={[fontStyles.bodyMedium, styles.nameMargin]}>
            {name?.split('')[0].toUpperCase()}.
          </Text>
          <Text style={[fontStyles.bodyMedium, {color: Color.Mint[100]}]}>
            {applicant.matchScore}% Match
          </Text>
        </View>
        <Pressable style={styles.iconContainer} onPress={toggleCollapsed}>
          <LofftIcon
            name={collapsed ? 'chevron-up' : 'chevron-down'}
            size={35}
            color={Color.Blue[80]}
          />
        </Pressable>
      </View>

      <Collapsible collapsed={!collapsed} duration={300}>
        <View style={styles.collapsedExpand}>
          <Text style={fontStyles.headerSmall}>Match with you</Text>
          <View style={styles.chipsContainer}>
            <Chips tags={positiveFeaturesTags} emoji features xs open expand />
            <Chips tags={positiveCharTags} emoji xs open expand />
          </View>
          <Text style={[fontStyles.headerSmall]}>Other</Text>
          <View style={styles.chipsContainer}>
            <Chips
              tags={negativeFeaturesTags}
              emoji
              features
              whiteBg
              xs
              open
              expand
            />
            <Chips tags={negativeCharTags} emoji whiteBg xs open expand />
          </View>
        </View>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  outterContainer: {
    backgroundColor: Color.Lavendar[10],
    borderRadius: 10,
    marginBottom: size(20),
    padding: size(15),
    height: 'auto',
  },
  innerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  matcher: {
    color: Color.Mint[100],
  },
  collapsedExpand: {
    marginTop: size(10),
    gap: size(10),
    height: 'auto',
  },
  iconContainer: {
    padding: size(10),
  },
  nameMargin: {
    marginRight: size(20),
  },
  chipsContainer: {
    flexWrap: 'wrap',
  },
});

export default ApplicantCard;
