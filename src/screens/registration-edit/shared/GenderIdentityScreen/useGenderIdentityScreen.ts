import {useEffect, useMemo, useState} from 'react';

import {useNavigation} from '@react-navigation/native';

//Redux
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {Gender} from 'reduxFeatures/assets/types';
import {useUserType} from 'reduxFeatures/user/useUserType';
import {useManualPopoverTrigger} from 'reduxFeatures/settings/useManualPopoverTrigger';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

// Screens 📺
import {newUserScreens} from '../../../../navigationStacks/newUserScreens';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';

//Validation 🛡  ️
import {genderIdentitiesSchema} from 'lib/zodSchema';

// Helper   🤝
import {isEqualValue} from 'helpers/isEqualValue';

//Types 🏷  ️
import {
  NewUserJourneyStackNavigation,
  SettingsScreenNavigationProp,
} from '../../../../navigationStacks/types';

export const useGenderIdentityScreen = (edit?: boolean) => {
  const genders: Gender[] = useMemo(
    () => [
      {name: 'Male', id: 1, toggle: false, emoji: '👨'},
      {name: 'Female', id: 2, toggle: false, emoji: '👩'},
      {name: 'Non-Binary', id: 3, toggle: false, emoji: '💁'},
      {
        name: 'Another gender identity not listed',
        id: 4,
        toggle: false,
        emoji: '🙆',
      },

      {name: 'Prefer not to say', id: 5, toggle: false, emoji: '🤐'},
    ],
    [],
  );

  // Navigation
  const navigation = useNavigation<
    NewUserJourneyStackNavigation & SettingsScreenNavigationProp
  >();

  //Redux
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {isLessor} = useUserType();
  const {
    isNewUserLessor,
    newUserDetails,
    setNewUserDetails,
    resetNewUserState,
  } = useNewUserDetails(isLessor, edit);

  // const savedGenders = newUserDetails.genderIdentity;
  const {data: currentUser} = useGetUserQuery(undefined, {skip: !edit});
  const savedGenders = useMemo(() => {
    if (edit) {
      return currentUser?.profile.genderIdentity;
    }
    return newUserDetails.genderIdentity;
  }, [
    currentUser?.profile.genderIdentity,
    edit,
    newUserDetails.genderIdentity,
  ]);

  // Local State
  const [selectedGenderIds, setSelectedGenderIds] = useState<number[]>([]);
  const [error, setError] = useState<string | undefined>('');
  useEffect(() => {
    if (savedGenders && savedGenders.length > 0) {
      const savedGenderIds = genders
        .filter(g => savedGenders.includes(g.name))
        .map(g => g.id);

      setSelectedGenderIds(savedGenderIds);
    }
  }, [savedGenders, genders]);

  const selectGender = (id: number) => {
    setSelectedGenderIds(prevIds => (prevIds.includes(id) ? [] : [id]));
  };

  const {showPopover, triggerPopover, setShowPopover, hasShownPopover} =
    useManualPopoverTrigger('editGender');

  const handleBackButton = () => {
    if (!edit) {
      setCurrentScreen(currentScreen - 1);
    }
    if (!hasShownPopover && !isEqualValue(savedGenders, selectedGenderIds)) {
      triggerPopover();
      return;
    }

    navigation.goBack();
    setError('');
    resetNewUserState();
  };

  const handleContinue = () => {
    const selectedGenders = genders?.filter(g =>
      selectedGenderIds.includes(g.id),
    );
    const result = genderIdentitiesSchema.safeParse(selectedGenders);
    if (!result.success) {
      setError(result.error?.flatten().formErrors.at(0));
      return;
    }
    const selectedGenderNames = selectedGenders.map(g => g.name);
    setNewUserDetails({genderIdentity: selectedGenderNames});

    if (edit) {
      if (isLessor) {
        navigation.goBack();
      } else {
        navigation.navigate('NewUserNavigator', {
          screen: 'SafeSpaceForScreen',
          params: {
            edit: true,
            newValue: !isEqualValue(savedGenders, selectedGenderIds),
          },
        });
      }
    } else {
      const screen = isNewUserLessor
        ? newUserScreens.lessor[currentScreen + 1]
        : newUserScreens.tenant[currentScreen + 1];
      navigation.navigate(screen);

      setCurrentScreen(currentScreen + 1);
    }
    setError('');
    setShowPopover(false);
  };
  return {
    selectGender,
    handleBackButton,
    handleContinue,
    selectedGenderIds,
    error,
    genders,
    isLessor,
    showPopover,
    setShowPopover,
  };
};
