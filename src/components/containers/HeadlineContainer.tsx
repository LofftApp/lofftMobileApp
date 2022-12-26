import React from 'react';

import {Text, View, StyleSheet} from 'react-native';

// Styles
import {fontStyles} from '../../styles/fontStyles';
import color from '../../styles/lofftColorPallet.json';

const HeadlineContainer = ({headlineText, subDescription}: any) => {
  return (
    <View style={styles.container}>
      <Text style={fontStyles.headerDisplay}>{headlineText}</Text>
      <Text style={styles.subHeaderText}>{subDescription}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 25,
    marginBottom: 24,
  },
  subHeaderText: {
    color: color.Black[80],
    marginTop: 16,
  },
});

export default HeadlineContainer;
