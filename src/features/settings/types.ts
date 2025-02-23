enum ToastTypes {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}
type AppLanguages = 'EN' | 'DE';

interface SettingsState {
  appLanguage: AppLanguages;
  popovers: {[userId: number]: {[key: string]: boolean}};
  toast: {
    type: ToastTypes;
    message: string;
    visible: boolean;
    position: 'top' | 'bottom';
  };
}

type ShowToastPayload = {
  type: ToastTypes;
  message: string;
  position?: 'top' | 'bottom';
};

enum PopoverKeys {
  FirstApply = 'firstApply',
  NewUser = 'newUser',
  Edit = 'edit',
  FlatImage = 'flatImage',
  EditFlatImage = 'editFlatImage',
  ProfileImage = 'profileImage',
  EditProfileImage = 'editProfileImage',
}
export type {SettingsState, AppLanguages, ShowToastPayload};
export {PopoverKeys, ToastTypes};
