import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
//Styles
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';
//Components
import LofftIcon from 'components/lofftIcons/LofftIcon';
//Helpers
import {size} from 'react-native-responsive-sizes';
//Types
import { SeeMoreButtonProps } from './types';

function SeeMoreButton({collapsed, toggleExpand}: SeeMoreButtonProps) {
  return (
    <Pressable onPress={toggleExpand} style={styles.seeMoreContainer}>
      <Text style={[fontStyles.bodySmall, styles.seeMore]}>
        {collapsed ? 'See less' : 'See more'}
      </Text>
      {collapsed ? (
        <>
          <LofftIcon name="chevron-up" size={25} color={Color.Blue[100]} />
        </>
      ) : (
        <>
          <LofftIcon name="chevron-down" size={25} color={Color.Blue[100]} />
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  seeMore: {
    color: Color.Blue[100],
    marginHorizontal: size(10),
    marginBottom: size(2),
  },
  seeMoreContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: size(10),
    paddingBottom: size(10),
  },
});

export default SeeMoreButton;
