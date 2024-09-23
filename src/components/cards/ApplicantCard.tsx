import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native';

import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// External
import CheckBox from 'components/coreComponents/interactiveElements/CheckBox';
import LofftIcon from 'components/lofftIcons/LofftIcon';
import Chips from 'components/buttons/Chips';

// Helpers
import {size} from 'react-native-responsive-sizes';

// Constants
import {MAX_SELECT} from 'screens/dashboard/landlord/SubScreens/SeeApplicantsScreen';

// Types
import type {ApplicantCardProps} from './types';

const ApplicantCard = ({
  currentSelectedNums,
  selectApplication,
  application,
}: ApplicantCardProps) => {
  const [accordion, setAccordion] = useState(false);
  const {width} = useWindowDimensions();
  const applicant = application.applicant;
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

  const activateAccordion = () => {
    setAccordion(!accordion);
  };

  return (
    <View style={[styles.outterContainer, {width: width - 20}]}>
      <View style={[styles.innerContainer]}>
        <CheckBox
          value={application.round1}
          disabled={!application.round1 && currentSelectedNums >= MAX_SELECT}
          onPress={() => toggleCheckbox()}
        />
        <View style={styles.details}>
          <Text style={[fontStyles.bodyMedium, styles.nameMargin]}>
            {name?.split('')[0].toUpperCase()}.
          </Text>
          <Text style={[fontStyles.bodyMedium, {color: Color.Mint[100]}]}>
            (96 % Match)
          </Text>
        </View>
        <Pressable
          style={styles.iconContainer}
          onPress={() => activateAccordion()}>
          <LofftIcon
            name={accordion ? 'chevron-up' : 'chevron-down'}
            size={35}
            color={Color.Lavendar[80]}
          />
        </Pressable>
      </View>

      {accordion && (
        <View style={styles.accordionExpand}>
          <Text style={fontStyles.headerSmall}>Match with you</Text>
          <Chips
            tags={[
              {
                name: 'Adam',
                emoji: '👾',
              },
              {
                name: 'James',
                emoji: '🚀',
              },
              {
                name: 'Freddy',
                emoji: '🏓',
              },
              {
                name: 'Josh',
                emoji: '👮🏽',
              },
            ]}
            emoji={true}
            features={true}
          />

          <Text style={[fontStyles.headerSmall, styles.otherMargin]}>
            Other
          </Text>
          <Chips
            tags={[
              {
                name: 'Adam',
                emoji: '👾',
              },
              {
                name: 'James',
                emoji: '🚀',
              },
              {
                name: 'Freddy',
                emoji: '🏓',
              },
              {
                name: 'Josh',
                emoji: '👮🏽',
              },
            ]}
            emoji={true}
            features={true}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outterContainer: {
    backgroundColor: Color.Lavendar[10],
    borderRadius: 10,
    marginBottom: size(20),
    padding: size(15),
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
  accordionExpand: {
    marginTop: size(20),
  },
  iconContainer: {
    padding: size(10),
  },
  nameMargin: {
    marginRight: size(20),
  },
  otherMargin: {
    marginTop: size(20),
  },
});

export default ApplicantCard;
