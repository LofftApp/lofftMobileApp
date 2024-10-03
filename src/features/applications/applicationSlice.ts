import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Application } from './types';

interface ApplicationState {
  applications: Application[];
  selectedApplications: Partial<Application>[];
  notSelectedApplications: Partial<Application>[];
}

const initialState: ApplicationState = {
  applications: [],
  selectedApplications: [],
  notSelectedApplications: [],
};

export const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setApplications(state, action: PayloadAction<Application[]>) {
      state.applications = action.payload;
    },
    toggleRound2(state, action: PayloadAction<number>) {
      state.applications = state.applications.map(app => {
        if (app.id === action.payload) {
          app.round2 = !app.round2;
        }
        return app;
      });

      state.selectedApplications = state.applications.filter(app => app.round2);
      state.notSelectedApplications = state.applications.filter(
        app => !app.round2,
      );
    },
  },
});

export const {setApplications, toggleRound2} = applicationSlice.actions;
export default applicationSlice.reducer;
