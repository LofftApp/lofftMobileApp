import {createSlice, PayloadAction} from '@reduxjs/toolkit';
export type AppLanguages = 'EN' | 'DE';
interface SettingsState {
  appLanguage: AppLanguages;
  popovers: {[key: string]: boolean};
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
    showPopoverForKey: (state, action: PayloadAction<string>) => {
      if (!state.popovers) {
        state.popovers = {};
      } // ✅ Ensure it's initialized
      state.popovers[action.payload] = true; // ✅ No more errors
    },
    resetPopoverForKey: (state, action: PayloadAction<string>) => {
      if (!state.popovers) {
        state.popovers = {};
      } // ✅ Ensure it's initialized
      state.popovers[action.payload] = false;
    },
  },
});

export const {setAppLanguage, showPopoverForKey, resetPopoverForKey} =
  settings.actions;

export default settings.reducer;
