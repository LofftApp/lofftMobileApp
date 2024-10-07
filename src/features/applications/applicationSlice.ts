import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Application, ApplicationState} from './types';
import {MAX_SELECT} from 'screens/dashboard/landlord/SubScreens/SeeApplicantsScreen';

const initialState: ApplicationState = {
  applicationsRound1: [],
  applicationsSelectedRound1: [],
  applicationsNotSelectedRound1: [],
  selectedAllRound1: false,
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
          round1: isSelected ? true : app.round1,
        };
      });

      state.applicationsRound1 = newApplications;

      state.applicationsSelectedRound1 = newApplications
        .filter(app => app.round1)
        .map(app => ({
          id: app.id,
          round_1: app.round1,
          round_2: app.round2,
          round_3: app.round3,
        }));

      state.applicationsNotSelectedRound1 = newApplications
        .filter(app => !app.round1)
        .map(app => ({
          id: app.id,
          round_1: app.round1,
          round_2: app.round2,
          round_3: app.round3,
        }));
      state.selectedAllRound1 =
        state.applicationsSelectedRound1.length === newApplications.length;
    },
    toggleRound1(state, action: PayloadAction<number>) {
      state.applicationsRound1 = state.applicationsRound1.map(app => {
        if (app.id === action.payload) {
          app.round1 = !app.round1;
        }
        return app;
      });

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
      state.selectedAllRound1 =
        state.applicationsSelectedRound1.length ===
        state.applicationsRound1.length;
    },
    toggleSelectAllRound1(state) {
      const isSelectingAll = !state.selectedAllRound1;
      const totalApplications = state.applicationsRound1.length;
      const availableToSelect = Math.min(MAX_SELECT, totalApplications);

      if (isSelectingAll) {
        // Select only up to MAX_SELECT applicants
        state.applicationsRound1 = state.applicationsRound1.map(
          (app, index) => ({
            ...app,
            round1: index < availableToSelect,
          }),
        );

        state.applicationsSelectedRound1 = state.applicationsRound1
          .filter(app => app.round1)
          .map(app => ({
            id: app.id,
            round_1: app.round1,
            round_2: app.round2,
            round_3: app.round3,
          }));

        state.applicationsNotSelectedRound1 = state.applicationsRound1
          .filter(app => !app.round1)
          .map(app => ({
            id: app.id,
            round_1: app.round1,
            round_2: app.round2,
            round_3: app.round3,
          }));
      } else {
        // Deselect all
        state.applicationsRound1 = state.applicationsRound1.map(app => ({
          ...app,
          round1: false,
        }));

        state.applicationsSelectedRound1 = [];
        state.applicationsNotSelectedRound1 = state.applicationsRound1.map(
          app => ({
            id: app.id,
            round_1: app.round1,
            round_2: app.round2,
            round_3: app.round3,
          }),
        );
      }

      // Update "Select All" based on current state
      state.selectedAllRound1 =
        state.applicationsSelectedRound1.length === availableToSelect;
    },

    setApplicationsRound2(state, action: PayloadAction<Application[]>) {
      const newApplications = action.payload.map(app => {
        const isSelected = state.applicationsSelectedRound2.find(
          selectedApp => selectedApp.id === app.id,
        );

        return {
          ...app,
          round2: isSelected ? true : app.round2,
        };
      });
      state.applicationsRound2 = newApplications;
      state.applicationsSelectedRound2 = newApplications
        .filter(app => app.round2)
        .map(app => ({
          id: app.id,
          round_1: app.round1,
          round_2: app.round2,
          round_3: app.round3,
        }));

      state.applicationsNotSelectedRound2 = newApplications
        .filter(app => !app.round2)
        .map(app => ({
          id: app.id,
          round_1: app.round1,
          round_2: app.round2,
          round_3: app.round3,
        }));
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
  toggleSelectAllRound1,
} = applicationSlice.actions;
export default applicationSlice.reducer;
