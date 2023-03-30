import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

// Firestore 🔥
import {firestoreApplyForFlat} from '@Api/firebase/firestoreActions';

interface ApplicationState {
  state: number;
  flatId: string | null;
  applications: [{score: number; state: number; userId: string | null}];
}

const initialState: ApplicationState = {
  state: 0,
  flatId: null,
  applications: [
    {
      score: 0,
      state: 0,
      userId: null,
    },
  ],
};

// Middlewares
export const applyForFlat = createAsyncThunk(
  'applications/applyForFlat',
  async ({flatId, matchP}: {flatId: string; matchP: number}) => {
    try {
      await firestoreApplyForFlat({flatId, matchP});
    } catch (error) {
      console.log('applyForFlat:', error);
    }
  },
);

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(applyForFlat.fulfilled, (state, action) => {});
  },
});

export const {} = applicationsSlice.actions;
export default applicationsSlice.reducer;
