import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Application, ApplicationState} from './types';

const initialState: ApplicationState = {
  applications: [],
  applicationsSelected: [],
  applicationsNotSelected: [],
};

export const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setApplicationsRound2(state, action: PayloadAction<Application[]>) {
      state.applications = action.payload;
    },
    toggleRound2(state, action: PayloadAction<number>) {
      state.applications = state.applications.map(app => {
        if (app.id === action.payload) {
          app.round2 = !app.round2;
        }
        return app;
      });

      state.applicationsSelected = state.applications
        .filter(app => app.round2)
        .map(app => {
          return {
            id: app.id,
            round_1: app.round1,
            round_2: app.round2,
            round_3: app.round3,
          };
        });
      state.applicationsNotSelected = state.applications
        .filter(app => !app.round2)
        .map(app => {
          return {
            id: app.id,
            round_1: app.round1,
            round_2: app.round2,
            round_3: app.round3,
          };
        });
    },
  },
});

export const {setApplicationsRound2, toggleRound2} = applicationSlice.actions;
export default applicationSlice.reducer;
