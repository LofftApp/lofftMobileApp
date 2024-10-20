import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';

// StyleSheets
import Colors from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';
import {useImagesToUpload} from 'reduxFeatures/imageHandling/useImagesToUpload';
import {MAX_FLAT_IMAGES} from 'components/componentData/constants';
import {size} from 'react-native-responsive-sizes';

const UploadImageButton = ({onPress}: any) => {
  const {imagesToUpload} = useImagesToUpload();
  const disable = imagesToUpload.length >= MAX_FLAT_IMAGES;
  return (
    <View>
      <TouchableOpacity
        style={[styles.imageUploadButton, disable ? styles.disabled : null]}
        onPress={() => onPress()}
        disabled={disable}>
        <LofftIcon
          name="upload"
          size={30}
          color={disable ? Colors.Black[30] : Colors.Lavendar[100]}
        />
        <Text
          style={[
            fontStyles.headerSmall,
            styles.uploadText,
            disable ? styles.disabled : null,
          ]}>
          Upload Pictures
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imageUploadButton: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: Colors.Black[50],
    paddingVertical: size(16),
    alignItems: 'center',
  },
  uploadText: {
    color: Colors.Lavendar[100],
    marginTop: size(12),
  },
  disabled: {
    borderColor: Colors.Black[30],
    color: Colors.Black[30],
  },
});

export default UploadImageButton;
