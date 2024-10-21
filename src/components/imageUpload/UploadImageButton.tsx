import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';

// StyleSheets
import Colors from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';
import {useImagesToUpload} from 'reduxFeatures/imageHandling/useImagesToUpload';
import {
  MAX_FLAT_IMAGES,
  MAX_USER_IMAGES,
} from 'components/componentData/constants';
import {size} from 'react-native-responsive-sizes';
// import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';

type UploadImageButtonProps = {
  onPress: () => void;
  error: string;
  imageType: 'user' | 'flat';
};
const UploadImageButton = ({
  onPress,
  error,
  imageType,
}: UploadImageButtonProps) => {
  const {imagesToUpload} = useImagesToUpload();
  const disable = imagesToUpload.length >= MAX_FLAT_IMAGES;
  return (
    <View style={styles.mainContainer}>
      <Text style={fontStyles.headerSmall}>
        Add up to {imageType === 'user' ? MAX_USER_IMAGES : MAX_FLAT_IMAGES}{' '}
        images
      </Text>
      <TouchableOpacity
        style={[
          styles.imageUploadButton,
          disable && styles.disabled,
          error && styles.error,
        ]}
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
            disable && styles.disabled,
          ]}>
          Upload Pictures
        </Text>
      </TouchableOpacity>
      {/* {error && <ErrorMessage isInputField message={error} />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    gap: size(10),
  },
  imageUploadButton: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: Colors.Black[50],
    paddingVertical: size(16),
    alignItems: 'center',
    gap: size(12),
  },
  uploadText: {
    color: Colors.Lavendar[100],
  },
  disabled: {
    borderColor: Colors.Black[30],
    color: Colors.Black[30],
  },
  error: {
    borderColor: Colors.Tomato[100],
  },
});

export default UploadImageButton;
