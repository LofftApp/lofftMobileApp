import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const LessorIndexScreen = () => {
  return (
    <View style={styles.landlordIndexContainer}>
      <Text>Hello From the landlord Index Screen 👋</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  landlordIndexContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LessorIndexScreen;
