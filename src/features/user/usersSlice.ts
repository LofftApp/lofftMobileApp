import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getProfile} from './usersMiddleware';
// import {applyForAdvert} from 'reduxFeatures/adverts/advertMiddleware';

// Types
import type {UserState} from './types';
import {advertApi} from 'reduxFeatures/adverts/advertApi';

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
  extraReducers: builder => {
    builder.addCase(getProfile.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getProfile.fulfilled,
      (state, action: PayloadAction<any>) => {
        console.log('getProfile.fulfilled', action.payload);
        state.loading = false;
        state.user.id = action.payload.user.id;
        state.user.email = action.payload.user.email;
        state.user.admin = action.payload.user.admin;
        state.user.termsAccepted = action.payload.user.termsAccepted;
        state.user.userType = action.payload.user.user_type;
        state.user.credits = action.payload.user.credits;
        state.user.profile.genderIdentity =
          action.payload.user.profile.gender_identity;
        state.user.profile.description =
          action.payload.user.profile.description;
        state.user.profile.age = action.payload.user.profile.age;
        state.user.profile.dateOfBirth =
          action.payload.user.profile.date_of_birth;
        state.user.profile.firstName = action.payload.user.profile.first_name;
        state.user.profile.lastName = action.payload.user.profile.last_name;
        state.user.profile.characteristics =
          action.payload.user.profile.characteristics;
        state.user.filter = action.payload.user.filter;
      },
    );

    builder.addMatcher(
      advertApi.endpoints.applyForFlat.matchFulfilled,
      (state, action) => {
        state.user.credits = action.payload.credits;
      },
    );
  },
});

export const {clearProfile} = userSlice.actions;
export default userSlice.reducer;
