import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const SeeApplicantsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>See 100 Applicants Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SeeApplicantsScreen;
