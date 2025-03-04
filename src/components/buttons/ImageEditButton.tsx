import LofftIcon from 'components/lofftIcons/LofftIcon';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import Color from 'styleSheets/lofftColorPallet.json';

const ImageEditButton = ({
  right = 0,
  bottom = 0,
}: {
  right?: number;
  bottom?: number;
}) => {
  return (
    <View
      style={[styles.editButton, {right: size(right), bottom: size(bottom)}]}>
      <LofftIcon name="edit" size={20} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  editButton: {
    position: 'absolute',

    backgroundColor: Color.BlackOpacity[30],
    padding: size(5),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ImageEditButton;
