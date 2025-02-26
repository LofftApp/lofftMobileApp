enum ToastTypes {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}

enum Messages {
  ChangesSaved = 'Your changes have been saved',
  ChangesNotSaved = 'We could not save your changes, please try again',
  ErrorOccurred = 'An error occurred, please try again',
  RequiredFields = 'Please fill out all the required fields',
  CouldNotLoad = 'We could not load the data, please try again',
  SignedOut = "You're signed out",
  SessionExpired = 'Session expired. Please log in again.',
  AmazingTeam = "Our amazing team is working on this feature. It's coming soon!",
}

type AppLanguages = 'EN' | 'DE';

interface SettingsState {
  appLanguage: AppLanguages;
  popovers: {[userId: number]: {[key: string]: boolean}};
  toast: {
    type: ToastTypes;
    message: Messages | '';
    visible: boolean;
    position: 'top' | 'bottom';
  };
}

type ShowToastPayload = {
  type: ToastTypes;
  message: Messages | '';
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
export {PopoverKeys, ToastTypes, Messages};
