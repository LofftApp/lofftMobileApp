import {useEffect, useMemo, useState} from 'react';

//Redux 📦
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useGetAssetsQuery} from 'reduxFeatures/assets/assetsApi';
import {useGetAdvertByIdQuery} from 'reduxFeatures/adverts/advertApi';
import {
  useEditUserProfileMutation,
  useGetUserQuery,
} from 'reduxFeatures/user/userApi';

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
import {EditUserProfileParams} from 'reduxFeatures/user/types';

export const useFlatFeaturesScreen = (
  edit?: boolean,
  advertId?: number,
  newValue?: boolean,
) => {
  const navigation = useNavigation<
    NewUserJourneyStackNavigation & SettingsScreenNavigationProp
  >();

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

  const [editUserProfile, {isLoading: isEditLoading}] =
    useEditUserProfileMutation();

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

  const handleSelectFeatures = (id: number) => {
    setSelectedFeaturesIds(prevIds =>
      prevIds.includes(id)
        ? prevIds.filter(featId => featId !== id)
        : [...prevIds, id],
    );
  };

  const handleBackButton = () => {
    if (!edit) {
      const previousScreen = currentScreen - 1;
      setCurrentScreen(previousScreen);
    }
    navigation.goBack();
    setError('');
    setSelectedFeaturesIds([]);
  };
  console.log(
    'characteristics in flat features',
    newUserDetails.characteristics,
  );

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

    if (edit) {
      if (newValue || !isEqualValue(savedFeaturesIds, selectedFeaturesIds)) {
        try {
          console.log('selewcted features', selectedFeaturesIds);
          const editParams: EditUserProfileParams<'lessor' | 'tenant'> = {
            userId: currentUser?.id ?? 0,
            actionMethod: 'matchTags',
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
          console.log('data!!!!!!!!', editParams);
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
      } else {
        console.log('NO CHANGES MADE');
        navigation.goBack();
        navigation.goBack();
      }
      resetNewUserState();
    } else {
      const screen = isNewUserLessor
        ? newUserScreens.lessor[currentScreen + 1]
        : newUserScreens.tenant[currentScreen + 1];
      navigation.navigate(screen);
      setCurrentScreen(currentScreen + 1);
    }

    setError('');
  };

  return {
    handleSelectFeatures,
    handleBackButton,
    handleContinue,
    selectedFeaturesIds,
    error,
    isEditLoading,
    isAdvertLoading,
    isAdvertError,
    features,
    isLessor,
    isNewUserLessor,
  };
};
