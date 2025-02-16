import {useState, useEffect, useRef, useMemo} from 'react';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//Redux
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useGetAssetsQuery} from 'reduxFeatures/assets/assetsApi';
import {
  useEditFlatMutation,
  useGetAdvertByIdQuery,
} from 'reduxFeatures/adverts/advertApi';
import {useUserType} from 'reduxFeatures/user/useUserType';
import {
  useEditUserProfileMutation,
  useGetUserQuery,
} from 'reduxFeatures/user/userApi';
import {useManualPopoverTrigger} from 'reduxFeatures/settings/useManualPopoverTrigger';

//Hooks 🪝
import {useFadeInAnimation} from 'hooks/useFadeInAnimation';

//Screens  📺
import {newUserScreens} from '../../../../navigationStacks/newUserScreens';

//Validation 🛡️
import {languagesSchema} from 'lib/zodSchema';

//Helpers 🤝
import {isEqualValue} from 'helpers/isEqualValue';

//Types 🏷️
import {
  EditProfileActions,
  EditProfileParams,
  UserType,
} from 'reduxFeatures/user/types';
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';
import {PopoverKeys} from 'reduxFeatures/settings/types';
import {EditAdvertActions, EditFlatParams} from 'reduxFeatures/adverts/types';

export const useLanguageSelectionScreen = (
  edit?: boolean,
  advertId?: number,
) => {
  // Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  // Local State
  const [searchValue, setSearchValue] = useState('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [languagesIds, setLanguagesIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>('');

  // initial state
  const {data} = useGetAssetsQuery();
  const languagesData = data?.languages;

  const sortedLanguages = useMemo(() => {
    const prioritizedLanguages = [40, 51, 148, 128, 85, 156, 47, 70, 126];

    return languagesData?.slice().sort((a, b) => {
      const indexA = prioritizedLanguages.indexOf(a.id);
      const indexB = prioritizedLanguages.indexOf(b.id);

      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }

      if (indexA !== -1) {
        return -1;
      }

      if (indexB !== -1) {
        return 1;
      }

      return a.name.localeCompare(b.name);
    });
  }, [languagesData]);

  console.log(sortedLanguages);

  // Redux
  const {isLessor} = useUserType();
  const {
    isNewUserLessor,
    newUserDetails,
    setNewUserDetails,
    resetNewUserState,
  } = useNewUserDetails(isLessor, edit);
  const {setCurrentScreen, currentScreen} = useNewUserCurrentScreen();
  const {
    data: advert,
    isLoading: advertIsLoading,
    isError: advertIsError,
  } = useGetAdvertByIdQuery(advertId ?? 0, {
    skip: !edit || !advertId,
    refetchOnMountOrArgChange: true,
  });

  const {data: currentUser} = useGetUserQuery();
  const [
    editUserProfile,
    {isLoading: isEditProfileLoading, isError: isEditProfileError},
  ] = useEditUserProfileMutation();
  const [editFlat, {isLoading: isEditFlatLoading, isError: isEditFlatError}] =
    useEditFlatMutation();

  const savedLanguages = useMemo(() => {
    if (edit) {
      console.log('edit in language screen', edit);
      return isLessor
        ? advert?.flat.flatLanguages.map(lang => lang.id)
        : currentUser?.profile?.profileLanguages?.map(lang => lang.id);
    }
    return newUserDetails.languages;
  }, [
    edit,
    isLessor,
    advert?.flat?.flatLanguages,
    currentUser?.profile?.profileLanguages,
    newUserDetails?.languages,
  ]);

  console.log('savedLanguages', savedLanguages);

  useEffect(() => {
    if (savedLanguages && savedLanguages.length > 0) {
      setLanguagesIds(savedLanguages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (sortedLanguages) {
      const filteredLanguages = sortedLanguages
        .filter(
          language =>
            language.name.toLowerCase().startsWith(searchValue.toLowerCase()) &&
            !languagesIds.includes(language.id),
        )
        .map(language => language.name);
      setLanguages(filteredLanguages);
      setIsLoading(false);
    }
  }, [searchValue, languagesIds, sortedLanguages]);

  const {fadeInAnim} = useFadeInAnimation(!isLoading);

  const {showPopover, triggerPopover, setShowPopover, hasShownPopover} =
    useManualPopoverTrigger({
      userId: currentUser?.id ?? 0,
      key: edit ? PopoverKeys.Language : PopoverKeys.NewUser,
    });
  const handleSelectedLanguages = (id: number) => {
    setLanguagesIds(prevIds =>
      prevIds.includes(id)
        ? prevIds.filter(langId => langId !== id)
        : [...prevIds, id],
    );

    scrollViewRef.current?.scrollTo({y: 0, animated: true});
  };

  const scrollViewRef = useRef<ScrollView>(null);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };
  const handleClearSearch = () => {
    setSearchValue('');
  };

  const handleBackButton = () => {
    if (!hasShownPopover && !isEqualValue(savedLanguages, languagesIds)) {
      triggerPopover();
      return;
    }
    if (edit) {
      resetNewUserState();
    } else {
      setCurrentScreen(1);
    }

    navigation.goBack();
    handleClearSearch();
    setError('');
    setShowPopover(false);
  };

  console.log('languagesIds', languagesIds);
  console.log('currentUser', currentUser);

  const createError = (err: unknown) => {
    const typedError = err as {
      status?: number;
    };
    if (typedError.status === 422) {
      setError('Please fill out all the required fields');
    } else {
      setError('An error occurred, please try again');
    }
  };

  const handleContinue = async () => {
    const selectedLanguages = sortedLanguages?.filter(lang =>
      languagesIds.includes(lang.id),
    );
    const result = languagesSchema.safeParse(selectedLanguages);
    if (!result.success) {
      setError(result.error?.flatten().formErrors.at(0));
      return;
    }
    setNewUserDetails({languages: languagesIds});

    if (!edit) {
      const screen = isNewUserLessor
        ? newUserScreens.lessor[currentScreen + 1]
        : newUserScreens.tenant[currentScreen + 1];
      navigation.navigate(screen);
      setCurrentScreen(currentScreen + 1);
      setError('');
      handleClearSearch();
      return;
    }

    if (isLessor) {
      try {
        const editFlatParams: EditFlatParams = {
          flatId: advert?.flat.id ?? 0,
          actionMethod: EditAdvertActions.Languages,
          languages: languagesIds,
        };
        await editFlat(editFlatParams).unwrap();
      } catch (err) {
        createError(err);
        return;
      }
    } else {
      try {
        const editParams: EditProfileParams<'tenant' | 'lessor'> = {
          userId: currentUser?.id ?? 0,
          actionMethod: EditProfileActions.languages,
          userType: isLessor ? UserType.lessor : UserType.tenant,
          languages: languagesIds,
        };
        await editUserProfile(editParams).unwrap();
      } catch (err) {
        createError(err);
        return;
      }
    }
    navigation.goBack();
    resetNewUserState();
    handleClearSearch();
    setError('');
  };

  console.log('languagesData', sortedLanguages);

  const selectedLanguageNames = sortedLanguages
    ?.filter(language => languagesIds.includes(language.id))
    .map(language => language.name);
  return {
    searchValue,
    handleSearch,
    handleClearSearch,
    languages,
    sortedLanguages,
    selectedLanguageNames,
    handleSelectedLanguages,
    languagesIds,
    error,
    isLoading,
    advertIsLoading,
    advertIsError,
    handleContinue,
    handleBackButton,
    fadeInAnim,
    scrollViewRef,
    isLessor,
    isNewUserLessor,
    showPopover,
    setShowPopover,
    isEditProfileLoading,
    isEditProfileError,
    isEditFlatLoading,
    isEditFlatError,
  };
};
