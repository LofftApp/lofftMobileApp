import {Currency} from 'reduxFeatures/assets/types';

// newUserSlice
interface NewUserTenantDetails {
  userType: 'tenant';
  languages: number[];
  characteristics: number[];
  genderIdentity: string[];
  safeSpaces: number[];
  city: number;
  districts: number[];
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

  genderIdentity: string[];
  safeSpaces: number[];
  city: number;
  districts: number[];
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

type ImageFile = {
  fileName: string;
  fileSize: number;
  height: number;
  type: string;
  uri: string;
  width: number;
};

export type {
  UserJourneyState,
  NewUserTenantDetails,
  NewUserLessorDetails,
  NewUserDetails,
  ImageFile,
};
