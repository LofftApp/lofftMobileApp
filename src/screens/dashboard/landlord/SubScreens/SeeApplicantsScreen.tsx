import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
// Styles
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

import {getProfile} from '@Redux/user/usersMiddleware';
import {useAppSelector, useAppDispatch} from '@ReduxCore/hooks';
import LofftIcon from '@Components/lofftIcons/LofftIcon';
import {useNavigation} from '@react-navigation/native';

import ApplicantCard from '@Components/cards/ApplicantCard';
import BackButton from '@Components/buttons/BackButton';
import ApplicantsCardAdvanced from '@Components/cards/ApplicantCardAdvanced';
import {CoreButton} from '@Components/buttons/CoreButton';

const SeeApplicantsScreen = ({route}: any) => {
  const {advert} = route.params;
  const [applicants, setApplicants] = useState(advert.applicants);
  const navigation = useNavigation();
  const [maxSelect, setMaxSelected] = useState(5);
  const [finalRound, setFinalRound] = useState([]);

  const mutateApplicants = () => {
    setApplicants(
      applicants.map(applicant => {
        return {...applicant, selected: false};
      }),
    );
  };

  useEffect(() => {
    mutateApplicants();
  },[]);



  const selectProfile = id => {
    // const feedingStyle = { width: '92%', position: 'absolute', bottom: 10, height: '8%' };
    const updatedProfiles = applicants.map(el => {
      if (el.id === id) {
        return {
          ...el,
          selected: !el.selected,
        };
      } else {
        return el;
      }
    });

    setApplicants(updatedProfiles);

    const selectedProfilesOnly = updatedProfiles.filter(el => el.selected);

    setFinalRound(selectedProfilesOnly);

  };

  console.log(applicants)

  return (
    <View style={styles.pageWrapper}>
      <View style={styles.header}>
        <Pressable
          style={styles.iconContainer}
          onPress={() => navigation.goBack()}>
          <LofftIcon name="chevron-left" size={35} color={Color.Lavendar[80]} />
        </Pressable>
        <View style={styles.headerText}>
          <Text style={fontStyles.headerSmall}>Applicants</Text>
        </View>
      </View>

      <SafeAreaView style={styles.safeareaview}>
        <ScrollView bounces={true} contentContainerStyle={styles.scrollView}>
          {applicants.map((el, index) => (
            <ApplicantCard
              key={index + 1}
              maxSelect={maxSelect}
              selectProfile={selectProfile}
              currentSelectedNums={finalRound.length}
              name={el.email}
              id={el.id}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
      <CoreButton
        value={`Selected ${finalRound.length}/${maxSelect}`}
        style={{width: '90%', position: 'absolute', bottom: 10}}
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
  header: {
    marginTop: 60,
    width: '100%',
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
    position: 'relative',
  },
  scrollView: {
    paddingBottom: 130,
    marginTop: 20,
  },
});

export default SeeApplicantsScreen;
