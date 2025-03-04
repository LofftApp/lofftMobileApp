import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

//Redux 🪝
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useUserType} from 'reduxFeatures/user/useUserType';
import {ImageType} from 'reduxFeatures/imageHandling/types';
import {useImagesToUpload} from 'reduxFeatures/imageHandling/useImagesToUpload';

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';

// StyleSheets
import Colors from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';
import {
  MAX_FLAT_IMAGES,
  MAX_USER_IMAGES,
} from 'components/componentData/constants';
import {size} from 'react-native-responsive-sizes';

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
  const {imagesToUpload, savedImages} = useImagesToUpload();

  const {isLessor} = useUserType();
  const {isNewUserLessor} = useNewUserDetails();
  const totalUserImages =
    imagesToUpload.length +
    (isLessor || isNewUserLessor
      ? savedImages.lessor.userImages.length
      : savedImages.tenant.userImages.length);
  const totalFlatImages =
    imagesToUpload.length + savedImages.lessor.flatImages.length;
  const displayTotalImagesNumber = () => {
    if (imageType === ImageType.User) {
      return MAX_USER_IMAGES - totalUserImages;
    } else {
      return MAX_FLAT_IMAGES - totalFlatImages;
    }
  };

  const disable = displayTotalImagesNumber() <= 0;

  return (
    <View style={styles.mainContainer}>
      <Text style={fontStyles.headerSmall}>
        Add up to {displayTotalImagesNumber()} images
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
