import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getProfile} from './usersMiddleware';
import {applyForAdvert} from 'reduxFeatures/adverts/advertMiddleware';

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
      state.user.profile.genderIdentity = null;
      state.user.profile.credits = null;
      state.user.admin = false;
      state.user.termsAccepted = false;
      state.user.profile.description = null;
      state.user.filter = null;
      state.user.profile.characteristics = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(getProfile.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getProfile.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user.id = action.payload.user.id;
        state.user.email = action.payload.user.email;
        state.user.admin = action.payload.user.admin;
        state.user.termsAccepted = action.payload.user.termsAccepted;
        state.user.userType = action.payload.user.user_type;
        state.user.profile.genderIdentity =
          action.payload.user.profile.gender_identity;
        state.user.profile.description =
          action.payload.user.profile.description;
        state.user.profile.characteristics =
          action.payload.user.profile.characteristics;
        state.user.filter = action.payload.user.filter;
      },
    );
    builder.addCase(applyForAdvert.fulfilled, (state, action) => {
      state.user.credits = action.payload;
    });
    builder.addCase(applyForAdvert.rejected, (state, action) => {
      console.log("hehehe", action.payload)
    });
  },
});

export const {clearProfile} = userSlice.actions;
export default userSlice.reducer;
