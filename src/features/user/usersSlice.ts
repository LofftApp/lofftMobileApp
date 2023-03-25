import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

// Firestore 🔥
import firestore from '@react-native-firebase/firestore';
import {saveFlatToUserLikes} from '@Api/firebase/firestoreActions';

interface UserState {
  loading: boolean;
  uid: string | null;
  type: string | null;
  admin: boolean;
  profile: boolean;
  savedFlats: string[];
  profileDetails: any[];
  searchCriteria: any[];
}

const initialState: UserState = {
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
      console.log('fetchUserProfile:', error);
    }
  },
);

export const saveFlatsToFavorites = createAsyncThunk(
  'users/saveFlatsToFavorites',
  async (payload: any) => {
    try {
      await saveFlatToUserLikes(payload);
    } catch (error) {
      console.log('saveFlatsToFavorites:', error);
    }
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
    builder.addCase(saveFlatsToFavorites.fulfilled, (state, action) => {
      const data: any = action.meta.arg;
      if (data.add) {
        state.savedFlats.push(data.flatId);
      } else {
        state.savedFlats = state.savedFlats.filter(
          (flatId: string) => flatId !== data.flatId,
        );
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
