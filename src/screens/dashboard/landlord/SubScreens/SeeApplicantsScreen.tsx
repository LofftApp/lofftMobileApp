import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
// Styles
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

import {getProfile} from '@Redux/user/usersMiddleware';
import {useAppSelector, useAppDispatch} from '@ReduxCore/hooks';
import LofftIcon from '@Components/lofftIcons/LofftIcon';
import {useNavigation} from '@react-navigation/native';

import ApplicantCard from '@Components/cards/ApplicantCard';
import BackButton from '@Components/buttons/BackButton';

const SeeApplicantsScreen = ({route}: any) => {
  const {advert} = route.params;
  const [applicants, setApplicants] = useState(advert.applicants);
  const navigation = useNavigation();

  const mutateApplicants = () => {
    setApplicants(
      applicants.map(applicant => {
        return {...applicant, selected: false};
      }),
    );
  };

  useEffect(() => {
    mutateApplicants();
  }, [])



  return (
    <View style={styles.pageWrapper}>
      <View style={styles.center}>
        <View style={styles.header}>
          <Pressable
            style={styles.iconContainer}
            onPress={() => navigation.goBack()}>
            <LofftIcon
              name="chevron-left"
              size={35}
              color={Color.Lavendar[80]}
            />
          </Pressable>
          <View style={styles.headerText}>
            <Text style={fontStyles.headerSmall}>Applicants</Text>
          </View>
        </View>

        {applicants.map((el, index) => (
          <ApplicantCard key={index + 1} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageWrapper: {
    backgroundColor: Color.White[100],
    flex: 1,
  },
  center: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    textAlign: 'center',
    position: 'relative',
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

export default SeeApplicantsScreen;
