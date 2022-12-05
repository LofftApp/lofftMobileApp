import React from 'react';
import {View, Platform, StyleSheet} from 'react-native';

// StyleSheets
import {CoreStyleSheet} from '../../../styles/CoreDesignStyleSheet';

const PrimaryScreen = ({navigation, children}) => {
  return (
    // Screen back button
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <View style={styles.boundries}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  boundries: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 5,
  },
});

export default PrimaryScreen;
