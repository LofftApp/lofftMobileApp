import React from 'react';
import {View, Platform, StyleSheet} from 'react-native';

// Components 🪢
import BackButton from '../buttons/BackButton';

// StyleSheets
import {CoreStyleSheet} from '../../../styles/CoreDesignStyleSheet';

const ScreenBackButton = ({nav, title, children}) => {
  return (
    // Screen back button
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <BackButton onPress={nav} title={title} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ScreenBackButton;
