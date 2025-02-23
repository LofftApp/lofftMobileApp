import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PURGE} from 'redux-persist';
import {
  AppLanguages,
  SettingsState,
  ShowToastPayload,
  ToastTypes,
} from './types';

const initialState: SettingsState = {
  appLanguage: 'EN',
  popovers: {},
  toast: {
    type: ToastTypes.Success,
    message: '',
    visible: false,
    position: 'top',
  },
};

export const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setAppLanguage: (state, action: PayloadAction<AppLanguages>) => {
      state.appLanguage = action.payload;
    },

    showToast: (state, action: PayloadAction<ShowToastPayload>) => {
      state.toast = {
        type: action.payload.type,
        message: action.payload.message,
        visible: true,
        position: action.payload.position || 'top',
      };
    },

    hideToast: state => {
      const {...rest} = state.toast;
      state.toast = {
        ...rest,
        visible: false,
      };
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

export const {
  setAppLanguage,
  showPopoverForKey,
  resetPopoverForKey,
  showToast,
  hideToast,
} = settings.actions;

export default settings.reducer;
