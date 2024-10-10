import React from 'react';

import {Text, View, StyleSheet} from 'react-native';

// Styles
import {fontStyles} from '../../styles/fontStyles';
import color from '../../styles/lofftColorPallet.json';
import {size} from 'react-native-responsive-sizes';

const HeadlineContainer = ({headlineText, subDescription}: any) => {
  return (
    <View style={styles.container}>
      <Text style={fontStyles.headerDisplay}>{headlineText}</Text>
      <Text style={[fontStyles.bodyExtraSmall, styles.subHeaderText]}>
        {subDescription}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: size(10),

  },
  subHeaderText: {
    color: color.Black[80],
  },
});

export default HeadlineContainer;
