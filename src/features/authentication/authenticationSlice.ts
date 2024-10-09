import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {checkToken, signUp, signIn, signOut} from './authenticationMiddleware';

interface AuthenticationState {
  loading: boolean;
  authenticated: boolean;
  userType: string | null;
}
interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}
// const initialState: AuthenticationState = {
//   loading: false,
//   authenticated: false,
//   userType: null,
// };
const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<{token: string}>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
  extraReducers: builder => {
    // builder.addCase(checkToken.pending, state => {
    //   state.loading = true;
    //   console.log('checkToken pending');
    // });
    // builder.addCase(
    //   checkToken.fulfilled,
    //   (state, action: PayloadAction<any>) => {
    //     state.loading = false;
    //     state.authenticated = action.payload;
    //     console.log('checkToken successfull');
    //   },
    // );
    // builder.addCase(signUp.pending, state => {
    //   state.loading = true;
    //   console.log('signUp pending');
    // });
    // builder.addCase(signUp.fulfilled, (state, action: PayloadAction<any>) => {
    //   state.loading = false;
    //   state.authenticated = true;
    //   console.log('signUp successfull');
    // });
    // builder.addCase(signUp.rejected, state => {
    //   state.loading = false;
    //   console.log('signUp rejected');
    // });
    // builder.addCase(signIn.pending, state => {
    //   state.loading = true;
    //   console.log('signIn pending');
    // });
    // builder.addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
    //   state.loading = false;
    //   state.authenticated = true;
    //   console.log('signIn successfull');
    // });
    // builder.addCase(signIn.rejected, state => {
    //   state.loading = false;
    //   console.log('signIn rejected');
    // });
    // builder.addCase(signOut.pending, state => {
    //   state.loading = true;
    //   console.log('signOut pending');
    // });
    // builder.addCase(signOut.fulfilled, state => {
    //   state.loading = false;
    //   state.authenticated = false;
    //   console.log('signOut successfull');
    // });
    // builder.addCase(signOut.rejected, state => {
    //   state.loading = false;
    //   console.log('signOut rejected');
    // });
  },
});

export const {setAuthenticated, logout} = authenticationSlice.actions;

export default authenticationSlice.reducer;
