import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import Color from '@StyleSheets/lofftColorPallet.json';
import LofftIcon from '@Components/lofftIcons/LofftIcon';

const HighlightedButtons = ({navigation, save, onPressHeart}: any) => {
  return (
    <View style={styles.actionContainer}>
      <Pressable
        style={styles.iconContainer}
        onPress={() => navigation.goBack()}>
        <LofftIcon name="chevron-left" size={35} color={Color.Lavendar[80]} />
      </Pressable>

      <Pressable style={styles.iconContainer} onPress={onPressHeart}>
        {save ? (
          <LofftIcon name="heart-filled" size={35} color={Color.Tomato[100]} />
        ) : (
          <LofftIcon name="heart" size={35} color={Color.Tomato[100]} />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    marginVertical: 50, // Might
    position: 'absolute',
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  iconContainer: {
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 12,
  },
});

export default HighlightedButtons;
