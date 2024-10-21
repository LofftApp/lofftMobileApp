// Redux 💿
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  DeleteSavedImagePayload,
  ImageToUpload,
  ImageUploadState,
  SetSavedImagesPayload,
} from './types';
import {PURGE} from 'redux-persist';

const initialState: ImageUploadState = {
  imagesToUpload: [],
  savedImages: {
    renter: {
      userImages: [],
    },
    lessor: {
      userImages: [],
      flatImages: [],
    },
  },
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
        image => image.fileName !== action.payload,
      );
    },

    clearImagesToUpload: state => {
      state.imagesToUpload = [];
    },

    setSavedImages: (state, action: PayloadAction<SetSavedImagesPayload>) => {
      const {userType, imageType, images} = action.payload;
      if (userType === 'renter') {
        state.savedImages.renter.userImages = images;
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
      const {userType, imageType, fileName} = action.payload;

      if (userType === 'renter') {
        state.savedImages.renter.userImages =
          state.savedImages.renter.userImages.filter(
            image => image.fileName !== fileName,
          );
      } else if (userType === 'lessor') {
        if (imageType === 'user') {
          state.savedImages.lessor.userImages =
            state.savedImages.lessor.userImages.filter(
              image => image.fileName !== fileName,
            );
        } else {
          state.savedImages.lessor.flatImages =
            state.savedImages.lessor.flatImages.filter(
              image => image.fileName !== fileName,
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
