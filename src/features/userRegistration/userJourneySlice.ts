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
      console.log(action);
      const data = action.payload;
      state.cost = data?.cost || state.cost;
      state.location = data?.location || state.location;
      state.warmRent = data?.warmRent || state.warmRent;
      state.fromDate = data?.fromDate || state.fromDate;
      if (!data.perminant && data.perminant !== undefined) {
        state.untilDate = data?.untilDate;
      }
      state.perminant = data?.perminant || state.perminant;
      state.flatFeatures = data?.flatFeatures || state.flatFeatures;
      state.flatMate = data?.flatMate || state.flatMate;
      console.log(state);
    },
  },
});

export const {setUserType, setFlatDetails} = userJourneySlice.actions;
export default userJourneySlice.reducer;
