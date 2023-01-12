import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
// API 🧠
import {libraryImageUpload} from '@Firebase/firebaseStorage';
import {setImageToUpload} from './userImageUploadSlice';
import {setDetails} from '@Redux/userRegistration/userJourneySlice';

// Componetne 🪢
import {CoreButton} from '@Components/buttons/CoreButton';

const ImageUploadButton = ({onPress = () => {}}) => {
  const dispatch = useDispatch();
  const userImages = useSelector(
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
