import React from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';

//Styles
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {fontStyles} from 'styleSheets/fontStyles';

const AlertsScreen = () => {
  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
      <View style={CoreStyleSheet.screenContainer}>
        <View style={styles.mainContainer}>
          <Text style={fontStyles.headerMedium}>This is alerts screen 🔔</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AlertsScreen;
