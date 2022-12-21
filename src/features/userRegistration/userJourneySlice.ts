import {createSlice} from '@reduxjs/toolkit';

export const userJourneySlice = createSlice({
  name: 'userDetails',
  initialState: {
    userType: null,
  },
  reducers: {
    setUserType: (state: any, action: any) => {
      state.userType = action.payload;
    },
    setFlatDetails: (state: any, action: any) => {
      state.cost = action.payload.cost;
      state.location = action.payload.location;
      state.warmRent = action.payload.warmRent;
    },
  },
});

export const {setUserType, setFlatDetails} = userJourneySlice.actions;
export default userJourneySlice.reducer;
