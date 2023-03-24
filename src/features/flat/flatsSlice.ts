import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '@ReduxCore/store';

interface CounterState {
  allFlats: any[];
}

const initialState: CounterState = {
  allFlats: [],
};

const flatsSlice = createSlice({
  name: 'flats',
  initialState,
  reducers: {
    setAllFlats: (state, action: PayloadAction<any[]>) => {
      state.allFlats = action.payload;
    },
  },
});

export const {setAllFlats} = flatsSlice.actions;
export default flatsSlice.reducer;
