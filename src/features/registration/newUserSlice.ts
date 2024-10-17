import {PayloadAction, createSlice} from '@reduxjs/toolkit';
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
  description: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string;

  // userDescription: string | null;
  // textAboutUser: string | null;
  // cost: number | null;
  // location: string | null;
  // district: string | null;
  // fromDate: string | null;
  // perminant: boolean | null;
  // untilDate: string | null;
  // images: string[] | null;
  // flatMate: string[] | null;
  // warmRent: number | null;
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
  description: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string;
  address: {
    address: string;
    district?: string;
  };
  price: number;
  warmRent: boolean;

  // userDescription: string | null;
  // textAboutUser: string | null;
  // cost: number | null;
  // location: string | null;
  // district: string | null;
  // fromDate: string | null;
  // perminant: boolean | null;
  // untilDate: string | null;
  // images: string[] | null;
  // flatMate: string[] | null;
  // warmRent: number | null;
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

// interface UserJourneyActions {
//   genderIdentity: [];
//   districts: any[] | null;
//   minRent: number;
//   maxRent: number;
//   textAboutUser: string;
//   cost: number;
//   location: string;
//   district: string;
//   fromDate: string;
//   perminant: boolean;
//   untilDate: string;
//   images: string[];
//   flatFeatures: string[];
//   flatMate: string[];
//   warmRent: number;
// }

const initialState: UserJourneyState = {
  currentScreen: 1,
  userJourney: '',
  userType: '',
  renterJourney: {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
  },
  lessorJourney: {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  },

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
      description: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      // userDescription: null,
      // textAboutUser: null,
      // cost: null,
      // location: null,
      // district: null,
      // fromDate: null,
      // perminant: null,
      // untilDate: null,
      // images: null,
      // flatFeatures: [],
      // flatMate: [],
      // warmRent: null,
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
      description: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      address: {
        address: '',
        district: '',
      },
      price: 0,
      warmRent: false,
      // userDescription: null,
      // textAboutUser: null,
      // location: null,
      // district: null,
      // fromDate: null,
      // perminant: null,
      // untilDate: null,
      // images: null,
      // flatMate: [],
      // warmRent: null,
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

    // setDetails: (state, action: PayloadAction<UserJourneyActions>) => {
    //   const data = action.payload;
    //   const userDetails = state.userDetails;
    //   // Renter
    //   if (state.userType === 'renter') {
    //     userDetails.genderIdentity =
    //       data.genderIdentity?.value || userDetails.genderIdentity;
    //     userDetails.districts = data?.districts || userDetails.districts;
    //     userDetails.minRent = data?.minRent || userDetails.minRent;
    //     userDetails.maxRent = data?.maxRent || userDetails.maxRent;
    //     userDetails.userDescription =
    //       data?.textAboutUser || userDetails.userDescription;
    //   }

    //   // Lesser
    //   if (state.userType === 'lesser') {
    //     userDetails.cost = data?.cost || userDetails.cost;
    //     userDetails.location = data?.location || userDetails.location;
    //     userDetails.district = data?.district || userDetails.district;
    //     userDetails.fromDate = data?.fromDate || userDetails.fromDate;
    //     if (!data?.perminant && data?.perminant !== undefined) {
    //       userDetails.untilDate = data?.untilDate;
    //     }
    //     userDetails.perminant = data?.perminant || userDetails.perminant;
    //     userDetails.images = data?.images || userDetails.images;
    //   }

    //   // All
    //   userDetails.flatFeatures = data?.flatFeatures || userDetails.flatFeatures;
    //   userDetails.flatMate = data?.flatMate || userDetails.flatMate;
    //   if (!data?.warmRent && data?.warmRent !== undefined) {
    //     userDetails.warmRent = data?.warmRent;
    //   }
    // },

    // saveUserDetails: (state: any) => {
    // const userDetails = state.userDetails;
    // if (state.userType === 'renter') {
    // TODO: Create user profile
    // createUserProfile({
    //   genderIdentity: userDetails.genderIdentity,
    //   userDescription: userDetails.userDescription,
    //   personalPreferences: userDetails.flatMate,
    //   districts: userDetails.districts,
    //   flatPreferences: userDetails.flatFeatures,
    //   maxRent: userDetails.maxRent,
    //   minRent: userDetails.minRent,
    //   warmRent: userDetails.warmRent,
    // });
    // } else if (state.userType === 'lesser') {
    // TODO: Create flat profile
    // createFlatProfile({
    //   flatFeatures: userDetails.flatFeatures || {},
    //   cost: userDetails.cost || 0,
    //   warmrent: userDetails.warmRent || false,
    //   location: userDetails.location || '',
    //   district: userDetails.district || null,
    //   fromDate: userDetails.fromDate || Date.now,
    //   untilDate: userDetails.untilDate || null,
    //   perminant: userDetails.perminant || false,
    //   flatMate: userDetails.flatMate || {},
    //   images: userDetails.images || null,
    // });
    // }
    // },
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
