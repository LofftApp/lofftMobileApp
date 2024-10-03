interface UserCharacteristics {
  emoji: string | null;
  name: string | null;
}
interface UserProfile {
  genderIdentity: string | null;
  description: string | null;
  characteristics: UserCharacteristics[] | null;
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

interface IncomingSpecificUser {
  profile_characteristics: UserCharacteristics[];
  profile_details: {
    id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    description: string;
    gender_identity: string;
  };
}

interface SpecificUser {
  profileCharacteristics: UserCharacteristics[];
  profileDetails: {
    id: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    description: string;
    genderIdentity: string;
  };
}

export type {
  UserState,
  UserProfile,
  UserCharacteristics,
  UserFilter,
  IncomingSpecificUser,
  SpecificUser,
};
