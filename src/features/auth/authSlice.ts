import {createSlice} from '@reduxjs/toolkit';
import {PURGE} from 'redux-persist';

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
    setAuthMessage: (state, action) => {
      state.authMessage = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const {setAuthenticated, logout, setAuthMessage} = auth.actions;

export default auth.reducer;
