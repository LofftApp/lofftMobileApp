import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Styles
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// Components
import {CoreButton} from 'components/buttons/CoreButton';
import UserBlobCard from 'components/cards/UserBlobCard';

// Types
import type {
  SecondRoundApplicantsWithSelected,
  SeeProfilesScreenProp,
} from './types';
import { MAX_SELECTED } from './SeeApplicantsScreen';

const SeeProfilesScreen = ({route}: SeeProfilesScreenProp) => {
  console.log('route.params', route.params);

  const secondRoundApplicantsWithSelected =
    route.params.secondRoundApplicants.map(
      (applicant: SecondRoundApplicantsWithSelected) => {
        return {...applicant, secondRoundSelected: false};
      },
    );
  console.log(
    'secondRoundApplicantsWithSelected',
    secondRoundApplicantsWithSelected,
  );
  const {currentAdvert} = route.params;
  const [userSelectedByProfile, setUserSelectedByProfile] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [finalRound, setFinalRound] = useState<
    SecondRoundApplicantsWithSelected[]
  >([]);
  const [secondRoundProfiles, setSecondRoundProfiles] = useState<
    SecondRoundApplicantsWithSelected[]
  >(secondRoundApplicantsWithSelected);

  const selectProfiles = (id: number | null) => {
    const updatedProfiles = secondRoundProfiles.map(el => {
      if (el.id === id) {
        return {
          ...el,
          secondRoundSelected: !el.secondRoundSelected,
        };
      } else {
        return el;
      }
    });

    setSecondRoundProfiles(updatedProfiles);

    const selectedProfilesOnly = updatedProfiles.filter(
      el => el.secondRoundSelected,
    );

    setFinalRound(selectedProfilesOnly);
  };
  console.log('secondRoundProfiles', secondRoundProfiles);

  return (
    <View style={styles.pageWrapper}>
      <Text style={[styles.header, fontStyles.headerSmall]}>Applicants</Text>
      <SafeAreaView style={styles.safeareaview}>
        <ScrollView bounces={true} contentContainerStyle={styles.scrollView}>
          {secondRoundProfiles.map(el => (
            <UserBlobCard
              key={el.id}
              secondRoundProfile={el}
              selectProfiles={selectProfiles}
              currentAdvert={currentAdvert}
              // sayHi={'sayHi'}
            />
          ))}
        </ScrollView>
      </SafeAreaView>

      <CoreButton
        disabled={finalRound.length >= 1 ? false : true}
        value={`Selected ${finalRound.length}/${MAX_SELECT}`}
        style={styles.selectedButton}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    alignItems: 'center',
    width: '100%',
  },
  scrollView: {
    alignItems: 'center',
  },
  header: {
    marginTop: 70,
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
  },
  headerText: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  safeareaview: {
    marginTop: 0,
  },
  selectedButton: {width: '90%', position: 'absolute', bottom: 10},
});

export default SeeProfilesScreen;
