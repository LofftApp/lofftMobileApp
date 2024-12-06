import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  authMessage: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  authMessage: '',
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
    setAuthMessage: (state, action: PayloadAction<string>) => {
      state.authMessage = action.payload;
    },
  },
});

export const {setAuthenticated, logout, setAuthMessage} = auth.actions;

export default auth.reducer;
