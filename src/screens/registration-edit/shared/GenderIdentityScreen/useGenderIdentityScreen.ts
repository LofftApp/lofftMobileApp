import {useEffect, useMemo, useState} from 'react';

import {useNavigation} from '@react-navigation/native';

//Redux
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {Gender} from 'reduxFeatures/assets/types';
import {useUserType} from 'reduxFeatures/user/useUserType';
import {useManualPopoverTrigger} from 'reduxFeatures/settings/useManualPopoverTrigger';
import {
  useEditUserProfileMutation,
  useGetUserQuery,
} from 'reduxFeatures/user/userApi';

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
import {PopoverKeys} from 'reduxFeatures/settings/types';
import {
  EditActionMethods,
  EditUserProfileParams,
  UserType,
} from 'reduxFeatures/user/types';

const genders: Gender[] = [
  {name: 'Male', id: 1, emoji: '👨'},
  {name: 'Female', id: 2, emoji: '👩'},
  {name: 'Non-Binary', id: 3, emoji: '💁'},
  {
    name: 'Another gender identity not listed',
    id: 4,
    emoji: '🙆',
  },

  {name: 'Prefer not to say', id: 5, emoji: '🤐'},
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

  const {data: currentUser} = useGetUserQuery(undefined, {skip: !edit});

  const [editUserProfile, {isLoading: isEditLoading, isError: isEditError}] =
    useEditUserProfileMutation();

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
  console.log('currentUser', currentUser);

  useEffect(() => {
    if (savedGender && savedGender.length > 0) {
      setSelectedGenderIds(savedGenderIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {showPopover, triggerPopover, setShowPopover, hasShownPopover} =
    useManualPopoverTrigger({
      userId: currentUser?.id ?? 0,
      key: edit ? PopoverKeys.Gender : PopoverKeys.NewUser,
    });

  const selectGender = (id: number) => {
    setSelectedGenderIds(prevIds => (prevIds.includes(id) ? [] : [id]));
  };

  const handleBackButton = () => {
    if (edit) {
      resetNewUserState();
    } else {
      setCurrentScreen(currentScreen - 1);
    }
    if (!hasShownPopover && !isEqualValue(savedGenderIds, selectedGenderIds)) {
      triggerPopover();
      return;
    }

    navigation.goBack();
    setError('');
    setShowPopover(false);
  };
  console.log('selectedGenderIds', selectedGenderIds);
  console.log('savedGenderIds', savedGenderIds);

  const handleContinue = async () => {
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
      try {
        const editParams: EditUserProfileParams<'lessor' | 'tenant'> = {
          userId: currentUser?.id ?? 0,
          actionMethod: EditActionMethods.genderIdentity,
          userType: UserType.lessor,
          genderIdentity: selectedGenderNames,
        };
        await editUserProfile(editParams).unwrap();
        setError('');
        navigation.goBack();
      } catch (err) {
        const typedError = err as {
          status?: number;
        };
        if (typedError.status === 422) {
          setError('Please fill out all the required fields');
        } else {
          setError('An error occurred, please try again');
        }
        return;
      }
    } else {
      navigation.navigate('NewUserNavigator', {
        screen: 'SafeSpaceForScreen',
        params: {
          edit: true,
          newValue: !isEqualValue(savedGenderIds, selectedGenderIds),
        },
      });
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
    isEditLoading,
    isEditError,
  };
};
