interface UserCharacteristics {
  emoji: string | null;
  name: string | null;
}

interface UserProfile {
  age: number | null;
  characteristics: UserCharacteristics[] | null;
  dateOfBirth: string | null;
  description: string | null;
  firstName: string | null;
  lastName: string | null;
  genderIdentity: string | null;
}
interface User {
  user: {
    admin: boolean | null;
    credits: number | null;
    id: number | null;
    email: string | null;
    termsAccepted: boolean | null;
    userType: 'newuser' | 'tenant' | 'lessor' | 'admin' | null;
    profile: UserProfile;
    filter: UserFilter[] | null;
  };
}

interface IncomingUser {
  user: {
    admin: boolean | null;
    credits: number | null;
    id: number | null;
    email: string | null;
    terms_accepted: boolean | null;
    user_type: 'newuser' | 'tenant' | 'lessor' | 'admin' | null;
    profile: IncomingUserProfile;
    filter: UserFilter[] | null;
  };
}

interface IncomingUserProfile {
  age: number;
  characteristics: UserCharacteristics[];
  date_of_birth: string;
  description: string;
  first_name: string;
  last_name: string;
  gender_identity: string;
}

interface UserFilter {
  id: number | null;
  emoji: string | null;
  name: string | null;
}
interface UserState {
  loading: boolean;
  user: {
    id: number | null;
    email: string | null;
    admin: boolean | null;
    termsAccepted: boolean | null;
    userType: 'newuser' | 'tenant' | 'lessor' | 'admin' | null;
    profile: UserProfile;
    filter: UserFilter[] | null;
    credits: number | null;
  };
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
  UserState,
  UserProfile,
  UserCharacteristics,
  UserFilter,
  IncomingUser,
  IncomingSpecificUser,
  SpecificUser,
};
