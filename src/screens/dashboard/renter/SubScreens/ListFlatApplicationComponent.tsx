import React from 'react';
import {StyleSheet, ScrollView, SafeAreaView, Text} from 'react-native';

// Components  🪢
import ListFlatApplicationCard from 'components/cards/ListFlatApplicationCard';
import {fontStyles} from 'styleSheets/fontStyles';

// Helpers 🧰
import {size} from 'react-native-responsive-sizes';

// Types  🏷
import type {ListFlatApplicationComponentProps} from './types';

const ListFlatApplicationComponent = ({
  applications,
  isLessor,
}: ListFlatApplicationComponentProps) => {
  if (applications.length === 0 || !applications) {
    return (
      <SafeAreaView style={styles.notFoundContainer}>
        <Text style={fontStyles.headerSmall}>{'No applications found'}</Text>
      </SafeAreaView>
    );
  }
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
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListFlatApplicationComponent;
