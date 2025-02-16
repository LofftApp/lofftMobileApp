// Redux 💿
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  DeleteSavedImagePayload,
  ImageBase,
  ImageToUpload,
  ImageUploadState,
  SetSavedImagesPayload,
} from './types';
import {PURGE} from 'redux-persist';

const initialState: ImageUploadState = {
  imagesToUpload: [],
  savedImages: {
    tenant: {
      userImages: [],
    },
    lessor: {
      userImages: [],
      flatImages: [],
    },
  },
};

const deleteImageByUri = <T extends ImageBase>(
  images: T[],
  uri: string,
): T[] => {
  return images.filter(image => image.uri !== uri);
};

export const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState,
  reducers: {
    setImagesToUpload: (state, action: PayloadAction<ImageToUpload[]>) => {
      state.imagesToUpload = [...state.imagesToUpload, ...action.payload];
    },

    deleteImageToUpload: (state, action: PayloadAction<string>) => {
      state.imagesToUpload = state.imagesToUpload.filter(
        image => image.uri !== action.payload,
      );
    },

    clearImagesToUpload: state => {
      state.imagesToUpload = [];
    },

    setSavedImages: (state, action: PayloadAction<SetSavedImagesPayload>) => {
      const {userType, imageType, images} = action.payload;
      if (userType === 'tenant') {
        state.savedImages.tenant.userImages = images;
      } else if (userType === 'lessor') {
        if (imageType === 'user') {
          state.savedImages.lessor.userImages = images;
        } else {
          state.savedImages.lessor.flatImages = images;
        }
      }
    },

    deleteSavedImage: (
      state,
      action: PayloadAction<DeleteSavedImagePayload>,
    ) => {
      const {userType, imageType, uri} = action.payload;
      console.log('deleteSavedImage', action.payload);

      if (userType === 'tenant') {
        state.savedImages.tenant.userImages = deleteImageByUri(
          state.savedImages.tenant.userImages,
          uri,
        );
      } else if (userType === 'lessor') {
        if (imageType === 'user') {
          state.savedImages.lessor.userImages = deleteImageByUri(
            state.savedImages.lessor.userImages,
            uri,
          );
        } else {
          state.savedImages.lessor.flatImages = deleteImageByUri(
            state.savedImages.lessor.flatImages,
            uri,
          );
        }
      }
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
  deleteImageToUpload,
  clearImagesToUpload,
  setSavedImages,
  deleteSavedImage,
} = imageUploadSlice.actions;
export default imageUploadSlice.reducer;
