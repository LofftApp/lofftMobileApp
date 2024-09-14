import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

import type {ChipsProps} from './types';
import {size} from 'react-native-responsive-sizes';

const Chips = ({
  tags,
  positiveTags,
  negativeTags,
  emoji = false,
  features,
  expand,
}: ChipsProps) => {
  return (
    <>
      {tags && (
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
                    fontStyles.bodySmall,
                    features
                      ? styles.featureTagFont
                      : styles.characteristicTagFont,
                  ]}>
                  +{tags?.slice(1, -1).length}
                </Text>
              </View>
            )}

            {expand &&
              tags?.slice(2).map((tag, index: number) => {
                return (
                  <View
                    style={[
                      styles.chip,
                      features ? styles.featureTag : styles.characteristicTag,
                    ]}
                    key={index}>
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
                );
              })}
          </View>
        </View>
      )}
      {positiveTags && (
        <View style={styles.chipContainer}>
          <View style={styles.chipsWrap}>
            {positiveTags?.slice(0, 2).map((tag, index: number) => {
              return (
                <View
                  style={[
                    styles.chip,
                    features ? styles.featureTag : styles.characteristicTag,
                  ]}
                  key={index}>
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
              );
            })}
            {positiveTags && positiveTags.length > 2 && !expand && (
              <View
                style={[
                  styles.chip,
                  features ? styles.featureTag : styles.characteristicTag,
                ]}>
                <Text
                  style={[
                    fontStyles.bodySmall,
                    features
                      ? styles.featureTagFont
                      : styles.characteristicTagFont,
                  ]}>
                  +{positiveTags?.slice(1, -1).length}
                </Text>
              </View>
            )}

            {expand &&
              positiveTags?.slice(2).map((tag, index: number) => {
                return (
                  <View
                    style={[
                      styles.chip,
                      features ? styles.featureTag : styles.characteristicTag,
                    ]}
                    key={index}>
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
                );
              })}
          </View>
        </View>
      )}
      {negativeTags && (
        <View style={styles.chipContainer}>
          <View style={styles.chipsWrap}>
            {negativeTags?.slice(0, 2).map((tag, index: number) => {
              return (
                <View
                  style={[
                    styles.chip,
                    features ? styles.featureTag : styles.characteristicTag,
                  ]}
                  key={index}>
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
              );
            })}
            {negativeTags && negativeTags.length > 2 && !expand && (
              <View
                style={[
                  styles.chip,
                  features ? styles.featureTag : styles.characteristicTag,
                ]}>
                <Text
                  style={[
                    fontStyles.bodySmall,
                    features
                      ? styles.featureTagFont
                      : styles.characteristicTagFont,
                  ]}>
                  +{negativeTags?.slice(1, -1).length}
                </Text>
              </View>
            )}

            {expand &&
              negativeTags?.slice(2).map((tag, index: number) => {
                return (
                  <View
                    style={[
                      styles.chip,
                      features ? styles.featureTag : styles.characteristicTag,
                    ]}
                    key={index}>
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
                );
              })}
          </View>
        </View>
      )}
    </>
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
