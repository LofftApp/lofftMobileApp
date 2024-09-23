import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fontStyles} from 'styleSheets/fontStyles';

function LoadingComponent() {
  return (
    <View style={styles.pageContainer}>
      <SafeAreaView style={[styles.pageContainer, styles.loadingContainer]}>
        <Text style={fontStyles.headerSmall}>Loading...</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingComponent;
