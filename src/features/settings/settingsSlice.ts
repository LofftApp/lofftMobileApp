import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PURGE} from 'redux-persist';
export type AppLanguages = 'EN' | 'DE';
interface SettingsState {
  appLanguage: AppLanguages;
  popovers: {[userId: number]: {[key: string]: boolean}};
}

const initialState: SettingsState = {
  appLanguage: 'EN',
  popovers: {},
};

export const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setAppLanguage: (state, action: PayloadAction<AppLanguages>) => {
      state.appLanguage = action.payload;
    },
    showPopoverForKey: (
      state,
      action: PayloadAction<{userId: number; key: string}>,
    ) => {
      const {userId, key} = action.payload;
      if (!state.popovers) {
        state.popovers = {};
      }
      if (!state.popovers[userId]) {
        state.popovers[userId] = {};
      }
      state.popovers[userId][key] = true;
    },
    resetPopoverForKey: (
      state,
      action: PayloadAction<{userId: number; key: string}>,
    ) => {
      const {userId, key} = action.payload;
      if (!state.popovers) {
        state.popovers = {};
      }
      if (!state.popovers[userId]) {
        state.popovers[userId] = {};
      }
      state.popovers[userId][key] = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const {setAppLanguage, showPopoverForKey, resetPopoverForKey} =
  settings.actions;

export default settings.reducer;
