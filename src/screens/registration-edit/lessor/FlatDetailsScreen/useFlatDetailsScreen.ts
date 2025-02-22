import {useEffect, useMemo, useState} from 'react';

import {useNavigation} from '@react-navigation/native';

//Redux
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';

// Screens 📺
import {newUserScreens} from 'navigationStacks/newUserScreens';

//Validation 🛡 ️
import {flatDetailsSchema} from 'lib/zodSchema';

//Types 🏷️
import {
  NewUserJourneyStackNavigation,
  SettingsScreenNavigationProp,
} from 'navigationStacks/types';
import {useGetAdvertByIdQuery} from 'reduxFeatures/adverts/advertApi';

import {useFadeInAnimation} from 'hooks/useFadeInAnimation';
import {useManualPopoverTrigger} from 'reduxFeatures/settings/useManualPopoverTrigger';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {PopoverKeys} from 'reduxFeatures/settings/types';
import {isEqualValue} from 'helpers/isEqualValue';
import {resetNewUserState} from 'reduxFeatures/registration/newUserSlice';

export const useFlatDetailsScreen = (edit?: boolean, advertId?: number) => {
  //Navigation
  const navigation = useNavigation<
    NewUserJourneyStackNavigation & SettingsScreenNavigationProp
  >();

  //Local State
  const [tagLine, setTagLine] = useState('');
  const [size, setSize] = useState('');
  const [errorTagLine, setErrorTagLine] = useState('');
  const [errorSize, setErrorSize] = useState('');

  //Redux
  const {setCurrentScreen, currentScreen} = useNewUserCurrentScreen();
  const {setNewUserDetails, newUserDetails} = useNewUserDetails(edit);
  const {
    data: advert,
    isLoading,
    isError,
  } = useGetAdvertByIdQuery(advertId ?? 0, {
    skip: !edit,
    refetchOnMountOrArgChange: true,
  });

  const {data: currentUser} = useGetUserQuery(undefined, {skip: !edit});

  const lessorTagline =
    newUserDetails.userType === 'lessor' && newUserDetails.tagLine;
  const lessorSize =
    newUserDetails.userType === 'lessor' && newUserDetails.size;

  const savedTagLine = useMemo(() => {
    if (edit) {
      return advert?.flat.tagLine;
    }
    return lessorTagline;
  }, [edit, advert, lessorTagline]);

  const savedSize = useMemo(() => {
    if (edit) {
      return advert?.flat.size;
    }
    return lessorSize;
  }, [edit, advert, lessorSize]);

  useEffect(() => {
    if (savedTagLine) {
      setTagLine(savedTagLine);
    }
    if (savedSize) {
      setSize(savedSize.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //animation
  const {fadeInAnim} = useFadeInAnimation();

  const {showPopover, triggerPopover, setShowPopover, hasShownPopover} =
    useManualPopoverTrigger({
      userId: currentUser?.id ?? 0,
      key: edit ? PopoverKeys.Edit : PopoverKeys.NewUser,
    });

  const isNotEqualAllValues =
    !isEqualValue(savedTagLine, tagLine) ||
    !isEqualValue(savedSize?.toString(), size);

  const handleTagLineChange = (input: string) => {
    setTagLine(input);
    setErrorTagLine('');
  };

  const handleSizeChange = (input: string) => {
    setSize(input);
    setErrorSize('');
  };

  const handleBackButton = () => {
    if (!hasShownPopover && isNotEqualAllValues) {
      triggerPopover();
      return;
    }

    if (edit) {
      resetNewUserState();
    } else {
      setCurrentScreen(currentScreen - 1);
    }

    navigation.goBack();
    setErrorTagLine('');
    setErrorSize('');
    setShowPopover(false);
  };

  const handleContinue = () => {
    const trimmedtagLine = tagLine.trim();
    const trimmedSize = size.trim();
    const result = flatDetailsSchema.safeParse({
      tagLine: trimmedtagLine,
      size: Number(trimmedSize),
    });

    if (!result.success) {
      const errTagLine = result.error.flatten().fieldErrors?.tagLine?.[0];
      const errSize = result.error.flatten().fieldErrors?.size?.[0];
      if (errTagLine) {
        setErrorTagLine(errTagLine);
      }
      if (errSize) {
        setErrorSize(errSize);
      }
      return;
    }

    setNewUserDetails({
      tagLine: result.data.tagLine,
      size: result.data.size,
    });

    if (!edit) {
      const screen = newUserScreens.lessor[currentScreen + 1];
      navigation.navigate(screen);
      setCurrentScreen(currentScreen + 1);
      setErrorTagLine('');
      setErrorSize('');
      return;
    }

    navigation.navigate('NewUserNavigator', {
      screen: 'FlatDescribeScreen',
      params: {
        edit: true,
        advertId,
        newValue: isNotEqualAllValues,
      },
    });

    setErrorTagLine('');
    setErrorSize('');
    setShowPopover(false);
  };

  return {
    handleTagLineChange,
    handleSizeChange,
    handleBackButton,
    handleContinue,
    tagLine,
    size,
    errorTagLine,
    errorSize,
    fadeInAnim,
    isLoading,
    isError,
    showPopover,
    setShowPopover,
  };
};
