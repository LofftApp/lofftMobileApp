interface AdvertUser {
  admin: boolean | null;
  created_at: string | null;
  email: string | null;
  id: number | null;
  terms_accepted: boolean | null;
  updated_at: string | null;
  user_type: string | null;
}

interface AdvertApplicant extends AdvertUser {}

interface AdvertCharacteristics {
  emoji: string | null;
  name: string | null;
}

interface AdvertFeatures {
  emoji: string | null;
  name: string | null;
}

interface AdvertFlat {
  id: number | null;
  address: string | null;
  price: number | null;
  description: string | null;
  tagline: string | null;
  district: string | null;
  city: string | null;
  photos: string[] | null;
  characteristics: AdvertCharacteristics[] | null;
  features: AdvertFeatures[] | null;
}

interface Advert {
  id: number | null;
  status: string | null;
  currency: string | null;
  matchScore: number | null;
  price: number | null;
  favorite: boolean;
  applied: boolean;
  fromDate: number | null;
  toDate: number | null;
  created_at: string | null;
  applicants: AdvertApplicant[] | null;
  user: AdvertUser | null;
  lessor: boolean;
  flat: AdvertFlat;
}

interface AdvertFeaturesParams {
  emoji: string | null;
  value: string | null;
}

interface FilterParams {
  advertChars: AdvertFeaturesParams[][]; // or adjust the type inside the inner array as needed
  maxPrice: number;
  minPrice: number;
}


interface AdvertState {
  loading: boolean;
  filterActivated: boolean;
  filterParams: any;
  adverts: Advert[];
}

export type {
  Advert,
  AdvertState,
  AdvertCharacteristics,
  FilterParams,
  AdvertFeatures,
  AdvertFlat,
  AdvertUser,
  AdvertApplicant,
};
