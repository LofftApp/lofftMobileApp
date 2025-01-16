import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Collapsible from 'react-native-collapsible';
// Styles 🎨
import Color from 'styleSheets/lofftColorPallet.json';
import { createFontStyles } from 'styleSheets/fontStyles';

//Helpers
import {size} from 'react-native-responsive-sizes';

// Redux
import { useSelector } from 'react-redux';
import { RootState } from 'reduxCore/store';

//Types
import type {ChipsProps} from './types';



const Chips = ({
  tags,
  emoji,
  features,
  expand,
  xs,
  whiteBg,
  open,
}: ChipsProps) => {

  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const colors = isDarkMode ? Color.Dark : Color.Light;
  const fontStyles = createFontStyles(isDarkMode);

  const styles = StyleSheet.create({
    chipContainer: {
      flexDirection: 'column',
    },
    chipsWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingVertical: size(4),
      alignItems: 'center',
    },
    chip: {
      flexDirection: 'row',
      paddingHorizontal: size(8),
      paddingVertical: size(4),
      alignSelf: 'flex-start',
      borderRadius: 8,
      marginRight: size(8),
      marginBottom: size(8),
    },
    featureTag: {
      backgroundColor: colors.Blue[20],
      alignItems: 'center',
      gap: size(5),
    },
    characteristicTag: {
      backgroundColor: colors.Lavendar[20],
      alignItems: 'center',
      gap: size(5),
    },
    featureBorder: {
      borderColor: colors.Blue[100],
      borderWidth: 0.5,
    },
    characteristicBorder: {
      borderColor: colors.Lavendar[100],
      borderWidth: 0.5,
    },
    whiteBackground: {
      backgroundColor: colors.White[100],
      alignItems: 'center',
      gap: size(5),
    },
    featureTagFont: {
      color: colors.Blue[100],
    },
    characteristicTagFont: {
      color: colors.Lavendar[100],
    },
    seeReadLess: {
      color: colors.Blue[100],
      marginLeft: 'auto',
      marginRight: size(10),
    },
  });
  // Check if there are tags to display
  if (!tags || tags.length === 0) {
    return (
      <View style={styles.chipContainer}>
        <View style={styles.chipsWrap}>
          <View
            style={[
              styles.chip,
              whiteBg
                ? styles.whiteBackground
                : features
                ? styles.featureTag
                : styles.characteristicTag,
              whiteBg && features && styles.featureBorder,
              whiteBg && !features && styles.characteristicBorder,
            ]}>
            {emoji && <Text>😓</Text>}
            <Text
              style={[
                xs ? fontStyles.bodyExtraSmall : fontStyles.bodySmall,
                features ? styles.featureTagFont : styles.characteristicTagFont,
              ]}>
              No matches found
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.chipContainer}>
      <View style={styles.chipsWrap}>
        {tags.slice(0, 2).map((tag, index) => {
          return (
            <View
              style={[
                styles.chip,
                whiteBg
                  ? styles.whiteBackground
                  : features
                  ? styles.featureTag
                  : styles.characteristicTag,
                whiteBg && features && styles.featureBorder,
                whiteBg && !features && styles.characteristicBorder,
              ]}
              key={tag?.emoji + index.toString()}>
              {emoji && <Text>{tag?.emoji}</Text>}
              <Text
                style={[
                  xs ? fontStyles.bodyExtraSmall : fontStyles.bodySmall,
                  features
                    ? styles.featureTagFont
                    : styles.characteristicTagFont,
                ]}>
                {tag?.name}
              </Text>
            </View>
          );
        })}
        {tags && tags.length > 2 && !expand && (
          <View
            style={[
              styles.chip,
              whiteBg
                ? styles.whiteBackground
                : features
                ? styles.featureTag
                : styles.characteristicTag,
              whiteBg && features && styles.featureBorder,
              whiteBg && !features && styles.characteristicBorder,
            ]}>
            <Text
              style={[
                xs ? fontStyles.bodyExtraSmall : fontStyles.bodySmall,
                features ? styles.featureTagFont : styles.characteristicTagFont,
              ]}>
              +{tags?.slice(1, -1).length}
            </Text>
          </View>
        )}

        {tags &&
          tags.slice(2).map((tag, index) => {
            return open ? (
              <View
                key={tag?.emoji + index.toString()}
                style={[
                  styles.chip,
                  whiteBg
                    ? styles.whiteBackground
                    : features
                    ? styles.featureTag
                    : styles.characteristicTag,
                  whiteBg && features && styles.featureBorder,
                  whiteBg && !features && styles.characteristicBorder,
                ]}>
                {emoji && <Text>{tag?.emoji}</Text>}
                <Text
                  style={[
                    xs ? fontStyles.bodyExtraSmall : fontStyles.bodySmall,
                    features
                      ? styles.featureTagFont
                      : styles.characteristicTagFont,
                  ]}>
                  {tag?.name}
                </Text>
              </View>
            ) : (
              <Collapsible
                key={tag?.emoji + index.toString()}
                collapsed={!expand}
                duration={300}>
                <View
                  style={[
                    styles.chip,
                    whiteBg
                      ? styles.whiteBackground
                      : features
                      ? styles.featureTag
                      : styles.characteristicTag,
                    whiteBg && features && styles.featureBorder,
                    whiteBg && !features && styles.characteristicBorder,
                  ]}>
                  {emoji && <Text>{tag?.emoji}</Text>}
                  <Text
                    style={[
                      xs ? fontStyles.bodyExtraSmall : fontStyles.bodySmall,
                      features
                        ? styles.featureTagFont
                        : styles.characteristicTagFont,
                    ]}>
                    {tag?.name}
                  </Text>
                </View>
              </Collapsible>
            );
          })}
      </View>
    </View>
  );
};

export default Chips;
