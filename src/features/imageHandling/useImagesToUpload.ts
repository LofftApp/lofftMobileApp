import {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';
import {
  setImagesToUpload as _setImagesToUpload,
  deleteImageToUpload as _deleteImageToUpload,
  clearImagesToUpload as _clearImagesToUpload,
  setSavedImages as _setSavedImages,
  deleteSavedImage as _deleteSavedImage,
  setSelectedImage as _setSelectedImage,
} from './imageUploadSlice';
import {DeleteSavedImagePayload, ImageToUpload, SelectedImage} from './types';
import {SetSavedImagesPayload} from './types';

export const useImagesToUpload = () => {
  const dispatch = useAppDispatch();

  const imagesToUpload = useAppSelector(
    state => state.imageUpload.imagesToUpload,
  );

  const setImagesToUpload = useCallback(
    (images: ImageToUpload[]) => {
      dispatch(_setImagesToUpload(images));
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
  const selectedImage = useAppSelector(
    state => state.imageUpload.selectedImage,
  );
  const deletedRecordImages = useAppSelector(
    state => state.imageUpload.deletedRecordImages,
  );
  console.log('deletedRecordImages', deletedRecordImages);

  const setSavedImages = useCallback(
    ({userType, imageType, images}: SetSavedImagesPayload) => {
      dispatch(_setSavedImages({userType, imageType, images}));
    },
    [dispatch],
  );

  const setSelectedImage = useCallback(
    ({uri, source, blobId}: SelectedImage) => {
      dispatch(_setSelectedImage({uri, source, blobId}));
    },
    [dispatch],
  );

  const deleteSavedImage = ({
    userType,
    imageType,
    uri,
  }: DeleteSavedImagePayload) => {
    dispatch(_deleteSavedImage({userType, imageType, uri}));
  };

  return {
    imagesToUpload,
    setImagesToUpload,
    deleteImageToUpload,
    clearImagesToUpload,
    setSavedImages,
    savedImages,
    deleteSavedImage,
    deletedRecordImages,
    setSelectedImage,
    selectedImage,
  };
};
