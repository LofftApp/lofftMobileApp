import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

import type {ChipsProps} from './types';
import {size} from 'react-native-responsive-sizes';
import Collapsible from 'react-native-collapsible';

const Chips = ({
  tags,
  emoji,
  features,
  expand,
  xs,
  whiteBg,
  open,
}: ChipsProps) => {
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

        {tags.slice(2).map((tag, index) => {
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
    backgroundColor: Color.Blue[20],
    alignItems: 'center',
    gap: size(5),
  },
  characteristicTag: {
    backgroundColor: Color.Lavendar[20],
    alignItems: 'center',
    gap: size(5),
  },
  featureBorder: {
    borderColor: Color.Blue[100],
    borderWidth: 0.5,
  },
  characteristicBorder: {
    borderColor: Color.Lavendar[100],
    borderWidth: 0.5,
  },
  whiteBackground: {
    backgroundColor: Color.White[100],
    alignItems: 'center',
    gap: size(5),
  },
  featureTagFont: {
    color: Color.Blue[100],
  },
  characteristicTagFont: {
    color: Color.Lavendar[100],
  },
  seeReadLess: {
    color: Color.Blue[100],
    marginLeft: 'auto',
    marginRight: size(10),
  },
});

export default Chips;
