// Redux 💿
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ImageUploadState {
  imagesToUpload: any[];
}

const initialState: ImageUploadState = {
  imagesToUpload: [],
};

export const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState,
  reducers: {
    setImageToUpload: (state: any, action: any) => {
      const photos = state.imagesToUpload;
      state.imagesToUpload = photos.concat(action.payload);
    },

    deleteImageToUpload: (state: any, action: PayloadAction<string>) => {
      // const imageUrl = action.payload;
      const index = state.imagesToUpload.indexOf(action.payload);
      state.imagesToUpload.splice(index, 1);
      // deleteImage(imageUrl);
    },
  },
});

export const {setImageToUpload, deleteImageToUpload} = imageUploadSlice.actions;
export default imageUploadSlice.reducer;
