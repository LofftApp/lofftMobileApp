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
  return (
    <CoreButton
      value="Upload Photo"
      onPress={async () => {
        const images: string[] = (await libraryImageUpload()) || [];
        if (images.length > 0) {
          // ! Current issue with TS, and void data.
          // TODO: This needs to be fixed though doesn't affect procutions
          onPress();
          dispatch(setImageToUpload(images));
          dispatch(setDetails(images));
        }
      }}
    />
  );
};

export default ImageUploadButton;
