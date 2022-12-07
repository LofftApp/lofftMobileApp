import React from 'react';
import {Platform, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

// Components 🪢
import BackButton from '../buttons/BackButton';

// StyleSheets
import {CoreStyleSheet} from '../../../styles/CoreDesignStyleSheet';

const ScrollViewBackButton = ({nav, title, children}) => {
  return (
    // Screen back button
    <ScrollView
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <SafeAreaView>
        <BackButton onPress={nav} title={title} />
        {children}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default ScrollViewBackButton;
