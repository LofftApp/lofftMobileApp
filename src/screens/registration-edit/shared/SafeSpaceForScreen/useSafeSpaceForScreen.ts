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
import {
  useEditFlatMutation,
  useGetAdvertByIdQuery,
} from 'reduxFeatures/adverts/advertApi';

import {useManualPopoverTrigger} from 'reduxFeatures/settings/useManualPopoverTrigger';
import {
  useEditUserProfileMutation,
  useGetUserQuery,
} from 'reduxFeatures/user/userApi';
import {isEqualValue} from 'helpers/isEqualValue';
import {
  EditProfileActions,
  EditProfileParams,
  UserType,
} from 'reduxFeatures/user/types';
import {Messages, PopoverKeys} from 'reduxFeatures/settings/types';
import {EditAdvertActions} from 'reduxFeatures/adverts/types';
import {ToastTypes} from 'reduxFeatures/settings/types';
import {useToast} from 'reduxFeatures/settings/useToast';
export const useSafeSpaceForScreen = (
  edit: boolean,
  advertId: number,
  newValue: boolean,
) => {
  const navigation = useNavigation<NewUserJourneyStackNavigation>();
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
  } = useNewUserDetails(edit);
  const {
    data: advert,
    isLoading: isAdvertLoading,
    isError: isAdvertError,
  } = useGetAdvertByIdQuery(advertId ?? 0, {
    skip: !edit || !advertId,
    refetchOnMountOrArgChange: true,
  });

  const {data: currentUser} = useGetUserQuery(undefined, {skip: !edit});

  const [
    editUserProfile,
    {isLoading: isEditProfileLoading, isError: isEditProfileError},
  ] = useEditUserProfileMutation();

  const [editFlat, {isLoading: isEditFlatLoading, isError: isEditFlatError}] =
    useEditFlatMutation();

  const {showPopover, triggerPopover, setShowPopover, hasShownPopover} =
    useManualPopoverTrigger({
      userId: currentUser?.id ?? 0,
      key: edit ? PopoverKeys.Edit : PopoverKeys.NewUser,
    });

  const {showToast} = useToast();

  const savedSafeSpacesIds = useMemo(() => {
    if (edit) {
      return isLessor
        ? advert?.flat.flatSafeSpaces.map(sp => sp.id)
        : currentUser?.profile.safeSpaces.map(sp => sp.id);
    }
    return newUserDetails.safeSpaces;
  }, [
    edit,
    currentUser?.profile.safeSpaces,
    newUserDetails.safeSpaces,
    advert?.flat.flatSafeSpaces,
    isLessor,
  ]);

  useEffect(() => {
    if (savedSafeSpacesIds && savedSafeSpacesIds.length) {
      setSelectedSafeSpaceIds(savedSafeSpacesIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const createError = (err: unknown) => {
    const typedError = err as {
      status?: number;
    };
    if (typedError.status === 422) {
      setError('We could not save your changes, please try again');
    } else {
      setError('An error occurred, please try again');
    }
  };
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
        try {
          const editFlatParams = {
            flatId: advert?.flat.id ?? 0,
            actionMethod: EditAdvertActions.SafeSpaces,
            safeSpaces: selectedSafeSpaceIds,
          };
          await editFlat(editFlatParams).unwrap();
          showToast({
            message: Messages.ChangesSaved,
            type: ToastTypes.Success,
          });
          navigation.goBack();
        } catch (err) {
          createError(err);
          return;
        }
      } else {
        try {
          const editProfileParams: EditProfileParams<
            UserType.LESSOR | UserType.TENANT
          > = {
            userId: currentUser?.id ?? 0,
            actionMethod: EditProfileActions.genderIdentity,
            userType: isLessor ? UserType.LESSOR : UserType.TENANT,
            genderIdentity: newUserDetails.genderIdentity,
            safeSpaces: selectedSafeSpaceIds,
          };
          await editUserProfile(editProfileParams).unwrap();
          navigation.goBack();
          navigation.goBack();
          showToast({
            message: 'Your changes have been saved',
            type: ToastTypes.Success,
          });
          setError('');
        } catch (err) {
          createError(err);
          return;
        }
      }
    } else {
      navigation.goBack();
    }

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
    isEditProfileLoading,
    isEditProfileError,
    isEditFlatLoading,
    isEditFlatError,
    isAdvertLoading,
    isAdvertError,
    advert,
  };
};
