import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  uid: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUid: (state, action) => {
      state.uid = action.payload;
    },
  },
});

export const {setUid} = usersSlice.actions;
export default usersSlice.reducer;
