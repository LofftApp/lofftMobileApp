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
    userType: string | null;
    profile: UserProfile;
    filter: UserFilter[] | null;
    credits: number | null;
  };
}

export type {UserState, UserProfile, UserCharacteristics, UserFilter};
