import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {fontStyles} from 'styleSheets/fontStyles';

function ErrorComponent({message}: {message: string}) {
  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
      <View style={styles.ErrorContainer}>
        <Text style={fontStyles.headerSmall}>{message}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ErrorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ErrorComponent;
