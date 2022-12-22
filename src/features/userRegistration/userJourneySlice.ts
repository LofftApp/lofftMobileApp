import {createSlice} from '@reduxjs/toolkit';

const renterJourney = () => {
  return {
    '0': {screenName: 'AboutYouFlatHuntScreen'},
    '1': {screenName: 'GenderIdentityScreen'},
    '2': {screenName: 'SelectCityScreen'},
    '3': {screenName: 'FinderBudgetScreen'},
    '4': {screenName: 'FlatFeaturesScreen'},
    '5': {screenName: 'SelfDescribeScreen'},
  };
};

const lesserJourney = () => {
  return {
    '0': {screenName: 'WhereIsFlatScreen'},
    '1': {screenName: 'FlatLengthAvailableScreen'},
    '2': {screenName: 'AboutYouFlatHuntScreen'},
    '3': {screenName: 'UserConditionsScreen'},
    '4': {screenName: 'FlatPhotoUploadScreen'},
  };
};

export const userJourneySlice = createSlice({
  name: 'userDetails',
  initialState: {
    userType: null,
    activeScreen: 0,
  },
  reducers: {
    setUserType: (state: any, action: any) => {
      state.userType = action.payload;
      if (action.payload === 'lesser') {
        state.userJourney = lesserJourney();
      } else if (action.payload === 'renter') {
        state.userJourney = renterJourney();
      }
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
