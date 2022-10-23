import React from 'react';
import {View, Platform, StyleSheet, Text} from 'react-native';

// Components 🪢
// import CustomBackButton from '@Buttons/CustomBackButton';

// StyleSheets
import {CoreStyleSheet} from '../../../styles/CoreDesignStyleSheet';

const ScreenBackButton = ({navigation, title, children}) => {
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      {/* <CustomBackButton onPress={navigation} title={title} /> */}
      <Text>Hello</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ScreenBackButton;
