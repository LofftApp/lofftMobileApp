import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';

// Styles
import Color from 'styleSheets/lofftColorPallet.json';
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Helpers
import {size} from 'react-native-responsive-sizes';

// Types
import type {HighlightButtonsProps} from './types';
import {useNavigation} from '@react-navigation/native';

// Important Notice !!
/*
  The navigation prop has to be passed on from the corresponding parent component
*/

const HighlightButtons = ({
  goBack = true,
  heartPresent = true,
  color = 'null',
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
          <LofftIcon
            name="chevron-left"
            size={35}
            color={color ? color : Color.Lavendar[80]}
          />
        </Pressable>
      )}

      {heartPresent && (
        <Pressable style={styles.iconContainer} onPress={onPressHeart}>
          {favorite ? (
            <LofftIcon
              name="heart-filled"
              size={35}
              color={Color.Tomato[100]}
            />
          ) : (
            <LofftIcon name="heart" size={35} color={Color.Tomato[100]} />
          )}
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    marginVertical: size(50), // Might
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
