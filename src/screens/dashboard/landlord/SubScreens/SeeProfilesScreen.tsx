import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

// Styles
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

// Components
import {CoreButton} from 'components/buttons/CoreButton';
import UserBlobCard from 'components/cards/UserBlobCard';

import {useNavigation} from '@react-navigation/native';

const SeeProfilesScreen = ({route}: any) => {
  const [userSelectedByProfile, setUserSelectedByProfile] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [maxSelect, setMaxSelect] = useState(5);
  const [finalRound, setFinalRound] = useState([]);
  const [secondRoundProfiles, setSecondRoundProfiles] = useState([]);
  const navigation = useNavigation();

  const {currentAdvert, selectedProfile} = route.params || null;

  const mutateApplicants = () => {
    setSecondRoundProfiles(
      route.params.secondRoundApplicants.map(applicant => {
        return {...applicant, secondRoundselected: false};
      }),
    );
  };

  useEffect(() => {
    mutateApplicants();
    setUserSelectedByProfile(selectedProfile);
  }, []);

  const selectProfiles = id => {
    const updatedProfiles = secondRoundProfiles.map(el => {
      if (el.id === id) {
        return {
          ...el,
          secondRoundselected: !el.secondRoundselected,
        };
      } else {
        return el;
      }
    });

    setSecondRoundProfiles(updatedProfiles);

    const selectedProfilesOnly = updatedProfiles.filter(
      el => el.secondRoundselected,
    );

    setFinalRound(selectedProfilesOnly);
  };

  return (
    <View style={styles.pageWrapper}>
      <Text style={[styles.header, fontStyles.headerSmall]}>Applicants</Text>
      <SafeAreaView style={styles.safeareaview}>
        <ScrollView bounces={true} contentContainerStyle={styles.scrollView}>
          {secondRoundProfiles.map((el, index) => (
            <UserBlobCard
              id={el.id}
              name={el.email}
              secondRoundselected={el.secondRoundselected}
              key={index + 1}
              selectProfiles={selectProfiles}
              navigation={navigation}
              currentAdvert={currentAdvert}
              characteristics={currentAdvert.flat.characteristics}
              sayHi={sayHi}
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
});

export default SeeProfilesScreen;
