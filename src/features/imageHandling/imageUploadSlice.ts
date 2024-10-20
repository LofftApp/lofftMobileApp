// Redux 💿
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ImageToUpload, ImageUploadState} from './types';

const initialState: ImageUploadState = {
  imagesToUpload: [],
};

export const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState,
  reducers: {
    setImagesToUpload: (state, action: PayloadAction<ImageToUpload>) => {
      state.imagesToUpload = [...state.imagesToUpload, action.payload];
    },

    deleteImageToUpload: (state, action: PayloadAction<string>) => {
      state.imagesToUpload = state.imagesToUpload.filter(
        (image: ImageToUpload) => image.fileName !== action.payload,
      );
    },
  },
});

export const {setImagesToUpload, deleteImageToUpload} =
  imageUploadSlice.actions;
export default imageUploadSlice.reducer;
