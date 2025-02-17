import {City, District, Language, SafeSpace} from 'reduxFeatures/assets/types';
import {ImageRecord} from 'reduxFeatures/imageHandling/types';
import {
  NewUserLessorDetails,
  NewUserTenantDetails,
} from 'reduxFeatures/registration/types';

interface UserCharacteristics {
  emoji: string;
  name: string;
  id: number;
}

interface UserProfile {
  age: number;
  characteristics: UserCharacteristics[];
  filter: UserFilter[];
  dateOfBirth: string;
  description: string;
  firstName: string;
  lastName: string;
  genderIdentity: string;
  avatar: ImageRecord;
  userPhotos: ImageRecord[];
  city: City;
  districts: District[];
  profileLanguages: Language[];
  safeSpaces: SafeSpace[];
}
interface User {
  admin: boolean;
  credits: number;
  id: number;
  email: string;
  termsAccepted: boolean;
  userType: UserType;
  profile: UserProfile;
  confirmedEmail: boolean;
}

interface IncomingUser {
  admin: boolean;
  credits: number;
  id: number;
  email: string;
  terms_accepted: boolean;
  user_type: UserType;
  profile: IncomingUserProfile;
  confirmedEmail: boolean;
}

interface IncomingUserProfile {
  age: number;
  characteristics: UserCharacteristics[];
  filter: UserFilter[];
  date_of_birth: string;
  description: string;
  first_name: string;
  last_name: string;
  gender_identity: string;
  user_photos: string[];
}

interface UserFilter {
  id: number;
  emoji: string;
  name: string;
}

interface SpecificUser {
  email: string;
  id: number;
  profile: UserProfile;
}
interface IncomingSpecificUser {
  email: string;
  id: number;
  profile: IncomingUserProfile;
}

type EditUserActionMethodsType =
  | 'matchTags'
  | 'personalInfo'
  | 'genderIdentity'
  | 'searchPreferences'
  | 'languages';

type EditProfileParams<T extends UserType.TENANT | UserType.LESSOR> = {
  userId: number;
  actionMethod: EditUserActionMethodsType;
  userType: T;
} & (T extends UserType.LESSOR
  ? Partial<NewUserLessorDetails>
  : Partial<NewUserTenantDetails>);

enum EditProfileActions {
  matchTags = 'matchTags',
  personalInfo = 'personalInfo',
  genderIdentity = 'genderIdentity',
  searchPreferences = 'searchPreferences',
  languages = 'languages',
}

enum UserType {
  NEWUSER = 'newuser',
  TENANT = 'tenant',
  LESSOR = 'lessor',
  ADMIN = 'admin',
}

export type {
  User,
  UserProfile,
  UserCharacteristics,
  UserFilter,
  IncomingUser,
  IncomingSpecificUser,
  SpecificUser,
  IncomingUserProfile,
  EditUserActionMethodsType,
  EditProfileParams,
};

export {EditProfileActions, UserType};
