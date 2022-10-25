import React from 'react';
import {View, Platform, StyleSheet, Text} from 'react-native';

// Components 🪢
import BackButton from '../buttons/BackButton';

// StyleSheets
import {CoreStyleSheet} from '../../../styles/CoreDesignStyleSheet';

const ScreenBackButton = ({navigation, title, children}) => {
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <BackButton onPress={navigation} title={title} />
      <Text>Hello</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ScreenBackButton;
