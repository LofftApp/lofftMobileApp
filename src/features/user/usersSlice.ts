import {createSlice} from '@reduxjs/toolkit';

// Types
import type {UserState} from './types';

const initialState = {};

// Middlewares

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;
export default userSlice.reducer;
