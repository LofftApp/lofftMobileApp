import React from 'react';
import {
  View,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

// StyleSheets
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

const PrimaryScreen = ({background = false, children}: any) => {
  return (
    // Screen back button
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={[
          background ? styles.paddingH10 : null,
          CoreStyleSheet.viewContainerStyle,
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
  paddingH10: {
    paddingHorizontal: 10,
  },
});

export default PrimaryScreen;
