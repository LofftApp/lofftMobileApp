import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {fontStyles} from 'styleSheets/fontStyles';

function ErrorComponent({message}: {message: string}) {
  return (
    <View style={styles.pageContainer}>
      <SafeAreaView style={[styles.pageContainer, styles.ErrorContainer]}>
        <Text style={fontStyles.headerSmall}>{message}</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  ErrorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ErrorComponent;
