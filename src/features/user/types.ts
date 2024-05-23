interface UserState {
  loading: boolean;
  user: {
    id: number | null;
    email: string | null;
    admin: boolean | null;
    termsAccepted: boolean | null;
    userType: string | null;
    profile: {
      genderIdentity: string | null;
      tokens: number | null;
      description: string | null;
      characteristics:
        | [
            {
              emoji: string | null;
              name: string | null;
            },
          ]
        | null;
    };
    filter:
      | [{id: number | null; emoji: string | null; name: string | null}]
      | null;
  };
}

export type {UserState};
