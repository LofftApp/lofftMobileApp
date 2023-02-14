// Redux 💿
import {createSlice} from '@reduxjs/toolkit';

// Api 🧠
import {getFlatsFromDB} from '@Api/firebase/firestoreActions';
import {loadFlats} from './loadFlats';

export const flatHandlingSlice = createSlice({
  name: 'flatHandling',
  initialState: {
    flatsFavourite: [],
    flatsApplied: [],
  },
  reducers: {
    loadUserFlats: (state: any, action: any) => {
      const load = async () => {
        const test = await loadFlats();
        console.log('Favourites ', test);
        state.flatsFavourite = test;
      };
      load();
      console.log('Loading Flats');
    },
    setImageToUpload: (state: any, action: any) => {
      const photos = state.imagesToUpload;
      state.imagesToUpload = photos.concat(action.payload);
    },
  },
});

export const {setImageToUpload, loadUserFlats} = flatHandlingSlice.actions;
export default flatHandlingSlice.reducer;
