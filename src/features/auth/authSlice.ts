import {createSlice} from '@reduxjs/toolkit';

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
    setAuthenticated: state => {
      state.isAuthenticated = true;
    },
    logout: state => {
      state.isAuthenticated = false;
    },
  },
});

export const {setAuthenticated, logout} = auth.actions;

export default auth.reducer;
