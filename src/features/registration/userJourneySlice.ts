import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {
  createUserProfile,
  createFlatProfile,
} from '@Api/firebase/firestoreActions';

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
    '6': {screenName: 'ConditionsOfUseScreen'},
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
    '5': {screenName: 'ConditionsOfUseScreen'},
  };
};

interface UserJourneyState {
  userType: string | null;
  userJourney: any;
  userDetails: {
    genderIdentity: string | null;
    districts: any[] | null;
    minRent: number | null;
    maxRent: number | null;
    userDescription: string | null;
    textAboutUser: string | null;
    cost: number | null;
    location: string | null;
    district: string | null;
    fromDate: string | null;
    perminant: boolean | null;
    untilDate: string | null;
    images: string[] | null;
    flatFeatures: string[] | null;
    flatMate: string[] | null;
    warmRent: number | null;
  };
}

interface UserJourneyActions {
  genderIdentity: {id: number; toggle: boolean; value: string};
  districts: any[] | null;
  minRent: number;
  maxRent: number;
  textAboutUser: string;
  cost: number;
  location: string;
  district: string;
  fromDate: string;
  perminant: boolean;
  untilDate: string;
  images: string[];
  flatFeatures: string[];
  flatMate: string[];
  warmRent: number;
}

const initialState: UserJourneyState = {
  userType: null,
  userJourney: {},
  userDetails: {
    genderIdentity: null,
    districts: null,
    minRent: null,
    maxRent: null,
    userDescription: null,
    textAboutUser: null,
    cost: null,
    location: null,
    district: null,
    fromDate: null,
    perminant: null,
    untilDate: null,
    images: null,
    flatFeatures: null,
    flatMate: null,
    warmRent: null,
  },
};

export const userJourneySlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setUserType: (state, action: PayloadAction<string>) => {
      state.userType = action.payload;
      if (action.payload === 'lesser') {
        state.userJourney = lesserJourney();
      } else if (action.payload === 'renter') {
        state.userJourney = renterJourney();
      }
    },

    setDetails: (state, action: PayloadAction<UserJourneyActions>) => {
      const data = action.payload;
      const userDetails = state.userDetails;
      // Renter
      if (state.userType === 'renter') {
        userDetails.genderIdentity =
          data.genderIdentity?.value || userDetails.genderIdentity;
        userDetails.districts = data?.districts || userDetails.districts;
        userDetails.minRent = data?.minRent || userDetails.minRent;
        userDetails.maxRent = data?.maxRent || userDetails.maxRent;
        userDetails.userDescription =
          data?.textAboutUser || userDetails.userDescription;
      }

      // Lesser
      if (state.userType === 'lesser') {
        userDetails.cost = data?.cost || userDetails.cost;
        userDetails.location = data?.location || userDetails.location;
        userDetails.district = data?.district || userDetails.district;
        userDetails.fromDate = data?.fromDate || userDetails.fromDate;
        if (!data?.perminant && data?.perminant !== undefined) {
          userDetails.untilDate = data?.untilDate;
        }
        userDetails.perminant = data?.perminant || userDetails.perminant;
        userDetails.images = data?.images || userDetails.images;
      }

      // All
      userDetails.flatFeatures = data?.flatFeatures || userDetails.flatFeatures;
      userDetails.flatMate = data?.flatMate || userDetails.flatMate;
      if (!data?.warmRent && data?.warmRent !== undefined) {
        userDetails.warmRent = data?.warmRent;
      }
    },

    saveUserDetails: (state: any) => {
      const userDetails = state.userDetails;
      if (state.userType === 'renter') {
        createUserProfile({
          genderIdentity: userDetails.genderIdentity,
          userDescription: userDetails.userDescription,
          personalPreferences: userDetails.flatMate,
          districts: userDetails.districts,
          flatPreferences: userDetails.flatFeatures,
          maxRent: userDetails.maxRent,
          minRent: userDetails.minRent,
          warmRent: userDetails.warmRent,
        });
      } else if (state.userType === 'lesser') {
        createFlatProfile({
          flatFeatures: userDetails.flatFeatures || {},
          cost: userDetails.cost || 0,
          warmrent: userDetails.warmRent || false,
          location: userDetails.location || '',
          district: userDetails.district || null,
          fromDate: userDetails.fromDate || Date.now,
          untilDate: userDetails.untilDate || null,
          perminant: userDetails.perminant || false,
          flatMate: userDetails.flatMate || {},
          images: userDetails.images || null,
        });
      }
    },
  },
});

export const {setUserType, setDetails, saveUserDetails} =
  userJourneySlice.actions;
export default userJourneySlice.reducer;
