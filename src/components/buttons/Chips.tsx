import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

import type {ChipsProps} from './types';
import {size} from 'react-native-responsive-sizes';
import Collapsible from 'react-native-collapsible';

const Chips = ({tags, emoji = false, features, expand, xs}: ChipsProps) => {
  return (
    <View style={styles.chipContainer}>
      <View style={styles.chipsWrap}>
        {tags.slice(0, 2).map(tag => {
          return (
            <View
              style={[
                styles.chip,
                features ? styles.featureTag : styles.characteristicTag,
              ]}
              key={tag?.name}>
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
              features ? styles.featureTag : styles.characteristicTag,
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

        {tags.slice(2).map(tag => {
          return (
            <Collapsible collapsed={!expand} duration={300}>
              <View
                style={[
                  styles.chip,
                  features ? styles.featureTag : styles.characteristicTag,
                ]}
                key={tag?.name}>
                {emoji && <Text>{tag?.emoji}</Text>}
                <Text
                  style={[
                    fontStyles.bodySmall,
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
    paddingVertical: 4,
    alignItems: 'center',
  },
  chip: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    borderRadius: 8,
    marginRight: size(8),
    marginBottom: size(8),
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
  seeReadLess: {
    color: Color.Blue[100],
    marginLeft: 'auto',
    marginRight: size(10),
  },
});

export default Chips;
