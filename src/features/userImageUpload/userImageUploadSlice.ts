import {createSlice} from '@reduxjs/toolkit';

export const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState: {
    imagesToUpload: [],
  },
  reducers: {
    setImageToUpload: (state: any, action: any) => {
      state.imagesToUpload = action.payload;
      console.log(action.payload);
    },
  },
});

export const {setImageToUpload} = imageUploadSlice.actions;
export default imageUploadSlice.reducer;
