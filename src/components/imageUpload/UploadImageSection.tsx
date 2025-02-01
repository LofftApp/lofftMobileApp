import React from 'react';
import {Animated, ScrollView, StyleSheet, View} from 'react-native';
import UploadImageButton from './UploadImageButton';
import ImagePreviewRow from './ImagePreviewRow';
import {size} from 'react-native-responsive-sizes';
import {ImageType} from 'reduxFeatures/imageHandling/types';

type UploadImageSectionProps = {
  toggleModal: () => void;
  fadeAnim: Animated.Value;
  error: string;
  imageType: ImageType;
};
const UploadImageSection = ({
  toggleModal,
  fadeAnim,
  error,
  imageType,
}: UploadImageSectionProps) => {
  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <Animated.View style={[styles.imageContainer, {opacity: fadeAnim}]}>
          <ImagePreviewRow imageType={imageType} />
          <UploadImageButton
            onPress={toggleModal}
            error={error}
            imageType={imageType}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    gap: size(20),
    marginTop: size(10),
    paddingHorizontal: size(10),
  },
});

export default UploadImageSection;
