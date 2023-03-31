import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

// Firestore 🔥
import firestore from '@react-native-firebase/firestore';
import {saveFlatToUserLikes} from '@Api/firebase/firestoreActions';
import auth from '@react-native-firebase/auth';

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

// Middlewares
export const checkAdmin = createAsyncThunk('users/checkAdmin', async () => {
  try {
    const userToken: any = await auth().currentUser?.getIdTokenResult();
    return userToken?.claims?.role === 'admin';
  } catch (error) {
    console.log('checkAdmin:', error);
  }
});

export const fetchUserProfile = createAsyncThunk(
  'users/fetchUserProfile',
  async (uid: string) => {
    try {
      const response = uid
        ? await firestore().collection('users').doc(uid).get()
        : null;
      return response?.data() || null;
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
      state.uid = action.payload;
    },
    setUserProfile: (state, action) => {},
  },
  extraReducers: builder => {
    builder.addCase(checkAdmin.fulfilled, (state, action) => {
      state.admin = action.payload || false;
    }),
      builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile =
          action.payload?.profileDetails || action.payload?.flats
            ? true
            : false;
        state.profileDetails = action.payload?.profileDetails || null;
        state.searchCriteria = action.payload?.searchCriteria || null;
        state.savedFlats = action.payload?.savedFlats;
        state.flats = action.payload?.flats || null;
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
