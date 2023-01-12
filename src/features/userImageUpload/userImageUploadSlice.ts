import {createSlice} from '@reduxjs/toolkit';
import {deleteImage} from '@Firebase/firebaseStorage';

export const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState: {
    imagesToUpload: [],
  },
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
export default imageUploadSlice.reducer;
