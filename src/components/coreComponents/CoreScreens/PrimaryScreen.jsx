import React from 'react';
import {
  View,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

// StyleSheets
import {CoreStyleSheet} from '../../../styles/CoreDesignStyleSheet';

const PrimaryScreen = ({background = false, children}) => {
  return (
    // Screen back button
    <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
      <View
        style={[
          CoreStyleSheet.viewContainerStyle,
          background ? {paddingHorizontal: 0} : null,
          Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
        ]}>
        <View style={styles.boundries}>{children}</View>
      </View>
    </TouchableWithoutFeedback>
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