import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Chips from '@Components/buttons/Chips';
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';
import LofftIcon from '@Components/lofftIcons/LofftIcon';

interface ChipBlockProps {
  seeAll: boolean;
  onPress: () => void;
  header: string;
  chips: {
    features: any;
    characteristics: any;
  };
}

export const ChipBlock = ({seeAll, onPress, header, chips}: ChipBlockProps) => {
  return chips.characteristics.length > 0 || chips.features.length > 0 ? (
    <>
      <View style={styles.seeAllContainer}>
        <Text style={[fontStyles.headerSmall]}>{header}</Text>
        {chips.features.length > 2 || chips.characteristics.length > 2 ? (
          <TouchableOpacity style={styles.seeAllButton} onPress={onPress}>
            <Text style={[fontStyles.bodyMedium, styles.seeAllButton.text]}>
              See all
            </Text>
            <LofftIcon
              name={seeAll ? 'chevron-up' : 'chevron-down'}
              size={23}
              color={Color.Blue[100]}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <View>
        {chips.features.length > 0 ? (
          <Chips chips={chips.features} features={true} emoji seeAll={seeAll} />
        ) : null}
        {chips.characteristics.length > 0 ? (
          <Chips
            chips={chips.characteristics}
            features={false}
            seeAll={seeAll}
            emoji
          />
        ) : null}
      </View>
    </>
  ) : null;
};

const styles = StyleSheet.create({
  seeAllContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 23,
    marginBottom: 5,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    text: {
      color: Color.Blue[100],
    },
  },
});
