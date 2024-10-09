import {createSlice} from '@reduxjs/toolkit';

// Types
import type {UserState} from './types';

const initialState: UserState = {
  loading: false,
  user: {
    id: null,
    email: null,
    admin: null,
    termsAccepted: null,
    userType: null,
    credits: null,
    profile: {
      description: null,
      genderIdentity: null,
      characteristics: null,
      age: null,
      dateOfBirth: null,
      firstName: null,
      lastName: null,
    },
    filter: null,
  },
};

// Middlewares

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearProfile: state => {
      state.user.id = null;
      state.user.userType = null;
      state.user.email = null;
      state.user.profile.genderIdentity = null;
      state.user.credits = null;
      state.user.admin = false;
      state.user.termsAccepted = false;
      state.user.profile.description = null;
      state.user.profile.age = null;
      state.user.profile.dateOfBirth = null;
      state.user.profile.firstName = null;
      state.user.profile.lastName = null;
      state.user.filter = null;
      state.user.profile.characteristics = null;
    },
  },
});

export const {clearProfile} = userSlice.actions;
export default userSlice.reducer;
