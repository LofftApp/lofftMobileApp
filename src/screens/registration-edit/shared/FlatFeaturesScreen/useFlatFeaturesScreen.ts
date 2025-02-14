import {useEffect, useMemo, useState} from 'react';

//Redux 📦
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useGetAssetsQuery} from 'reduxFeatures/assets/assetsApi';
import {
  useEditFlatMutation,
  useGetAdvertByIdQuery,
} from 'reduxFeatures/adverts/advertApi';
import {
  useEditUserProfileMutation,
  useGetUserQuery,
} from 'reduxFeatures/user/userApi';
import {useManualPopoverTrigger} from 'reduxFeatures/settings/useManualPopoverTrigger';

// Screens 📺
import {newUserScreens} from 'navigationStacks/newUserScreens';

// Helper 🤝
import {useNavigation} from '@react-navigation/native';
import {isEqualValue} from 'helpers/isEqualValue';

// Validation 🛡  ️
import {featuresSchema} from 'lib/zodSchema';

// Types 🧩
import {useUserType} from 'reduxFeatures/user/useUserType';
import {
  NewUserJourneyStackNavigation,
  SettingsScreenNavigationProp,
} from 'navigationStacks/types';

import {
  NewUserLessorDetails,
  NewUserTenantDetails,
} from 'reduxFeatures/registration/types';
import {EditProfileActions, EditProfileParams} from 'reduxFeatures/user/types';
import {PopoverKeys} from 'reduxFeatures/settings/types';
import {EditAdvertActions, EditFlatParams} from 'reduxFeatures/adverts/types';

export const useFlatFeaturesScreen = (
  edit?: boolean,
  advertId?: number,
  newValue?: boolean,
) => {
  const navigation = useNavigation<
    NewUserJourneyStackNavigation & SettingsScreenNavigationProp
  >();

  console.log('NewValue', newValue);

  //initial State
  const {data} = useGetAssetsQuery();
  const features = data?.features;

  //Local State
  const [selectedFeaturesIds, setSelectedFeaturesIds] = useState<number[]>([]);
  const [error, setError] = useState<string | undefined>('');

  //Redux
  const {isLessor} = useUserType();
  const {
    isNewUserLessor,
    newUserDetails,
    setNewUserDetails,
    resetNewUserState,
  } = useNewUserDetails(isLessor, edit);
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
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

  const newUserLessorDetails = newUserDetails as NewUserLessorDetails;
  const newUserTenantDetails = newUserDetails as NewUserTenantDetails;

  const savedFeaturesIds = useMemo(() => {
    if (edit) {
      return isLessor
        ? advert?.flat.features.map(feat => feat.id)
        : currentUser?.profile.filter.map(feat => feat.id);
    } else {
      if (newUserDetails.userType === 'lessor') {
        return newUserLessorDetails.flatFeatures;
      } else {
        return newUserTenantDetails.filter;
      }
    }
  }, [
    edit,
    advert?.flat.features,
    currentUser?.profile.filter,
    newUserLessorDetails.flatFeatures,
    newUserTenantDetails.filter,
    newUserDetails,
    isLessor,
  ]);

  console.log('savedFeaturesIds in flat features', savedFeaturesIds);
  console.log('selectedFeaturesIds in flat features', selectedFeaturesIds);

  console.log('newUserDetails in flat features', newUserDetails);

  useEffect(() => {
    if (savedFeaturesIds && savedFeaturesIds.length > 0) {
      setSelectedFeaturesIds(savedFeaturesIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {showPopover, triggerPopover, setShowPopover, hasShownPopover} =
    useManualPopoverTrigger({
      userId: currentUser?.id ?? 0,
      key: edit ? PopoverKeys.Edit : PopoverKeys.NewUser,
    });

  const handleSelectFeatures = (id: number) => {
    setSelectedFeaturesIds(prevIds =>
      prevIds.includes(id)
        ? prevIds.filter(featId => featId !== id)
        : [...prevIds, id],
    );
  };

  const handleBackButton = () => {
    if (
      !hasShownPopover &&
      !isEqualValue(savedFeaturesIds, selectedFeaturesIds)
    ) {
      triggerPopover();
      return;
    }
    if (edit) {
      setCurrentScreen(currentScreen - 1);
    } else {
      setSelectedFeaturesIds([]);
    }

    navigation.goBack();
    setError('');
    setShowPopover(false);
  };
  console.log(
    'characteristics in flat features',
    newUserDetails.characteristics,
  );

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
    const selectedFeatures = features?.filter(feat =>
      selectedFeaturesIds.includes(feat.id),
    );
    const result = featuresSchema.safeParse(selectedFeatures);
    if (!result.success) {
      setError(result.error?.flatten().formErrors[0]);
      return;
    }

    if (newUserDetails.userType === 'lessor') {
      setNewUserDetails({flatFeatures: selectedFeaturesIds});
    } else {
      setNewUserDetails({filter: selectedFeaturesIds});
    }

    if (!edit) {
      const screen = isNewUserLessor
        ? newUserScreens.lessor[currentScreen + 1]
        : newUserScreens.tenant[currentScreen + 1];

      navigation.navigate(screen);
      setCurrentScreen(currentScreen + 1);
      setError('');
      return;
    }

    if (
      edit &&
      (newValue || !isEqualValue(savedFeaturesIds, selectedFeaturesIds))
    ) {
      if (isLessor) {
        try {
          console.log('selewcted features', selectedFeaturesIds);
          const editFlatParams: EditFlatParams = {
            flatId: advert?.flat.id ?? 0,
            actionMethod: EditAdvertActions.MatchTags,
            characteristics: newUserDetails.characteristics,
            flatFeatures: selectedFeaturesIds,
          };
          console.log('data!!!!!!!! PARAMS', editFlatParams);
          await editFlat(editFlatParams).unwrap();
        } catch (err) {
          createError(err);
          return;
        }
      } else {
        try {
          const editProfileParams: EditProfileParams<'lessor' | 'tenant'> = {
            userId: currentUser?.id ?? 0,
            actionMethod: EditProfileActions.matchTags,
            userType: isLessor ? 'lessor' : 'tenant',
            characteristics: newUserDetails.characteristics,
            filter:
              newUserDetails.userType === 'tenant'
                ? selectedFeaturesIds
                : undefined,
            flatFeatures:
              newUserDetails.userType === 'lessor'
                ? selectedFeaturesIds
                : undefined,
          };
          console.log('data!!!!!!!!', editProfileParams);
          await editUserProfile(editProfileParams).unwrap();

          setError('');

          navigation.goBack();
          navigation.goBack();
        } catch (err) {
          createError(err);
          return;
        }
      }
    }

    console.log('NO CHANGES MADE');
    navigation.goBack();
    navigation.goBack();
    resetNewUserState();
    setError('');
    setShowPopover(false);
  };

  return {
    handleSelectFeatures,
    handleBackButton,
    handleContinue,
    selectedFeaturesIds,
    error,
    isEditProfileLoading,
    isEditProfileError,
    isEditFlatLoading,
    isEditFlatError,
    isAdvertLoading,
    isAdvertError,
    features,
    isLessor,
    isNewUserLessor,
    showPopover,
    setShowPopover,
  };
};
