import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {checkToken, signUp, signIn, signOut} from './authenticationMiddleware';

interface AuthenticationState {
  id: number | null;
  email: string | null;
  loading: boolean;
  admin: boolean;
  authenticated: boolean;
}

const initialState: AuthenticationState = {
  id: null,
  email: null,
  loading: false,
  admin: false,
  authenticated: false,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(checkToken.pending, state => {
      state.loading = true;
      console.log('checkToken pending');
    });
    builder.addCase(
      checkToken.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.authenticated = action.payload;
      },
    );
    builder.addCase(signUp.pending, state => {
      state.loading = true;
      console.log('signUp pending');
    });
    builder.addCase(signUp.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.id = action.payload.id;
      state.email = action.payload.email;
    });
    builder.addCase(signUp.rejected, state => {
      state.loading = false;
      console.log('signUp rejected');
    });
    builder.addCase(signIn.pending, state => {
      state.loading = true;
      console.log('signIn pending');
    });
    builder.addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.admin = action.payload.admin;
    });
    builder.addCase(signIn.rejected, state => {
      state.loading = false;
      console.log('signIn rejected');
    });
    builder.addCase(signOut.pending, state => {
      state.loading = true;
      console.log('signOut pending');
    });
    builder.addCase(signOut.fulfilled, state => {
      state.loading = false;
      state.id = null;
      state.email = null;
      state.admin = false;
    });
    builder.addCase(signOut.rejected, state => {
      state.loading = false;
      console.log('signOut rejected');
    });
  },
});

export const {} = authenticationSlice.actions;
export default authenticationSlice.reducer;