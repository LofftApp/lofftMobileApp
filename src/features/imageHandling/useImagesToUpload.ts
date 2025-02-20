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
import {useUserType} from 'reduxFeatures/user/useUserType';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {
  DeleteSavedImagePayload,
  ImageToUpload,
  ImageType,
  SelectedImage,
} from './types';
import {SetSavedImagesPayload} from './types';

export const useImagesToUpload = (_imageType?: ImageType) => {
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
  const _selectedImage = useAppSelector(
    state => state.imageUpload.selectedImage,
  );
  console.log('SelectedImage OBJECT', _selectedImage);
  const deletedRecordImages = useAppSelector(
    state => state.imageUpload.deletedRecordImages,
  );

  const setSavedImages = useCallback(
    ({
      userType,
      imageType,
      images,
      avatar,
      mainFlatImage,
    }: SetSavedImagesPayload) => {
      dispatch(
        _setSavedImages({userType, imageType, images, avatar, mainFlatImage}),
      );
    },
    [dispatch],
  );

  const setSelectedImage = useCallback(
    (image: SelectedImage | null) => {
      dispatch(_setSelectedImage(image));
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

  const {isLessor} = useUserType();
  const {isNewUserLessor} = useNewUserDetails(isLessor);

  const getSelectedImage = useCallback(() => {
    if (!_imageType) {
      return null;
    }

    if (isLessor || isNewUserLessor) {
      return _imageType === ImageType.User
        ? _selectedImage?.lessor?.user
        : _selectedImage?.lessor?.flat;
    }
    return _selectedImage?.tenant?.user;
  }, [isLessor, isNewUserLessor, _imageType, _selectedImage]);

  const selectedImage = getSelectedImage();

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
