import React from 'react';
import {
  View,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

// Components 🪢
import BackButton from 'components/buttons/BackButton';

// Helper
import { size } from 'react-native-responsive-sizes';

// StyleSheets
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

// types 🏷️
import {ScreenBackButtonProp} from './types';

const ScreenBackButton = ({
  nav,
  title = null,
  children,
}: ScreenBackButtonProp) => {
   const coreStyles = CoreStyleSheet();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[
          coreStyles.viewContainerStyle,
          Platform.OS === 'ios' ? coreStyles.viewContainerIOSStyle : null,
        ]}>
        {nav && <BackButton onPress={nav} title={title ?? ''} />}
        <View style={styles.safeViewContainer}>{children}</View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  safeViewContainer: {
    flex: 1,
    marginBottom: size(25),
  },
});

export default ScreenBackButton;
