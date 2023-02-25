// Redux 💿
import {createSlice} from '@reduxjs/toolkit';

// Api 🧠
import {getFlatsFromDB} from '@Api/firebase/firestoreActions';
import {loadFlats} from './loadFlats';

export const flatHandlingSlice = createSlice({
  name: 'flatHandling',
  initialState: {
    flats: [],
    flatsFavourite: [],
    flatsApplied: [],
  },
  reducers: {
    loadUserFlats: (state: any, action: any) => {
      console.log('state: ', state);
      console.log('action: ', action);
    },
    setImageToUpload: (state: any, action: any) => {
      const photos = state.imagesToUpload;
      state.imagesToUpload = photos.concat(action.payload);
    },
  },
});

export const {setImageToUpload, loadUserFlats} = flatHandlingSlice.actions;
export default flatHandlingSlice.reducer;
