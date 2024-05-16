import React from 'react';
import {useAppSelector, useAppDispatch} from '@ReduxCore/hooks';
// API 🧠
import {setImageToUpload} from './userImageUploadSlice';
import {setDetails} from 'redux/registration/userJourneySlice';

// Componetne 🪢
import {CoreButton} from 'components/buttons/CoreButton';

const ImageUploadButton = ({onPress = () => {}}) => {
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
          // ! Current issue with TS, and void data.
          // TODO: This needs to be fixed though doesn't affect procutions
          dispatch(setImageToUpload(images));
          dispatch(setDetails(images));
        }
      }}
    />
  );
};

export default ImageUploadButton;
