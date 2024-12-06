import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

// Cards 🃏
import ApplicantsCard from 'components/cards/ListViewApplicantCard';

// Redux 🏗️
import {useAppSelector} from 'reduxCore/hooks';

// Components 🪢
import BackButton from 'components/buttons/BackButton';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {CoreButton} from 'components/buttons/CoreButton';

const ApplicantsIndexScreen = ({navigation}: any) => {
  const applicants = useAppSelector(
    (state: any) => state.adverts.adverts[0].applicants,
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.applicantsHeight}>
        <BackButton title="Applicants" onPress={() => navigation.goBack()} />
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        {applicants.map((el: any, index: number) => {
          return <ApplicantsCard key={index} email={el.email} />;
        })}
      </ScrollView>
      <View style={styles.selectedButton}>
        <CoreButton value="Confirm selected (add interpolation of selected boxes)" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 72,
    paddingBottom: 16,
    flex: 1,
    backgroundColor: Color.White[100],
  },
  applicantsHeight: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  scrollViewContainer: {
    paddingVertical: 10,
  },
  selectedButton: {
    paddingHorizontal: 16,
  },
});

export default ApplicantsIndexScreen;
