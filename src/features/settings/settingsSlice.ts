import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PURGE} from 'redux-persist';
export type AppLanguages = 'EN' | 'DE';

export enum ToastTypes {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}

interface SettingsState {
  appLanguage: AppLanguages;
  popovers: {[userId: number]: {[key: string]: boolean}};
  toast: {
    type: ToastTypes;
    message: string;
    visible: boolean;
    position?: 'top' | 'bottom';
  };
}

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

    showToast: (
      state,
      action: PayloadAction<{
        type: ToastTypes;
        message: string;
        position?: 'top' | 'bottom';
      }>,
    ) => {
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

    // showSuccessToast: (state, action: PayloadAction<string>) => {
    //   state.toast = {
    //     type: ToastTypes.Success,
    //     message: action.payload,
    //   };
    // },
    // showErrorToast: (state, action: PayloadAction<string>) => {
    //   state.toast = {
    //     type: ToastTypes.Error,
    //     message: action.payload,
    //   };
    // },

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
