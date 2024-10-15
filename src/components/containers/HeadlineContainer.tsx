import React from 'react';

import {Text, View, StyleSheet} from 'react-native';

// Styles
import {fontStyles} from '../../styles/fontStyles';
import color from '../../styles/lofftColorPallet.json';
import {size} from 'react-native-responsive-sizes';

type HeadlineContainerProps = {
  headlineText: string;
  subDescription?: string;
};

const HeadlineContainer = ({
  headlineText,
  subDescription,
}: HeadlineContainerProps) => {
  return (
    <View style={styles.container}>
      <Text style={fontStyles.headerDisplay}>{headlineText}</Text>
      {subDescription && (
        <Text style={[fontStyles.bodyMedium, styles.subHeaderText]}>
          {subDescription}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: size(10),
    paddingBottom: size(10),
  },
  subHeaderText: {
    color: color.Black[80],
  },
});

export default HeadlineContainer;
