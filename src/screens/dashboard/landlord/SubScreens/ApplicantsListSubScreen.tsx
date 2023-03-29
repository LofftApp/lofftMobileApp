import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

// Redux 🏗️
import {useAppSelector} from '@ReduxCore/hooks';

// Components 🪢
import ListViewApplicantCard from '@Components/cards/ListViewApplicantCard';

const ApplicantsListSubScreen = ({navigation, checked}: any) => {
  /* list all applicants from redux for the ListViewApplicantCard*/
  const applicants = useAppSelector((state: any) => state.flats.allFlats);

  console.log(checked);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.applicantsCardContainer}>
      <View>
        {applicants.map((el: any, index: number) => {
          return (
            <ListViewApplicantCard
              key={index + 1}
              match={el?.matchP}
              flatId={el.flatId}
              district={el.district}
              chips={el.chips}
              i={index}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  applicantsCardContainer: {
    marginHorizontal: 16,
  },
});

export default ApplicantsListSubScreen;
