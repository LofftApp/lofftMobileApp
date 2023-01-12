import {createSlice} from '@reduxjs/toolkit';

export const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState: {
    imagesToUpload: [],
  },
  reducers: {
    setImageToUpload: (state: any, action: any) => {
      state.imagesToUpload = action.payload;
    },
    deleteImageToUpload: (state: any, action: any) => {
      const index = state.imagesToUpload.indexOf(action.payload);
      state.imagesToUpload.splice(index, 1);
    },
  },
});

export const {setImageToUpload, deleteImageToUpload} = imageUploadSlice.actions;
export default imageUploadSlice.reducer;
