import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

const Chips = ({chips, features, seeAll = false, emoji = false}: any) => (
  <ListChips chips={chips} emoji={emoji} features={features} seeAll={seeAll} />
);

const ListChips = ({chips, emoji, features, seeAll}: any) => {
  return (
    <View style={styles.chipsWrap}>
      {chips
        .slice(0, seeAll ? chips.length : 2)
        .map((tag: any, index: number) => {
          return (
            <View
              style={[
                styles.chip,
                features ? styles.featureTag : styles.characteristicTag,
              ]}
              key={index}>
              {emoji ? <Text>{tag.emoji}</Text> : null}
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
      {chips.length > 2 && !seeAll ? (
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
            +{chips.slice(1, -1).length}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    marginVertical: 4,
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
