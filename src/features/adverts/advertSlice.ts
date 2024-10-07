import {createSlice} from '@reduxjs/toolkit';

import type {AdvertState} from './types';

const initialState: AdvertState = {
  loading: false,
  adverts: [],
  advert: null,
  error: null,
};

export const advertSlice = createSlice({
  name: 'advert',
  initialState,
  reducers: {},
});

export const {} = advertSlice.actions;
export default advertSlice.reducer;
