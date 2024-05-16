import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useAppSelector} from 'reduxCore/hooks';

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';

// StyleSheets
import Colors from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

const UploadImageButton = ({onPress}: any) => {
  const userImages = useAppSelector(
    (state: any) => state.imageUpload.imagesToUpload,
  );
  const disable = userImages.length >= 5;
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
    borderColor: Colors.Lavendar[100],
    paddingVertical: 16,
    alignItems: 'center',
  },
  uploadText: {
    color: Colors.Lavendar[100],
    marginTop: 12,
  },
  disabled: {
    borderColor: Colors.Black[30],
    color: Colors.Black[30],
  },
});

export default UploadImageButton;
