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
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProfile.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getProfile.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        console.log('userType:', action.payload.user_type);
        state.profile.userType = action.payload.user_type;
        state.profile.genderIdentity = action.payload.gender_identity;
        state.profile.tokens = action.payload.tokens;
        state.profile.admin = action.payload.admin;
        state.profile.terms_and_conditions =
          action.payload.terms_and_conditions;
      },
    );
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
