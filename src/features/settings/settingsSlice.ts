import {createSlice, PayloadAction} from '@reduxjs/toolkit';
export type AppLanguages = 'EN' | 'DE';
interface SettingsState {
  appLanguage: AppLanguages;
}

const initialState: SettingsState = {
  appLanguage: 'EN',
};

export const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setAppLanguage: (state, action: PayloadAction<AppLanguages>) => {
      state.appLanguage = action.payload;
    },
  },
});

export const {setAppLanguage} = settings.actions;

export default settings.reducer;
