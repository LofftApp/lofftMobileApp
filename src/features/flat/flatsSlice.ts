import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {RootState} from '../../app/store';

interface FlatsState {
  allFlats: any[];
  favouriteFlats: any[];
  appliedFlats: any[];
}

const initialState: FlatsState = {
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
export const selectAllFlats = (state: RootState) => state.flats;
export default flatsSlice.reducer;
