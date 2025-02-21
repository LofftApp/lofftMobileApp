// Redux 💿
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  DeleteSavedImagePayload,
  ImageBase,
  ImageRecord,
  ImageToUpload,
  ImageType,
  ImageUploadState,
  SavedImage,
  SelectedImage,
  SetSavedImagesPayload,
} from './types';
import {PURGE} from 'redux-persist';
import {UserType} from 'reduxFeatures/user/types';

const initialState: ImageUploadState = {
  imagesToUpload: [],
  savedImages: {
    tenant: {
      userImages: [],
      avatar: null,
    },
    lessor: {
      userImages: [],
      avatar: null,
      flatImages: [],
      mainFlatImage: null,
    },
  },
  deletedRecordImages: [],
  selectedImage: {
    tenant: {
      user: null,
    },
    lessor: {
      user: null,
      flat: null,
    },
  },
};

const deleteImageByUri = <T extends ImageBase>(
  images: T[],
  uri: string,
): {remaining: T[]; deleted: T[]} => {
  const remaining = images.filter(image => image.uri !== uri);
  const deleted = images.filter(image => image.uri === uri);
  return {remaining, deleted};
};

export const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState,
  reducers: {
    setImagesToUpload: (state, action: PayloadAction<ImageToUpload[]>) => {
      state.imagesToUpload = [...state.imagesToUpload, ...action.payload];
    },

    setSelectedImage: (state, action: PayloadAction<SelectedImage | null>) => {
      if (action.payload === null) {
        state.selectedImage = initialState.selectedImage;
        console.log('SelectedImage cleared');
        return;
      }

      const {uri, source, blobId, userType, imageType} = action.payload;
      const hasBlobId = blobId !== undefined;
      if (userType === UserType.TENANT) {
        state.selectedImage.tenant.user = hasBlobId
          ? {uri, source, blobId, userType, imageType}
          : {uri, source, userType, imageType};
      } else if (userType === UserType.LESSOR) {
        if (imageType === ImageType.User) {
          state.selectedImage.lessor.user = hasBlobId
            ? {uri, source, blobId, userType, imageType}
            : {uri, source, userType, imageType};
        } else {
          state.selectedImage.lessor.flat = hasBlobId
            ? {uri, source, blobId, userType, imageType}
            : {uri, source, userType, imageType};
        }
      }
    },

    deleteImageToUpload: (state, action: PayloadAction<string>) => {
      state.imagesToUpload = state.imagesToUpload.filter(
        image => image.uri !== action.payload,
      );
    },

    clearImagesToUpload: state => {
      state.imagesToUpload = [];
      state.deletedRecordImages = [];
      console.log('ImagesToUpload cleared');
    },

    setSavedImages: (
      state,
      action: PayloadAction<SetSavedImagesPayload | null>,
    ) => {
      if (action.payload === null) {
        state.savedImages = initialState.savedImages;
        console.log('SavedImages cleared');
        return;
      }
      const {userType, imageType, images, avatar, mainFlatImage} =
        action.payload;
      if (userType === UserType.TENANT) {
        state.savedImages.tenant.userImages = images;
        state.savedImages.tenant.avatar = avatar || null;
      } else if (userType === UserType.LESSOR) {
        if (imageType === ImageType.User) {
          state.savedImages.lessor.userImages = images;
          state.savedImages.lessor.avatar = avatar || null;
        } else {
          state.savedImages.lessor.flatImages = images;
          state.savedImages.lessor.mainFlatImage = mainFlatImage || null;
        }
      }
    },

    deleteSavedImage: (
      state,
      action: PayloadAction<DeleteSavedImagePayload>,
    ) => {
      const {userType, imageType, uri} = action.payload;
      let result: {remaining: SavedImage[]; deleted: SavedImage[]} = {
        remaining: [],
        deleted: [],
      };

      if (userType === UserType.TENANT) {
        result = deleteImageByUri(state.savedImages.tenant.userImages, uri);
        state.savedImages.tenant.userImages = result.remaining;
      } else if (userType === UserType.LESSOR) {
        if (imageType === ImageType.User) {
          result = deleteImageByUri(state.savedImages.lessor.userImages, uri);
          state.savedImages.lessor.userImages = result.remaining;
        } else {
          result = deleteImageByUri(state.savedImages.lessor.flatImages, uri);
          state.savedImages.lessor.flatImages = result.remaining;
        }
      }

      const deletedWithBlobId = result.deleted.filter(
        (image): image is ImageRecord =>
          'blobId' in image && Boolean(image.blobId),
      );

      state.deletedRecordImages.push(...deletedWithBlobId);
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const {
  setImagesToUpload,
  setSelectedImage,
  deleteImageToUpload,
  clearImagesToUpload,
  setSavedImages,
  deleteSavedImage,
} = imageUploadSlice.actions;
export default imageUploadSlice.reducer;
