import {
  UserCharacteristics,
  UserFilter,
  UserProfile,
} from 'reduxFeatures/user/types';
import {Application} from '../applications/types';
import {
  City,
  Currency,
  District,
  Language,
  SafeSpace,
} from 'reduxFeatures/assets/types';
import {NewUserLessorDetails} from 'reduxFeatures/registration/types';
import {
  ImageRecord,
  ImagesToBackend,
  NewImage,
} from 'reduxFeatures/imageHandling/types';
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
  district: District;
  characteristics: AdvertCharacteristics[];
  features: AdvertFeatures[];
  city: City;
  flatSafeSpaces: SafeSpace[];
  flatLanguages: Language[];
  mainPic: ImageRecord;
  photos: ImageRecord[];
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

interface Adverts {
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

interface LessorSignUpParams {
  userChoices: NewUserLessorDetails;
  flatImages: NewImage[];
  userImages: NewImage[];
}

interface Favorite extends Advert {}

interface Favorites {
  favorites: Favorite[];
}

enum EditAdvertActions {
  MatchTags = 'matchTags',
  Location = 'location',
  FlatDetails = 'flatDetails',
  Availability = 'availability',
  SafeSpaces = 'safeSpaces',
  Languages = 'languages',
  Images = 'images',
}
type EditAdvertParams = {
  advertId: number;
  actionMethod: EditAdvertActions;
} & Partial<NewUserLessorDetails>;

type EditFlatParams = {
  flatId: number;
  actionMethod: EditAdvertActions;
} & Partial<NewUserLessorDetails & ImagesToBackend>;

export type {
  Advert,
  AdvertCharacteristics,
  AdvertFeatures,
  AdvertFlat,
  AdvertUser,
  AdvertApplicant,
  AdvertWithApplications,
  Adverts,
  GetAdvertsParams,
  LessorSignUpParams,
  Favorite,
  Favorites,
  EditAdvertParams,
  EditFlatParams,
};

export {EditAdvertActions};
