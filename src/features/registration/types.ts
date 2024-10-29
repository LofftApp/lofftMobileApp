import {City, Currency, District} from 'reduxFeatures/assets/types';

type CityNewUserSlice = City;

// newUserSlice
interface NewUserTenantDetails {
  userType: 'tenant';
  languages: number[];
  characteristics: number[];
  genderIdentity: number[];
  safeSpaces: number[];
  city: CityNewUserSlice;
  districts: District[];
  budget: {
    minPrice: number;
    maxPrice: number;
    warmRent: boolean;
  };
  filter: number[];
  selfDescription: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string;
}
interface NewUserLessorDetails {
  userType: 'lessor';
  languages: number[];
  characteristics: number[];

  genderIdentity: number[];
  safeSpaces: number[];
  city: CityNewUserSlice;
  districts: District[];
  flatFeatures: number[];
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string;
  address: {
    address: string;
    district?: string;
  };
  price: number;
  currency: Currency;
  warmRent: boolean;
  fromDate: Date | string;
  untilDate: Date | string | null;
  permanent: boolean;
  tagLine: string;
  size: number;
  measurementUnit: 'm²' | 'ft²';
  flatDescription: string;
}
type NewUserDetails = {
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

export type {
  UserJourneyState,
  NewUserTenantDetails,
  NewUserLessorDetails,
  NewUserDetails,
  CityNewUserSlice,
};
