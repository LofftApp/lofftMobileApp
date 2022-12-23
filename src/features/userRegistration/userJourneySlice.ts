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
    '2': {
      screenName: 'AboutYouFlatHuntScreen',
      headerText: 'Who is your ideal flatmate?',
      subHeaderText:
        "Select all tags that describe your ideal flatmate and we'll match them for you!",
    },
    '3': {
      screenName: 'FlatFeaturesScreen',
      headerText: 'What is your flat like?',
      subHeaderText: 'Select all the tags that match your place.',
    },
    '4': {screenName: 'FlatPhotoUploadScreen'},
    '5': {screenName: 'UserConditionsScreen'},
  };
};

export const userJourneySlice = createSlice({
  name: 'userDetails',
  initialState: {
    userType: null,
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
    },
  },
});

export const {setUserType, setFlatDetails} = userJourneySlice.actions;
export default userJourneySlice.reducer;
