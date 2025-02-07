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

const genders: Gender[] = [
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
];

export const useGenderIdentityScreen = (edit?: boolean) => {
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

  // const savedGender = newUserDetails.genderIdentity;
  const {data: currentUser} = useGetUserQuery(undefined, {skip: !edit});
  const savedGender = useMemo(() => {
    if (edit) {
      return genders.filter(g =>
        currentUser?.profile.genderIdentity?.includes(g.name),
      );
    }
    return genders.filter(g => newUserDetails.genderIdentity.includes(g.name));
  }, [
    currentUser?.profile.genderIdentity,
    edit,
    newUserDetails.genderIdentity,
  ]);

  const savedGenderIds = savedGender.map(g => g.id);

  // Local State
  const [selectedGenderIds, setSelectedGenderIds] = useState<number[]>([]);
  const [error, setError] = useState<string | undefined>('');
  console.log('savedGender', savedGender);
  console.log('selectedGenderIds', selectedGenderIds);

  useEffect(() => {
    if (savedGender && savedGender.length > 0) {
      setSelectedGenderIds(savedGenderIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectGender = (id: number) => {
    setSelectedGenderIds(prevIds => (prevIds.includes(id) ? [] : [id]));
  };

  const {showPopover, triggerPopover, setShowPopover, hasShownPopover} =
    useManualPopoverTrigger('editGender');

  const handleBackButton = () => {
    if (!edit) {
      setCurrentScreen(currentScreen - 1);
    }
    if (!hasShownPopover && !isEqualValue(savedGenderIds, selectedGenderIds)) {
      triggerPopover();
      return;
    }

    navigation.goBack();
    setError('');
    resetNewUserState();
    setShowPopover(false);
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

    if (!edit) {
      const screen = isNewUserLessor
        ? newUserScreens.lessor[currentScreen + 1]
        : newUserScreens.tenant[currentScreen + 1];

      navigation.navigate(screen);
      setCurrentScreen(currentScreen + 1);
      setError('');
      return;
    }

    if (isLessor) {
      navigation.goBack();
    }

    navigation.navigate('NewUserNavigator', {
      screen: 'SafeSpaceForScreen',
      params: {
        edit: true,
        newValue: !isEqualValue(savedGenderIds, selectedGenderIds),
      },
    });

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
