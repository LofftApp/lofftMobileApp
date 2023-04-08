import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  loading: boolean;
  uid: string | null;
  type: string | null;
  admin: boolean;
  profile: boolean;
  userType: string | null;
  savedFlats: string[];
  profileDetails: any[];
  searchCriteria: any[];
  flats: any[];
}

const initialState: UserState = {
  loading: false,
  uid: null,
  type: null,
  admin: false,
  profile: false,
  userType: null,
  savedFlats: [],
  profileDetails: [],
  searchCriteria: [],
  flats: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserID: (state, action: PayloadAction<any>) => {
      state.uid = action.payload;
    },
    setUserProfile: (state, action) => {},
  },
  extraReducers: builder => {},
});

export const {setUserID, setUserProfile} = usersSlice.actions;
export default usersSlice.reducer;
