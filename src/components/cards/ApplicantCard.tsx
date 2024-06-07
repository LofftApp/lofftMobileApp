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

// Types
import type {ApplicantCardProps} from './types';

const ApplicantCard = ({
  currentSelectedNums,
  maxSelect,
  selectProfile,
  applicant,
}: ApplicantCardProps) => {
  const {id, email: name} = applicant;

  const [activateBox, setActiveBox] = useState(false);
  const [accordion, setAccordion] = useState(false);

  const checkClick = () => {
    if (currentSelectedNums >= maxSelect) {
      if (activateBox) {
        setActiveBox(false);
        selectProfile(id);
      }
    } else {
      setActiveBox(!activateBox);
      selectProfile(id);
    }
  };

  const activateAccordion = () => {
    setAccordion(!accordion);
  };

  const {height, width} = useWindowDimensions();

  return (
    <View style={[styles.outterContainer, {width: width - 20}]}>
      <View style={[styles.innerContainer]}>
        <CheckBox value={activateBox} onPress={() => checkClick()} />
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

      {accordion ? (
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
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  outterContainer: {
    backgroundColor: Color.Lavendar[10],
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
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
    marginTop: 20,
  },
  iconContainer: {
    padding: 10,
  },
  nameMargin: {
    marginRight: 20,
  },
  otherMargin: {
    marginTop: 20,
  },
});

export default ApplicantCard;
