import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  allFlats: [],
  favouriteFlats: [],
  appliedFlats: [],
};

const flatsSlice = createSlice({
  name: 'flats',
  initialState,
  reducers: {
    setAllFlats: (state, action) => {
      state.allFlats = action.payload;
    },
  },
});

export const {setAllFlats} = flatsSlice.actions;
export default flatsSlice.reducer;
