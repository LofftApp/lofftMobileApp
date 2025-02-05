import {useEffect, useMemo, useState} from 'react';

import {useNavigation} from '@react-navigation/native';

//Redux 📦
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useGetAssetsQuery} from 'reduxFeatures/assets/assetsApi';
import {useGetAdvertByIdQuery} from 'reduxFeatures/adverts/advertApi';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

// Data 💿
import {newUserScreens} from 'navigationStacks/newUserScreens';

// Validation 🛡  ️
import {characteristicsSchema} from 'lib/zodSchema';

// Helper 🤝

import {isEqualValue} from 'helpers/isEqualValue';

// Types 🏷 ️
import {
  NewUserJourneyStackNavigation,
  SettingsScreenNavigationProp,
} from '../../../../navigationStacks/types';
import {useUserType} from 'reduxFeatures/user/useUserType';

// Hooks 🪝
import {usePopoverDisplayFirstTime} from 'hooks/usePopoverDisplayFirstTime';

export const useAboutUserFlatScreen = (edit?: boolean, advertId?: number) => {
  //Navigation
  const navigation = useNavigation<
    NewUserJourneyStackNavigation & SettingsScreenNavigationProp
  >();

  // initial state
  const {data} = useGetAssetsQuery();
  const characteristics = data?.characteristics;

  // Local State
  const [selectedCharsIds, setSelectedCharsIds] = useState<number[]>([]);
  const [error, setError] = useState<string | undefined>('');

  //Redux
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {isLessor} = useUserType();
  const {
    newUserDetails,
    setNewUserDetails,
    isNewUserLessor,
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

  const savedCharsIds = useMemo(() => {
    if (edit) {
      return isLessor
        ? advert?.flat?.characteristics.map(char => char.id)
        : currentUser?.profile?.characteristics.map(char => char.id);
    }
    return newUserDetails?.characteristics;
  }, [
    edit,
    isLessor,
    advert?.flat.characteristics,
    currentUser?.profile.characteristics,
    newUserDetails.characteristics,
  ]);

  useEffect(() => {
    if (savedCharsIds && savedCharsIds.length > 0) {
      setSelectedCharsIds(savedCharsIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    showPopover,
    setShowPopover,
    triggerPopover,

    hasShownPopover,
  } = usePopoverDisplayFirstTime('editChars');

  const handleBackButton = () => {
    if (!edit) {
      setCurrentScreen(currentScreen - 1);
    }
    if (!hasShownPopover && !isEqualValue(savedCharsIds, selectedCharsIds)) {
      triggerPopover();
      return;
    }

    navigation.goBack();
    setError('');
    resetNewUserState();
  };

  const handleSelectChars = (id: number) => {
    setSelectedCharsIds(prevIds =>
      prevIds.includes(id)
        ? prevIds.filter(charId => charId !== id)
        : [...prevIds, id],
    );
  };

  const handleContinue = async () => {
    const selectedChars = characteristics?.filter(chars =>
      selectedCharsIds.includes(chars.id),
    );
    console.log('selectedChars', selectedChars);
    const result = characteristicsSchema.safeParse(selectedChars);
    if (!result.success) {
      setError(result.error?.flatten().formErrors.at(0));
      return;
    }

    setNewUserDetails({characteristics: selectedCharsIds});
    if (edit) {
      navigation.navigate('NewUserNavigator', {
        screen: 'FlatFeaturesScreen',
        params: {
          edit: true,
          advertId,
          newValue: !isEqualValue(savedCharsIds, selectedCharsIds),
        },
      });
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
    handleSelectChars,
    handleContinue,
    handleBackButton,
    selectedCharsIds,
    error,
    isAdvertError,
    isAdvertLoading,
    characteristics,
    showPopover,
    setShowPopover,
    isLessor,
    isNewUserLessor,
  };
};
