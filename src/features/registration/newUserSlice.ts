import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {newUserScreens} from 'navigationStacks/newUserScreens';
import {createNewUserJourney} from 'helpers/createNewUserJourney';
import {PURGE} from 'redux-persist';
import {Characteristic, Feature} from './types';

export interface NewUserTenantDetails {
  userType: 'tenant';
  languages: string[];
  characteristics: Characteristic[];
  genderIdentity: {
    id: number;
    toggle: boolean;
    value: string;
    emoji: string;
  }[];
  city: {
    name: string;
    flag: string;
  };
  districts: {
    id: number;
    name: string;
    toggle: boolean;
    emoji?: string;
  }[];
  budget: {
    minPrice: number;
    maxPrice: number;
    warmRent: boolean;
  };
  filter: Feature[];
  selfDescription: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string;
}
export interface NewUserLessorDetails {
  userType: 'lessor';
  languages: string[];
  characteristics: Characteristic[];

  genderIdentity: {
    id: number;
    toggle: boolean;
    value: string;
    emoji: string;
  }[];
  city: {
    name: string;
    flag: string;
  };
  districts: {
    id: number;
    name: string;
    toggle: boolean;
    emoji?: string;
  }[];
  flatFeatures: Feature[];
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string;
  address: {
    address: string;
    district?: string;
  };
  price: number;
  currency: '€' | '$' | '£' | '';
  warmRent: boolean;
  fromDate: Date | string;
  untilDate: Date | string | null;
  permanent: boolean;
  tagLine: string;
  size: number;
  measurementUnit: 'm²' | 'ft²';
  flatDescription: string;
}
export type NewUserDetails = {
  tenant: NewUserTenantDetails;
  lessor: NewUserLessorDetails;
};
interface UserJourneyState {
  userType: 'lessor' | 'tenant' | '';
  tenantJourney: {[key: number]: boolean};
  lessorJourney: {[key: number]: boolean};
  currentScreen: number;
  userJourney: string;
  newUserDetails: NewUserDetails;
}

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
