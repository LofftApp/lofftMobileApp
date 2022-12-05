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
        styles.boundries,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  boundries: {
    borderColor: 'red',
    borderWidth: 2,
    paddingTop: 0,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});

export default PrimaryScreen;
