import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

// Styles
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// Components
import {CoreButton} from 'components/buttons/CoreButton';
import UserBlobCard from 'components/cards/UserBlobCard';

import {useNavigation} from '@react-navigation/native';
import {SecondRoundApplicantsWithSelected} from './types';

const SeeProfilesScreen = ({route}: any) => {
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
  const [userSelectedByProfile, setUserSelectedByProfile] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [maxSelect, setMaxSelect] = useState(5);
  const [finalRound, setFinalRound] = useState([]);
  const [secondRoundProfiles, setSecondRoundProfiles] = useState<
    SecondRoundApplicantsWithSelected[]
  >(secondRoundApplicantsWithSelected);
  const navigation = useNavigation();

  const {currentAdvert, selectedProfile} = route.params;
  console.log('selectedProfile', secondRoundApplicantsWithSelected);

  const selectProfiles = (id: number) => {
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
  console.log("secondRoundProfiles", secondRoundProfiles)

  return (
    <View style={styles.pageWrapper}>
      <Text style={[styles.header, fontStyles.headerSmall]}>Applicants</Text>
      <SafeAreaView style={styles.safeareaview}>
        <ScrollView bounces={true} contentContainerStyle={styles.scrollView}>
          {secondRoundProfiles.map((el, index) => (
            <UserBlobCard
              secondRoundProfile={el}
              key={index + 1}
              selectProfiles={selectProfiles}
              navigation={navigation}
              currentAdvert={currentAdvert}
              characteristics={currentAdvert.flat.characteristics}
              sayHi={'sayHi'}
            />
          ))}
        </ScrollView>
      </SafeAreaView>

      <CoreButton
        disabled={finalRound.length >= 1 ? false : true}
        value={`Selected ${finalRound.length}/${maxSelect}`}
        style={{width: '90%', position: 'absolute', bottom: 10}}
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
});

export default SeeProfilesScreen;
