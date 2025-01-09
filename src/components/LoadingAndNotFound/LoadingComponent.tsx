
import React from 'react';
import { useTheme } from 'components/themes/ThemeContext';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import Color from 'styleSheets/lofftColorPallet.json';
import { createFontStyles } from 'styleSheets/fontStylesTest';

const LoadingComponent = () => {
  const coreStyles = CoreStyleSheet();
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? Color.Dark : Color.Light;
  const fontStyles = createFontStyles(isDarkMode);

  return (
    <SafeAreaView style={coreStyles.safeAreaViewShowContainer}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.Black[50]} />
        <Text style={fontStyles.headerSmall}>Loading...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingComponent;
