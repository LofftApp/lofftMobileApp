import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';
import {
  setImagesToUpload as _setImagesToUpload,
  deleteImageToUpload as _deleteImageToUpload,
} from './imageUploadSlice';
import {useCallback} from 'react';
import {ImageToUpload} from './types';

export const useImagesToUpload = () => {
  const dispatch = useAppDispatch();

  const imagesToUpload = useAppSelector(
    state => state.imageUpload.imagesToUpload,
  );
  console.log('imagesToUpload', imagesToUpload);

  const setImagesToUpload = useCallback(
    (images: ImageToUpload[]) => {
      images.forEach(image => {
        dispatch(_setImagesToUpload(image));
      });
    },
    [dispatch],
  );
  const deleteImageToUpload = (image: string) => {
    dispatch(_deleteImageToUpload(image));
  };
  return {
    imagesToUpload,
    setImagesToUpload,
    deleteImageToUpload,
  };
};
