import {createSlice} from '@reduxjs/toolkit';

export const userJourneySlice = createSlice({
  name: 'userDetails',
  initialState: {
    userType: null,
  },
  reducers: {
    setUserType: (state: any, action: any) => {
      console.log(action.payload);
      state.userType = action.payload;
    },
  },
});

export const {setUserType} = userJourneySlice.actions;
export default userJourneySlice.reducer;
