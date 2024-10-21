import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

const LoadingComponent = () => {
  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Color.Black[50]} />
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
