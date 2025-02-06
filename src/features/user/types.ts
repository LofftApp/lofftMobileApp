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
  safeSpaces: number[];
  userPhotos: string[];
}
interface User {
  admin: boolean;
  credits: number;
  id: number;
  email: string;
  termsAccepted: boolean;
  userType: 'newuser' | 'tenant' | 'lessor' | 'admin';
  profile: UserProfile;
  confirmedEmail: boolean;
}

interface IncomingUser {
  admin: boolean;
  credits: number;
  id: number;
  email: string;
  terms_accepted: boolean;
  user_type: 'newuser' | 'tenant' | 'lessor' | 'admin';
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
type EditUserProfileParams<T extends 'tenant' | 'lessor'> = {
  userId: number;
  actionMethod: EditUserActionMethodsType;
  userType: T;
} & (T extends 'lessor'
  ? Partial<NewUserLessorDetails>
  : Partial<NewUserTenantDetails>);

enum EditActionMethods {
  matchTags = 'matchTags',
  personalInfo = 'personalInfo',
  genderIdentity = 'genderIdentity',
  searchPreferences = 'searchPreferences',
  languages = 'languages',
}

enum UserType {
  newuser = 'newuser',
  tenant = 'tenant',
  lessor = 'lessor',
  admin = 'admin',
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
  EditUserProfileParams,
};

export {EditActionMethods, UserType};
