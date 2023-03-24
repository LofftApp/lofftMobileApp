// Redux 💿
import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from '../../app/store';

// Api 🧠
import {deleteImage} from '@Api/firebase/firebaseStorage';

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

    deleteImageToUpload: (state: any, action: any) => {
      const imageUrl = action.payload;
      const index = state.imagesToUpload.indexOf(action.payload);
      state.imagesToUpload.splice(index, 1);
      deleteImage(imageUrl);
    },
  },
});

export const {setImageToUpload, deleteImageToUpload} = imageUploadSlice.actions;
export const selectImagesToUpload = (state: RootState) => state.imageUpload;
export default imageUploadSlice.reducer;
