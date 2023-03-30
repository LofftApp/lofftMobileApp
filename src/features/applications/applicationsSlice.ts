import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

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

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {},
});

export const {} = applicationsSlice.actions;
export default applicationsSlice.reducer;
