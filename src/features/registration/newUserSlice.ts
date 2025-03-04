import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {newUserScreens} from 'navigationStacks/newUserScreens';
import {createNewUserJourney} from 'helpers/createNewUserJourney';
import {PURGE} from 'redux-persist';
import {
  NewUserLessorDetails,
  NewUserTenantDetails,
  UserJourneyState,
} from './types';
import {UserType} from 'reduxFeatures/user/types';

const initialState: UserJourneyState = {
  currentScreen: 1,
  userJourney: '',
  userType: '',
  tenantJourney: createNewUserJourney(newUserScreens.tenant),
  lessorJourney: createNewUserJourney(newUserScreens.lessor),
  newUserDetails: {
    tenant: {
      userType: UserType.TENANT,
      languages: [],
      characteristics: [],
      genderIdentity: [],
      safeSpaces: [],
      city: 0,
      districts: [],
      budget: {
        minPrice: 0,
        maxPrice: 0,
        warmRent: false,
      },
      filter: [],
      dateOfBirth: '',
      selfDescription: '',
      firstName: '',
      lastName: '',
      deviceToken: '',
    },
    lessor: {
      userType: UserType.LESSOR,
      languages: [],
      characteristics: [],
      genderIdentity: [],
      safeSpaces: [],
      city: 0,
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
      currency: 'eur',
      warmRent: false,
      fromDate: '',
      untilDate: '',
      permanent: false,
      tagLine: '',
      size: 0,
      measurementUnit: 'm²',
      selfDescription: '',
      flatDescription: '',
      deviceToken: '',
    },
  },
};

export const newUserSlice = createSlice({
  name: 'newUser',
  initialState,
  reducers: {
    setUserType: (
      state,
      action: PayloadAction<UserType.LESSOR | UserType.TENANT | ''>,
    ) => {
      state.userType = action.payload;
      action.payload === UserType.LESSOR
        ? (state.userJourney = UserType.LESSOR)
        : (state.userJourney = UserType.TENANT);
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
      if (state.userType === UserType.LESSOR) {
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

    resetNewUserState: state => {
      console.log('RESET NEW USER STATE');
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const {
  setUserType,
  setCurrentScreen,
  setNewUserDetails,
  resetNewUserState,
} = newUserSlice.actions;
export default newUserSlice.reducer;
