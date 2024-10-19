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
}

interface UserFilter {
  id: number;
  emoji: string;
  name: string;
}

interface SpecificUser {
  email: string;
  filter: UserFilter[];
  id: number;
  profile: UserProfile;
}
interface IncomingSpecificUser {
  email: string;
  filter: UserFilter[];
  id: number;
  profile: IncomingUserProfile;
}
export type {
  User,
  UserProfile,
  UserCharacteristics,
  UserFilter,
  IncomingUser,
  IncomingSpecificUser,
  SpecificUser,
};
