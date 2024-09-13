interface AdvertUser {
  email: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  id: number | null;
  termsAccepted: boolean | null;
  userType: string | null;
  admin: boolean;
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
  address: string;
  tagLine: string;
  price: number;
  description: string;
  size: number;
  measurementUnit: string;
  district: string;
  characteristics: AdvertCharacteristics[];
  features: AdvertFeatures[];
  city: string;
  photos: string[];
}

interface IncomingAdvertFlat {
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
  user: AdvertUser | null;
  lessor: boolean;
  flat: AdvertFlat;
  applicants: AdvertApplicant[];
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
  user: IncomingAdvertUser | null;
  lessor: boolean;
  flat: IncomingAdvertFlat;
  applicants: IncomingAdvertApplicant[];
}

interface AdvertState {
  loading: boolean;
  adverts: Advert[];
  error: string | null;
  advert: Advert | null;
}

export type {
  Advert,
  AdvertState,
  AdvertCharacteristics,
  AdvertFeatures,
  AdvertFlat,
  AdvertUser,
  AdvertApplicant,
  IncomingAdvert,
  IncomingAdvertFlat,
  IncomingAdvertUser,
  IncomingAdvertApplicant,
  
};
