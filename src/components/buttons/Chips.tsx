import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

import type {ChipsProps} from './types';

const Chips = ({
  tags,
  emoji = false,
  positive = true,
  features,
}: ChipsProps) => {
  return (
    <View style={styles.chipContainer}>
      <View style={styles.chipsWrap}>
        {tags?.slice(0, 2).map((tag, index: number) => {
          return (
            <View
              style={[
                styles.chip,
                features ? styles.featureTag : styles.characteristicTag,
              ]}
              key={index}>
              {emoji && <Text>{tag.emoji}</Text>}
              <Text
                style={[
                  fontStyles.bodySmall,
                  features
                    ? styles.featureTagFont
                    : styles.characteristicTagFont,
                ]}>
                {tag.name}
              </Text>
            </View>
          );
        })}
        {tags && tags.length > 2 && (
          <View
            style={[
              styles.chip,
              features ? styles.featureTag : styles.characteristicTag,
            ]}>
            <Text
              style={[
                fontStyles.bodySmall,
                features ? styles.featureTagFont : styles.characteristicTagFont,
              ]}>
              +{tags.slice(1, -1).length}
            </Text>
          </View>
        )}
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
    paddingVertical: 4,
  },
  chip: {
    flexDirection: 'row',
    height: 'auto',
    width: 'auto',
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    borderRadius: 8,
    marginRight: 4,
  },
  featureTag: {
    backgroundColor: Color.Blue[10],
  },
  characteristicTag: {
    backgroundColor: Color.Lavendar[10],
  },
  featureTagFont: {
    color: Color.Blue[100],
  },
  characteristicTagFont: {
    color: Color.Lavendar[100],
  },
});

export default Chips;
