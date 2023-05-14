import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

const Chips = ({tags, features, positive = true, emoji = false}: any) => {
  return (
    <View style={styles.chipContainer}>
      <ListChips
        list={tags}
        emoji={emoji}
        positive={positive}
        features={features}
      />
    </View>
  );
};

const ListChips = ({list, emoji, positive, features}: any) => {
  return (
    <View style={styles.chipsWrap}>
      {list.slice(0, 2).map((tag: any, index: number) => {
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
                features ? styles.featureTagFont : styles.characteristicTagFont,
              ]}>
              {tag.name}
            </Text>
          </View>
        );
      })}
      {list.length > 2 ? (
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
            +{list.slice(1, -1).length}
          </Text>
        </View>
      ) : null}
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
