import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {currentUser} from './usersMiddleware';

interface UserState {
  loading: boolean;
  id: number;
  email: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  admin: boolean;
  termsAndConditions: boolean;
  jti: string | null;
  userType: string | null;
}

const initialState: UserState = {
  loading: false,
  id: null,
  email: null,
  createdAt: null,
  updatedAt: null,
  admin: false,
  jti: null,
  userType: null,
};

// Middlewares

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserID: (state, action: PayloadAction<any>) => {
      state.id = action.payload;
    },
    setUserProfile: (state, action) => {},
  },
  extraReducers: builder => {
    builder.addCase(currentUser.pending, state => {
      state.loading = true;
      console.log('current user data is on its way');
    }),
      builder.addCase(
        currentUser.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.userType = action.payload.user_type;
          state.id = action.payload.id;
          state.termsAndConditions = action.payload.terms_and_condtions;
          state.updatedAt = action.payload.updated_at;
          state.createdAt = action.payload.created_at;
          state.admin = action.payload.admin;
          state.email = action.payload.email;
        },
      );
  },

});

export const { } = userSlice.actions;
export default userSlice.reducer;
