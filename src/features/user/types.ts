interface UserCharacteristics {
  emoji: string | null;
  name: string | null;
}
interface UserProfile {
  age: number;
  characteristics: UserCharacteristics[];
  dateOfBirth: string;
  description: string;
  firstName: string;
  lastName: string;
  genderIdentity: string;
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
  UserState,
  UserProfile,
  UserCharacteristics,
  UserFilter,
  IncomingSpecificUser,
  SpecificUser,
};
