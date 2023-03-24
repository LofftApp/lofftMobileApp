import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {RootState} from '../../app/store';
import {saveFlatToUserLikes} from '@Api/firebase/firestoreActions';

// firestore
import firestore from '@react-native-firebase/firestore';

// Added for typescript defining the type
interface UserState {
  loading: boolean;
  uid: string | null;
  type: string | null;
  admin: boolean;
  savedFlats: any[];
  profileDetails: any[];
  searchCriteria: any[];
}

const initialState: UserState = {
  loading: false,
  uid: null,
  type: null,
  admin: false,
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

export const updateSavedFlats = createAsyncThunk(
  'users/updateSavedFlats',
  async (payload: any) => {
    console.log('payload', payload);
    // saveFlatToUserLikes(payload);
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserID: (state, action) => {
      state.uid = action.payload;
    },
    setUserProfile: (state, action) => {},
  },
  extraReducers: builder => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.profileDetails = action.payload?.profileDetails;
      state.searchCriteria = action.payload?.searchCriteria;
      state.savedFlats = action.payload?.savedFlats;
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
export const selectUser = (state: RootState) => state.user;
export default usersSlice.reducer;
