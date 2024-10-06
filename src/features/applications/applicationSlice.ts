import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Application, ApplicationState} from './types';

const initialState: ApplicationState = {
  applicationsRound1: [],
  applicationsSelectedRound1: [],
  applicationsNotSelectedRound1: [],
  applicationsRound2: [],
  applicationsSelectedRound2: [],
  applicationsNotSelectedRound2: [],
};

export const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setApplicationsRound1(state, action: PayloadAction<Application[]>) {
      const newApplications = action.payload.map(app => {
        const isSelected = state.applicationsSelectedRound1.find(
          selectedApp => selectedApp.id === app.id,
        );

        return {
          ...app,
          round1: isSelected ? true : app.round1, // Retain selection
        };
      });
      state.applicationsRound1 = newApplications;
      // state.applications = action.payload;
    },
    toggleRound1(state, action: PayloadAction<number>) {
      state.applicationsRound1 = state.applicationsRound1.map(app => {
        if (app.id === action.payload) {
          app.round1 = !app.round1;
        }
        return app;
      });
      // const selectedApp = state.applicationsRound1.find(app => app.id === action.payload);
      // if (selectedApp) {
      //   selectedApp.round1 = !selectedApp.round1;
      // }

      state.applicationsSelectedRound1 = state.applicationsRound1
        .filter(app => app.round1)
        .map(app => {
          return {
            id: app.id,
            round_1: app.round1,
            round_2: app.round2,
            round_3: app.round3,
          };
        });
      state.applicationsNotSelectedRound1 = state.applicationsRound1
        .filter(app => !app.round1)
        .map(app => {
          return {
            id: app.id,
            round_1: app.round1,
            round_2: app.round2,
            round_3: app.round3,
          };
        });
    },
    setApplicationsRound2(state, action: PayloadAction<Application[]>) {
      const newApplications = action.payload.map(app => {
        const isSelected = state.applicationsSelectedRound2.find(
          selectedApp => selectedApp.id === app.id,
        );

        return {
          ...app,
          round2: isSelected ? true : app.round2, // Retain selection
        };
      });
      state.applicationsRound2 = newApplications;
      // state.applications = action.payload;
    },
    toggleRound2(state, action: PayloadAction<number>) {
      state.applicationsRound2 = state.applicationsRound2.map(app => {
        if (app.id === action.payload) {
          app.round2 = !app.round2;
        }
        return app;
      });

      state.applicationsSelectedRound2 = state.applicationsRound2
        .filter(app => app.round2)
        .map(app => {
          return {
            id: app.id,
            round_1: app.round1,
            round_2: app.round2,
            round_3: app.round3,
          };
        });
      state.applicationsNotSelectedRound2 = state.applicationsRound2
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

export const {
  setApplicationsRound2,
  toggleRound2,
  setApplicationsRound1,
  toggleRound1,
} = applicationSlice.actions;
export default applicationSlice.reducer;
