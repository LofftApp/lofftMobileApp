import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

// firestore
import firestore from '@react-native-firebase/firestore';

interface UserState {
  loading: boolean;
  uid: string | null;
  type: string | null;
  admin: boolean;
  profile: boolean;
  savedFlats: any[];
  profileDetails: any[];
  searchCriteria: any[];
}

const initialState = {
  loading: false,
  uid: null,
  type: null,
  admin: false,
  profile: false,
  savedFlats: [],
  profileDetails: [],
  searchCriteria: [],
};

// Middlewares
export const fetchUserProfile = createAsyncThunk(
  'users/fetchUserProfile',
  async (uid: string) => {
    try {
      const response = await firestore().collection('users').doc(uid).get();
      return response.data();
    } catch (error) {
      console.log(error);
    }
    console.log("Getting user's profile");
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserID: (state, action: PayloadAction<any>) => {
      state.uid = action.payload.uid;
    },
    setUserProfile: (state, action) => {},
  },
  extraReducers: builder => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      if (action.payload) {
        state.profile = true;
        state.profileDetails = action.payload?.profileDetails;
        state.searchCriteria = action.payload?.searchCriteria;
        state.savedFlats = action.payload?.savedFlats;
      }
    });
  },
});

// WIP for code, below currently not used
export const fetchCurrentUser = createAsyncThunk(
  'users/fetchCurrentUser',
  async () => {
    const response = await fetch('/api/current_user');
    return await response.json();
  },
);

export const {setUserID, setUserProfile} = usersSlice.actions;
export default usersSlice.reducer;
