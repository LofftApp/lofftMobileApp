import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {newUserScreens} from 'navigationStacks/newUserScreens';
import {createNewUserJourney} from 'helpers/createNewUserJourney';
import {PURGE} from 'redux-persist';
import {
  NewUserLessorDetails,
  NewUserTenantDetails,
  UserJourneyState,
} from './types';

const initialState: UserJourneyState = {
  currentScreen: 1,
  userJourney: '',
  userType: '',
  tenantJourney: createNewUserJourney(newUserScreens.tenant),
  lessorJourney: createNewUserJourney(newUserScreens.lessor),
  newUserDetails: {
    tenant: {
      userType: 'tenant',
      languages: [],
      characteristics: [],
      genderIdentity: [],
      flatIdentities: [],
      city: {
        name: '',
        flag: '',
      },
      districts: [],
      budget: {
        minPrice: 0,
        maxPrice: 0,
        warmRent: false,
      },
      filter: [],
      selfDescription: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
    },
    lessor: {
      userType: 'lessor',
      languages: [],
      characteristics: [],
      genderIdentity: [],
      flatIdentities: [],
      city: {
        name: '',
        flag: '',
      },
      districts: [],
      flatFeatures: [],
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      address: {
        address: '',
        district: '',
      },
      price: 0,
      currency: '€',
      warmRent: false,
      fromDate: '',
      untilDate: '',
      permanent: false,
      tagLine: '',
      size: 0,
      measurementUnit: 'm²',
      flatDescription: '',
    },
  },
};

export const newUserSlice = createSlice({
  name: 'newUser',
  initialState,
  reducers: {
    setUserType: (state, action: PayloadAction<'lessor' | 'tenant' | ''>) => {
      state.userType = action.payload;
      action.payload === 'lessor'
        ? (state.userJourney = 'lessor')
        : (state.userJourney = 'tenant');
    },

    setCurrentScreen: (state, action: PayloadAction<number>) => {
      state.currentScreen = action.payload;
    },

    setNewUserDetails: (
      state,
      action: PayloadAction<
        Partial<NewUserLessorDetails> | Partial<NewUserTenantDetails>
      >,
    ) => {
      if (state.userType === 'lessor') {
        state.newUserDetails.lessor = {
          ...state.newUserDetails.lessor,
          ...(action.payload as Partial<NewUserLessorDetails>),
        };
      } else {
        state.newUserDetails.tenant = {
          ...state.newUserDetails.tenant,
          ...(action.payload as Partial<NewUserTenantDetails>),
        };
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const {setUserType, setCurrentScreen, setNewUserDetails} =
  newUserSlice.actions;
export default newUserSlice.reducer;
