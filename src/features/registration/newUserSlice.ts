import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {newUserScreens} from 'components/componentData/newUserScreens';
import {createNewUserJourney} from 'helpers/createNewUserJourney';
import {PURGE} from 'redux-persist';

export interface NewUserRenterDetails {
  userType: 'renter';
  languages: string[];
  characteristics: {
    id: number;
    toggle: boolean;
    value: string;
    emoji: string;
  }[];
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
  filter: {
    id: number;
    value: string;
    toggle: boolean;
    emoji: string;
  }[];
  selfDescription: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string;
}
export interface NewUserLessorDetails {
  userType: 'lessor';
  languages: string[];
  characteristics: {
    id: number;
    toggle: boolean;
    value: string;
    emoji: string;
  }[];
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
  flatFeatures: {
    id: number;
    value: string;
    toggle: boolean;
    emoji: string;
  }[];
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string;
  address: {
    address: string;
    district?: string;
  };
  price: number;
  warmRent: boolean;
  fromDate: Date | string;
  untilDate: Date | string | null;
  permanent: boolean;
  flatDescription: string;
}
export type NewUserDetails = {
  renter: NewUserRenterDetails;
  lessor: NewUserLessorDetails;
};
interface UserJourneyState {
  userType: 'lessor' | 'renter' | '';
  renterJourney: {[key: number]: boolean};
  lessorJourney: {[key: number]: boolean};
  currentScreen: number;
  userJourney: string;
  newUserDetails: NewUserDetails;
}

const initialState: UserJourneyState = {
  currentScreen: 1,
  userJourney: '',
  userType: '',
  renterJourney: createNewUserJourney(newUserScreens.renter),
  lessorJourney: createNewUserJourney(newUserScreens.lessor),
  newUserDetails: {
    renter: {
      userType: 'renter',
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
      warmRent: false,
      fromDate: '',
      untilDate: '',
      permanent: false,
      flatDescription: '',
    },
  },
};

export const newUserSlice = createSlice({
  name: 'newUser',
  initialState,
  reducers: {
    setUserType: (state, action: PayloadAction<'lessor' | 'renter' | ''>) => {
      state.userType = action.payload;
      action.payload === 'lessor'
        ? (state.userJourney = 'lessor')
        : (state.userJourney = 'renter');
    },

    setCurrentScreen: (state, action: PayloadAction<number>) => {
      state.currentScreen = action.payload;
    },

    setNewUserDetails: (
      state,
      action: PayloadAction<
        Partial<NewUserLessorDetails> | Partial<NewUserRenterDetails>
      >,
    ) => {
      if (state.userType === 'lessor') {
        state.newUserDetails.lessor = {
          ...state.newUserDetails.lessor,
          ...(action.payload as Partial<NewUserLessorDetails>),
        };
      } else {
        state.newUserDetails.renter = {
          ...state.newUserDetails.renter,
          ...(action.payload as Partial<NewUserRenterDetails>),
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
