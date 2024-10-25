import {
  addressSchema,
  characteristicSchema,
  featureSchema,
} from 'lib/zodSchema';
import {z} from 'zod';

type Characteristic = z.infer<typeof characteristicSchema>;
type Feature = z.infer<typeof featureSchema>;
type Currency = z.infer<typeof addressSchema.shape.currency>;
interface District {
  id: number;
  name: string;
  toggle: boolean;
  emoji?: string;
}

interface City {
  districts: District[];
  flag: string;
}

interface Gender {
  id: number;
  emoji: string;
  name: string;
  toggle: boolean;
}

interface Language {
  id: number;
  name: string;
  toggle: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Assets {
  characteristics: Characteristic[];
  cities: City[];
  features: Feature[];
  genders: Gender[];
  languages: Language[];
}

// newUserSlice
interface NewUserTenantDetails {
  userType: 'tenant';
  languages: string[];
  characteristics: Characteristic[];
  genderIdentity: {
    id: number;
    toggle: boolean;
    value: string;
    emoji: string;
  }[];
  flatIdentities: {
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
interface NewUserLessorDetails {
  userType: 'lessor';
  languages: string[];
  characteristics: Characteristic[];

  genderIdentity: {
    id: number;
    toggle: boolean;
    value: string;
    emoji: string;
  }[];
  flatIdentities: {
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
  Characteristic,
  Feature,
  District,
  City,
  Gender,
  Language,
  Currency,
  Assets,
  UserJourneyState,
  NewUserTenantDetails,
  NewUserLessorDetails,
  NewUserDetails,
};
