import {
  UserCharacteristics,
  UserFilter,
  UserProfile,
} from 'reduxFeatures/user/types';
import {Application, IncomingApplication} from '../applications/types';
import {Currency} from 'reduxFeatures/assets/types';
import {NewUserLessorDetails} from 'reduxFeatures/registration/types';
interface AdvertUser {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  termsAccepted: boolean;
  userType: string;
  admin: boolean;
}

interface AdvertApplicant extends AdvertUser {
  filters: UserFilter[];
  characteristics: UserCharacteristics[];
  matchScore: number;
  profile: UserProfile;
}

interface AdvertCharacteristics {
  id: number;
  emoji: string;
  name: string;
}

interface AdvertFeatures {
  id: number;
  emoji: string;
  name: string;
}

interface AdvertFlat {
  id: number;
  address: string;
  tagLine: string;
  description: string;
  size: number;
  measurementUnit: string;
  district: string;
  characteristics: AdvertCharacteristics[];
  features: AdvertFeatures[];
  city: string;
  photos: string[];
}

interface Advert {
  id: number;
  monthlyRent: number;
  currency: Currency;
  warmRent: boolean;
  fromDate: number;
  toDate: number;
  createdAt: string;
  status: 'open' | 'review' | 'viewing' | 'offered' | 'closed';
  matchScore: number;
  favorite: boolean;
  applied: boolean;
  lessor: AdvertUser;
  currentUserLessor: boolean;
  flat: AdvertFlat;
  applicants?: AdvertApplicant[];
}

interface AdvertsAndFeatures {
  adverts: Advert[];
}

type GetAdvertsParams =
  | {
      features?: string;
      minPrice?: string | number;
      maxPrice?: string | number;
    }
  | undefined;

interface AdvertWithApplications extends Advert {
  applications: Application[];
}

interface AdvertState {
  loading: boolean;
  adverts: Advert[];
  error: string | null;
  advert: Advert | null;
}
interface IncomingAdvertUser {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
  terms_accepted: boolean;
  user_type: string;
  admin: boolean;
}

interface IncomingAdvertApplicant extends IncomingAdvertUser {}

interface IncomingAdvertFlat {
  id: number;
  address: string;
  tag_line: string;
  price: number;
  description: string;
  size: number;
  measurement_unit: string;
  district: string;
  characteristics: AdvertCharacteristics[];
  features: AdvertFeatures[];
  city: string;
  photos: {url: string}[];
}

interface IncomingAdvert {
  id: number;
  monthly_rent: number;
  currency: string;
  warm_rent: boolean;
  from_date: number;
  to_date: number;
  created_at: string;
  status: 'open' | 'review' | 'viewing' | 'offered' | 'closed';
  match_score: number;
  favorite: boolean;
  applied: boolean;
  user: IncomingAdvertUser;
  lessor: boolean;
  flat: IncomingAdvertFlat;
  applicants?: IncomingAdvertApplicant[];
}

interface IncomingAdvertAndFeatures {
  adverts: IncomingAdvert[];
  all_flat_features_from_db: AdvertFeatures[];
}

interface IncomingAdvertWithApplications extends IncomingAdvert {
  applications: IncomingApplication[];
  applicants: IncomingAdvertApplicant[];
}

interface IncomingAdverts {
  adverts: IncomingAdvert[];
}

type Image = {
  uri: string;
  type: string;
  name: string;
};

interface LessorSignUpParams {
  userChoices: NewUserLessorDetails;
  flatImages: Image[];
  userImages: Image[];
}

export type {
  Advert,
  AdvertState,
  AdvertCharacteristics,
  AdvertFeatures,
  AdvertFlat,
  AdvertUser,
  AdvertApplicant,
  AdvertWithApplications,
  AdvertsAndFeatures,
  IncomingAdverts,
  IncomingAdvert,
  IncomingAdvertFlat,
  IncomingAdvertUser,
  IncomingAdvertAndFeatures,
  IncomingAdvertApplicant,
  IncomingAdvertWithApplications,
  GetAdvertsParams,
  LessorSignUpParams,
};
