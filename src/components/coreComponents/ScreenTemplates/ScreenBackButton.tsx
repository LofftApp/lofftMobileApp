import React from 'react';
import {
  View,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
} from 'react-native';

// Components 🪢
// import BackButton from '../buttons/BackButton';
import BackButton from '@Components/buttons/BackButton';

// StyleSheets
import {CoreStyleSheet} from '@StyleSheets/CoreDesignStyleSheet';

const ScreenBackButton = ({nav, title, children}: any) => {
  return (
    // Screen back button
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[
          CoreStyleSheet.viewContainerStyle,
          Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
        ]}>
        <BackButton onPress={nav} title={title} />
        <View style={styles.safeViewContainer}>{children}</View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  safeViewContainer: {
    flex: 1,
    marginBottom: 25,
  },
});

export default ScreenBackButton;
