import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
};

export const auth = createSlice({
  name: 'auth',
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
  // extraReducers: builder => {
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
  //
  // },
});

export const {setAuthenticated, logout} = auth.actions;

export default auth.reducer;
