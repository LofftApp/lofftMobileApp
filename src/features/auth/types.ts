type SignInArgs = {
  email: string;
  password: string;
};

type SignInResponse = {
  access_token: string;
  created_at: number;
  expires_in: number;
  refresh_token: string;
  token_type: string;
};

type SignUpArgs = SignInArgs;

type SignUpResponse = {
  user: {
    access_token: string;
    created_at: number;
    expires_in: number;
    refresh_token: string;
    token_type: string;
  };
};

export type {SignInArgs, SignInResponse, SignUpArgs, SignUpResponse};
