import {Application, IncomingApplication} from '../applications/types';
interface AdvertUser {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  termsAccepted: boolean;
  userType: string;
  admin: boolean;
}

interface AdvertApplicant extends AdvertUser {}

interface AdvertCharacteristics {
  emoji: string;
  name: string;
}

interface AdvertFeatures {
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
  currency: string;
  warmRent: boolean;
  fromDate: number;
  toDate: number;
  createdAt: string;
  status: string;
  matchScore: number;
  favorite: boolean;
  applied: boolean;
  user: AdvertUser;
  lessor: boolean;
  flat: AdvertFlat;
  applicants?: AdvertApplicant[];
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
  status: string;
  match_score: number;
  favorite: boolean;
  applied: boolean;
  user: IncomingAdvertUser;
  lessor: boolean;
  flat: IncomingAdvertFlat;
  applicants?: IncomingAdvertApplicant[];
}

interface IncomingAdvertWithApplications {
  advert: IncomingAdvert;
  applications: IncomingApplication[];
}

interface IncomingAdverts {
  adverts: IncomingAdvert[];
}

interface AdvertWithApplications {
  advert: Advert;
  applications: Application[];
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
  IncomingAdverts,
  IncomingAdvert,
  IncomingAdvertFlat,
  IncomingAdvertUser,
  IncomingAdvertApplicant,
  IncomingAdvertWithApplications,
};
