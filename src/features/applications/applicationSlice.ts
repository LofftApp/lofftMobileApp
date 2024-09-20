import {ApplicationState} from './types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: ApplicationState = {
  loading: false,
  applications: [
    {
      id: null,
      advert_id: null,
      status: null,
      applicant_id: null,
    },
  ],
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase();
  },
});
