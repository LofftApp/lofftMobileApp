import {createSlice} from '@reduxjs/toolkit';

const renterJourney = () => {
  return {
    '0': {screenName: 'AboutYouFlatHuntScreen'},
    '1': {screenName: 'GenderIdentityScreen'},
    '2': {screenName: 'SelectCityScreen'},
    '3': {screenName: 'FinderBudgetScreen'},
    '4': {
      screenName: 'FlatFeaturesScreen',
      headerText: 'What is your ideal flat?',
      subHeaderText:
        'Select all tags that describe who you are and find the Lofft of your life!',
    },
    '5': {screenName: 'SelfDescribeScreen'},
    '6': {screenName: 'UserConditionsScreen'},
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
    '6': {screenName: 'UserConditionsScreen'},
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
      console.log(state);
      // Renter
      if (state.userType === 'renter') {
        state.gender = data.genderIdentity?.value || state.genderIdentity;
        state.districts = data?.districts || state.districts;
        state.minRent = data?.minPrice || state.minRent;
        state.maxRent = data?.maxRent || state.maxRent;
      }

      // Lesser
      if (state.userType === 'lesser') {
        state.cost = data?.cost || state.cost;
        state.location = data?.location || state.location;
        state.fromDate = data?.fromDate || state.fromDate;
        if (!data?.perminant && data?.perminant !== undefined) {
          state.untilDate = data?.untilDate;
        }
        state.perminant = data?.perminant || state.perminant;
      }

      // All
      state.flatFeatures = data?.flatFeatures || state.flatFeatures;
      state.flatMate = data?.flatMate || state.flatMate;
      state.warmRent = data?.warmRent || state.warmRent;

      console.log(state);
    },
  },
});

export const {setUserType, setFlatDetails} = userJourneySlice.actions;
export default userJourneySlice.reducer;
