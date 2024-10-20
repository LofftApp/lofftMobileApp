import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';
import {
  setImagesToUpload as _setImagesToUpload,
  deleteImageToUpload as _deleteImageToUpload,
  clearImagesToUpload as _clearImagesToUpload,
  setSavedImages as _setSavedImages,
  deleteSavedImage as _deleteSavedImage,
} from './imageUploadSlice';
import {useCallback} from 'react';
import {DeleteSavedImagePayload, ImageToUpload} from './types';
import {SetSavedImagesPayload} from './types';

export const useImagesToUpload = () => {
  const dispatch = useAppDispatch();

  const imagesToUpload = useAppSelector(
    state => state.imageUpload.imagesToUpload,
  );

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

  const clearImagesToUpload = () => {
    dispatch(_clearImagesToUpload());
  };

  const savedImages = useAppSelector(state => state.imageUpload.savedImages);

  const setSavedImages = useCallback(
    ({userType, imageType, images}: SetSavedImagesPayload) => {
      dispatch(_setSavedImages({userType, imageType, images}));
    },
    [dispatch],
  );

  const deleteSavedImage = ({
    userType,
    imageType,
    fileName,
  }: DeleteSavedImagePayload) => {
    dispatch(_deleteSavedImage({userType, imageType, fileName}));
  };

  return {
    imagesToUpload,
    setImagesToUpload,
    deleteImageToUpload,
    clearImagesToUpload,
    setSavedImages,
    savedImages,
    deleteSavedImage,
  };
};
