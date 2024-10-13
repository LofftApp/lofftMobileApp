// Define the screen names as a union type

import {NewUserScreens} from './types';

export const newUserScreens: NewUserScreens = {
  renter: {
    1: 'LanguageSelectionScreen',
    2: 'AboutUserScreen',
    3: 'GenderIdentityScreen',
    4: 'SelectCityScreen',
    5: 'FinderBudgetScreen',
    6: 'FlatFeaturesScreen',
    7: 'SelfDescribeScreen',
    8: 'ConditionsOfUseScreen',
  },
  lessor: {
    1: 'LanguageSelectionScreen',
    2: 'WhereIsFlatScreen',
    3: 'FlatLengthAvailableScreen',
    4: 'AboutUserScreen',
    5: 'FlatFeaturesScreen',
    6: 'FlatPhotoUploadScreen',
  },
};
