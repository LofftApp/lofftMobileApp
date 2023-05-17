import React from 'react';

import {Text, View, StyleSheet} from 'react-native';

const ShortListApplicantsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>
        Welcome Short List Application Screen where you will Select 20
        Applicants
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShortListApplicantsScreen;
