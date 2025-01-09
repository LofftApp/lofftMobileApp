import React from 'react';

import {Text, View, StyleSheet} from 'react-native';

// Styles
import {createFontStyles} from '../../styles/fontStylesTest';
import Color from '../../styles/lofftColorPalletTest.json';
import {size} from 'react-native-responsive-sizes';
import { useTheme } from 'components/themes/ThemeContext';

type HeadlineContainerProps = {
  headlineText: string;
  subDescription?: string;
};

const HeadlineContainer = ({
  headlineText,
  subDescription,
}: HeadlineContainerProps) => {

  const {isDarkMode}: any = useTheme();
  const fontStyles = createFontStyles(isDarkMode);
  const colors = isDarkMode ? Color.Dark : Color.Light;

  const styles = StyleSheet.create({
    container: {
      gap: size(10),
      paddingBottom: size(10),
    },
    subHeaderText: {
      color: colors.Black[80],
    },
  });

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

export default HeadlineContainer;
