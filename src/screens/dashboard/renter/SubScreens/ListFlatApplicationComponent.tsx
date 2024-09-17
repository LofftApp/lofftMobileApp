import React from 'react';
import {StyleSheet, ScrollView, SafeAreaView} from 'react-native';

// Components  🪢
import ListFlatApplicationCard from 'components/cards/ListFlatApplicationCard';

// Helpers 🧰
import {size} from 'react-native-responsive-sizes';

// Types  🏷
import type {ListFlatApplicationComponentProps} from './types';

const ListFlatApplicationComponent = ({
  applications,
  isLessor,
}: ListFlatApplicationComponentProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.flatCardContainer}>
      <SafeAreaView>
        {applications.map(application => {
          return (
            <ListFlatApplicationCard
              key={application.id}
              application={application}
              isLessor={isLessor}
            />
          );
        })}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flatCardContainer: {
    marginHorizontal: size(16),
  },
});

export default ListFlatApplicationComponent;
