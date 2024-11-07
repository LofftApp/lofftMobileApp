import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Styles
import Color from 'styleSheets/lofftColorPallet.json';
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Helpers
import {size} from 'react-native-responsive-sizes';

// Types
import type {HighlightButtonsProps} from './types';
import HeartButton from 'components/buttons/HeartButton';

const HighlightButtons = ({
  goBack = true,
  heartPresent = true,
  color = Color.Lavendar[80],
  favorite,
  onPressHeart,
}: HighlightButtonsProps) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.actionContainer,
        goBack
          ? styles.justifyContentSpaceBetween
          : styles.justifyContentFlexEnd,
      ]}>
      {goBack && (
        <Pressable
          style={styles.iconContainer}
          onPress={() => navigation.goBack()}>
          <LofftIcon name="chevron-left" size={35} color={color} />
        </Pressable>
      )}

      {heartPresent && (
        <HeartButton
          favorite={favorite}
          onPress={onPressHeart}
          style={styles.iconContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    top: size(50),
    position: 'absolute',
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: size(20),
  },
  iconContainer: {
    paddingLeft: size(10),
    paddingRight: size(10),
    paddingTop: size(7),
    paddingBottom: size(7),
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  justifyContentSpaceBetween: {
    justifyContent: 'space-between',
  },
  justifyContentFlexEnd: {
    justifyContent: 'flex-end',
  },
});

export default HighlightButtons;
