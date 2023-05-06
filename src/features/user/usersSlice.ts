import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getProfile} from './usersMiddleware';

interface UserState {
  loading: boolean;
  profile: {
    userType: string | null;
    genderIdentity: string | null;
    tokens: number | null;
    admin: boolean;
    terms_and_conditions: boolean;
  };
}

const initialState: UserState = {
  loading: false,
  profile: {
    userType: null,
    genderIdentity: null,
    tokens: null,
    admin: false,
    terms_and_conditions: false,
  },
};

// Middlewares

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearProfile: state => {
      state.profile.userType = null;
      state.profile.genderIdentity = null;
      state.profile.tokens = null;
      state.profile.admin = false;
      state.profile.terms_and_conditions = false;
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
        state.profile.userType = action.payload.user.user_type;
        state.profile.genderIdentity = action.payload.user.gender_identity;
        state.profile.tokens = action.payload.user.tokens;
        state.profile.admin = action.payload.user.admin;
        state.profile.terms_and_conditions =
          action.payload.user.terms_and_conditions;
      },
    );
  },
});

export const {clearProfile} = userSlice.actions;
export default userSlice.reducer;
