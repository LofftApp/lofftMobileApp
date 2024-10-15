// TODO: Review this file and it's need in the application
import React from 'react';
import {useAppSelector, useAppDispatch} from 'reduxCore/hooks';
// API 🧠
import {setImageToUpload} from './userImageUploadSlice';

// Componetne 🪢
import {CoreButton} from 'components/buttons/CoreButton';

const ImageUploadButton = () => {
  // This needs to be refactored
  // TODO: Refactor this
  const dispatch = useAppDispatch();
  const userImages = useAppSelector(
    (state: any) => state.imageUpload.imagesToUpload,
  );
  const uploadLimit = 5 - userImages.length;
  return (
    <CoreButton
      value="Upload Photo"
      onPress={async () => {
        onPress();
        const images: string[] = (await libraryImageUpload(uploadLimit)) || [];
        if (images.length > 0) {
          dispatch(setImageToUpload(images));
          dispatch(setDetails(images));
        }
      }}
    />
  );
};

export default ImageUploadButton;
