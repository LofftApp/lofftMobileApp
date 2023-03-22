import {createSlice, nanoid, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  uid: null,
  type: null,
  admin: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUid: (state, action) => {
      state.uid = action.payload;
    },
    setUserID: (state, action) => {
      state.uid = action.payload;
    },
  },
});

// WIP for code, below currently not used
export const fetchCurrentUser = createAsyncThunk(
  'users/fetchCurrentUser',
  async () => {
    const response = await fetch('/api/current_user');
    return await response.json();
  },
);

export const {setUid, setUserID} = usersSlice.actions;
export default usersSlice.reducer;
