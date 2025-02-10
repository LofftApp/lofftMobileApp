import {useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

//Redux
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';

// Screens 📺
import {newUserScreens} from '../../../../navigationStacks/newUserScreens';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useGetAssetsQuery} from 'reduxFeatures/assets/assetsApi';

//Validation 🛡   ️
import {safeSpacesSchema} from 'lib/zodSchema';

//Types 🏷  ️
import {NewUserJourneyStackNavigation} from '../../../../navigationStacks/types';
import {useUserType} from 'reduxFeatures/user/useUserType';
import {useGetAdvertByIdQuery} from 'reduxFeatures/adverts/advertApi';

import {useManualPopoverTrigger} from 'reduxFeatures/settings/useManualPopoverTrigger';
import {
  useEditUserProfileMutation,
  useGetUserQuery,
} from 'reduxFeatures/user/userApi';
import {isEqualValue} from 'helpers/isEqualValue';
import {
  EditActionMethods,
  EditUserProfileParams,
  UserType,
} from 'reduxFeatures/user/types';
import {PopoverKeys} from 'reduxFeatures/settings/types';
export const useSafeSpaceForScreen = (
  edit?: boolean,
  advertId?: number,
  newValue?: boolean,
) => {
  const navigation = useNavigation<NewUserJourneyStackNavigation>();
  console.log('newValue in safe space screen', newValue);
  // initial state
  const {data} = useGetAssetsQuery();
  const safeSpaces = data?.safeSpaces;

  // Local State
  const [selectedSafeSpaceIds, setSelectedSafeSpaceIds] = useState<number[]>(
    [],
  );
  const [error, setError] = useState<string | undefined>('');

  //Redux
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {isLessor} = useUserType();
  const {
    isNewUserLessor,
    newUserDetails,
    setNewUserDetails,
    resetNewUserState,
  } = useNewUserDetails(isLessor, edit);
  const {
    data: advert,
    isLoading: isAdvertLoading,
    isError: isAdvertError,
  } = useGetAdvertByIdQuery(advertId ?? 0, {
    skip: !edit || !advertId,
    refetchOnMountOrArgChange: true,
  });

  const {data: currentUser} = useGetUserQuery(undefined, {skip: !edit});

  const [editUserProfile, {isLoading: isEditLoading, isError: isEditError}] =
    useEditUserProfileMutation();

  const savedSafeSpacesIds = useMemo(() => {
    if (edit) {
      return currentUser?.profile.safeSpaces.map(sp => sp.id);
    }
    return newUserDetails.safeSpaces;
  }, [edit, currentUser?.profile.safeSpaces, newUserDetails.safeSpaces]);

  useEffect(() => {
    if (savedSafeSpacesIds && savedSafeSpacesIds.length) {
      setSelectedSafeSpaceIds(savedSafeSpacesIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {showPopover, triggerPopover, setShowPopover, hasShownPopover} =
    useManualPopoverTrigger({
      userId: currentUser?.id ?? 0,
      key: isLessor ? PopoverKeys.SafeSpace : PopoverKeys.Gender,
    });

  const selectSafeSpace = (id: number) => {
    setSelectedSafeSpaceIds(prevIds =>
      prevIds.includes(id)
        ? prevIds.filter(safeSpId => safeSpId !== id)
        : [...prevIds, id],
    );
  };

  const handleBackButton = () => {
    if (
      !hasShownPopover &&
      !isEqualValue(savedSafeSpacesIds, selectedSafeSpaceIds)
    ) {
      triggerPopover();
      return;
    }
    if (edit) {
      setSelectedSafeSpaceIds([]);
    } else {
      setCurrentScreen(currentScreen - 1);
    }
    navigation.goBack();
    setError('');
  };

  console.log('selectedSafeSpaceIds', selectedSafeSpaceIds);
  console.log('savedSafeSpacesIds', savedSafeSpacesIds);

  const handleContinue = async () => {
    const selectedSafeSpaces = safeSpaces?.filter(sp =>
      selectedSafeSpaceIds.includes(sp.id),
    );
    const result = safeSpacesSchema.safeParse(selectedSafeSpaces);
    if (!result.success) {
      setError(result.error?.flatten().formErrors.at(0));
      return;
    }

    setNewUserDetails({safeSpaces: selectedSafeSpaceIds});
    if (!edit) {
      const screen = isNewUserLessor
        ? newUserScreens.lessor[currentScreen + 1]
        : newUserScreens.tenant[currentScreen + 1];

      navigation.navigate(screen);
      setCurrentScreen(currentScreen + 1);
      setError('');
      return;
    }

    if (newValue || !isEqualValue(savedSafeSpacesIds, selectedSafeSpaceIds)) {
      if (isLessor) {
        navigation.goBack();
        return;
      }

      try {
        const editParams: EditUserProfileParams<'lessor' | 'tenant'> = {
          userId: currentUser?.id ?? 0,
          actionMethod: EditActionMethods.genderIdentity,
          userType: isLessor ? UserType.lessor : UserType.tenant,
          genderIdentity: newUserDetails.genderIdentity,
          safeSpaces: selectedSafeSpaceIds,
        };
        await editUserProfile(editParams).unwrap();
        setError('');
        navigation.goBack();
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
    }
    navigation.goBack();
    navigation.goBack();
    resetNewUserState();
    setError('');
  };

  return {
    selectSafeSpace,
    handleContinue,
    handleBackButton,
    selectedSafeSpaceIds,
    error,
    safeSpaces,
    showPopover,
    setShowPopover,
    isLessor,
    isNewUserLessor,
    isEditLoading,
    isEditError,
    isAdvertLoading,
    isAdvertError,
    advert,
  };
};
