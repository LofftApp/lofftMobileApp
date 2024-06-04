import React from 'react';
import {Platform, SafeAreaView, ScrollView} from 'react-native';

// Components 🪢
import BackButton from 'components/buttons/BackButton';

// StyleSheets 🖼️
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

const ScrollViewBackButton = ({nav = null, title = null, children}: any) => {
  return (
    // Screen back button
    <ScrollView
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <SafeAreaView>
        {nav ? <BackButton onPress={nav} title={title} /> : null}
        {children}
      </SafeAreaView>
    </ScrollView>
  );
};

export default ScrollViewBackButton;
