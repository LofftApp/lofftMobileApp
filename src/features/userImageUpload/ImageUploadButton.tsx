import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
// API 🧠
import {libraryImageUpload} from '@Firebase/firebaseStorage';
import {setImageToUpload} from './userImageUploadSlice';

// Componetne 🪢
import {CoreButton} from '@Components/buttons/CoreButton';

const ImageUploadButton = () => {
  const dispatch = useDispatch();
  return (
    <CoreButton
      value="Upload Photo"
      onPress={async () => {
        const response: any = await libraryImageUpload();
        dispatch(setImageToUpload(response));
      }}
    />
  );
};

export default ImageUploadButton;
