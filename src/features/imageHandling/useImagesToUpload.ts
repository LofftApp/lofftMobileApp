import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';
import {setImagesToUpload as _setImagesToUpload} from './userImageUploadSlice';
import {useCallback} from 'react';

export const useImagesToUpload = () => {
  const dispatch = useAppDispatch();

  const imagesToUpload = useAppSelector(
    state => state.imageUpload.imagesToUpload,
  );
  console.log('imagesToUpload', imagesToUpload);

  const setImagesToUpload = useCallback(
    (images: any) => {
      images.forEach((image: any) => {
        dispatch(_setImagesToUpload(image));
      });
    },
    [dispatch],
  );
  return {
    imagesToUpload,
    setImagesToUpload,
  };
};
