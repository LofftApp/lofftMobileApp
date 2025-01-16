import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';

// StyleSheets
import Color from 'styleSheets/lofftColorPallet.json';
import {useImagesToUpload} from 'reduxFeatures/imageHandling/useImagesToUpload';
import {
  MAX_FLAT_IMAGES,
  MAX_USER_IMAGES,
} from 'components/componentData/constants';
import {size} from 'react-native-responsive-sizes';
import { createFontStyles } from 'styleSheets/fontStyles';

// Redux
import { useSelector } from 'react-redux';
// Types
import { RootState } from 'reduxCore/store';
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
  // CoreStyles
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const colors = isDarkMode ? Color.Dark : Color.Light;
  const fontStyles = createFontStyles(isDarkMode);

  const {imagesToUpload} = useImagesToUpload();
  const disable = imagesToUpload.length >= MAX_FLAT_IMAGES;

  const styles = StyleSheet.create({
    mainContainer: {
      gap: size(10),
    },
    imageUploadButton: {
      borderWidth: 2,
      borderRadius: 12,
      borderColor: colors.Black[50],
      paddingVertical: size(16),
      alignItems: 'center',
      gap: size(12),
    },
    uploadText: {
      color: colors.Lavendar[100],
    },
    disabled: {
      borderColor: colors.Black[30],
      color: colors.Black[30],
    },
    error: {
      borderColor: colors.Tomato[100],
    },
  });
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
          color={disable ? colors.Black[30] : colors.Lavendar[100]}
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

export default UploadImageButton;
