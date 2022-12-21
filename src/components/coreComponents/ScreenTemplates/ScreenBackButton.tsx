import React from 'react';
import {
  View,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

// Components 🪢
// import BackButton from '../buttons/BackButton';
import BackButton from '@Components/buttons/BackButton';

// StyleSheets
import {CoreStyleSheet} from '../../../styles/CoreDesignStyleSheet';

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
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({});

export default ScreenBackButton;
