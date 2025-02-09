import {useEffect, useMemo, useState} from 'react';

import {useNavigation} from '@react-navigation/native';

//Redux
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useUserType} from 'reduxFeatures/user/useUserType';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {isEqualValue} from 'helpers/isEqualValue';

// Hooks 🪝
import {useManualPopoverTrigger} from 'reduxFeatures/settings/useManualPopoverTrigger';

// Screens 📺
import {newUserScreens} from 'navigationStacks/newUserScreens';

//Validation 🛡 ️
import {nameSchema} from 'lib/zodSchema';

//Types 🏷 ️
import {
  NewUserJourneyStackNavigation,
  SettingsScreenNavigationProp,
} from 'navigationStacks/types';
import {PopoverKeys} from 'reduxFeatures/settings/types';

export const useNameProfileScreen = (edit?: boolean) => {
  //Navigation
  const navigation = useNavigation<
    NewUserJourneyStackNavigation & SettingsScreenNavigationProp
  >();

  //Local State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorDate, setErrorDate] = useState('');
  const [errorImage, setErrorImage] = useState('');

  //Redux
  const {isLessor} = useUserType();
  const {setCurrentScreen, currentScreen} = useNewUserCurrentScreen();
  const {
    isNewUserLessor,
    setNewUserDetails,
    newUserDetails,
    resetNewUserState,
  } = useNewUserDetails(isLessor, edit);
  const {data: currentUser} = useGetUserQuery(undefined, {skip: !edit});

  const savedProfileData = useMemo(() => {
    if (edit) {
      if (
        currentUser?.profile.firstName ||
        currentUser?.profile.lastName ||
        currentUser?.profile.dateOfBirth
      ) {
        return {
          firstName: currentUser.profile.firstName,
          lastName: currentUser.profile.lastName,
          dateOfBirth: new Date(currentUser.profile.dateOfBirth),
        };
      }
    }
    if (
      newUserDetails.firstName ||
      newUserDetails.lastName ||
      newUserDetails.dateOfBirth
    ) {
      return {
        firstName: newUserDetails.firstName,
        lastName: newUserDetails.lastName,
        dateOfBirth: new Date(newUserDetails.dateOfBirth),
      };
    }
  }, [
    edit,
    currentUser?.profile?.firstName,
    currentUser?.profile?.lastName,
    currentUser?.profile?.dateOfBirth,
    newUserDetails.firstName,
    newUserDetails.lastName,
    newUserDetails.dateOfBirth,
  ]);
  console.log('DATE', date);

  useEffect(() => {
    if (savedProfileData?.firstName) {
      setFirstName(savedProfileData.firstName);
    }
    if (savedProfileData?.lastName) {
      setLastName(savedProfileData.lastName);
    }
    if (savedProfileData?.dateOfBirth) {
      setDate(savedProfileData.dateOfBirth);
      setIsDateSelected(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('currentUser', currentUser);

  const {showPopover, triggerPopover, setShowPopover, hasShownPopover} =
    useManualPopoverTrigger({
      userId: currentUser?.id ?? 0,
      key: edit ? PopoverKeys.Name : PopoverKeys.NewUser,
    });
  console.log('hasShownPopover', hasShownPopover);
  console.log('savedProfileData', savedProfileData);

  const handleFirstName = (input: string) => {
    setFirstName(input);
    setErrorFirstName('');
  };

  const handleLastName = (input: string) => {
    setLastName(input);
    setErrorLastName('');
  };

  const handleOnPressDatePicker = () => {
    setIsDatePickerOpen(true);
  };

  const handleDateChange = (input: Date) => {
    setDate(input);
    setIsDatePickerOpen(false);
    setIsDateSelected(true);
    setErrorDate('');
  };

  const handleCancelDate = () => {
    setIsDatePickerOpen(false);
  };

  const handleBackButton = () => {
    if (
      !hasShownPopover &&
      (!isEqualValue(savedProfileData?.firstName, firstName) ||
        !isEqualValue(savedProfileData?.lastName, lastName) ||
        !isEqualValue(savedProfileData?.dateOfBirth, date))
    ) {
      triggerPopover();
      return;
    }

    if (edit) {
      resetNewUserState();
    } else {
      setCurrentScreen(currentScreen - 1);
    }

    navigation.goBack();
    setShowPopover(false);
  };

  const handleContinue = () => {
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    const result = nameSchema.safeParse({
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      dateOfBirth: isDateSelected ? date : undefined,
    });

    if (!result.success) {
      const firstError = result.error.flatten().fieldErrors?.firstName?.[0];
      const lastError = result.error.flatten().fieldErrors?.lastName?.[0];
      const dateError = result.error.flatten().fieldErrors?.dateOfBirth?.[0];

      if (firstError) {
        setErrorFirstName(firstError);
      }
      if (lastError) {
        setErrorLastName(lastError);
      }
      if (dateError) {
        setErrorDate(dateError);
      }

      return;
    }
    console.log('result', result);

    setNewUserDetails({
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      dateOfBirth: result.data.dateOfBirth.toISOString(),
    });

    if (!edit) {
      const screen = isNewUserLessor
        ? newUserScreens.lessor[currentScreen + 1]
        : newUserScreens.tenant[currentScreen + 1];
      navigation.navigate(screen);
      setCurrentScreen(currentScreen + 1);
      setErrorFirstName('');
      setErrorLastName('');
      setErrorDate('');
      setErrorImage('');
      return;
    }

    const newValue =
      !isEqualValue(savedProfileData?.firstName, result.data.firstName) ||
      !isEqualValue(savedProfileData?.lastName, result.data.lastName) ||
      !isEqualValue(savedProfileData?.dateOfBirth, result.data.dateOfBirth);
    navigation.navigate('NewUserNavigator', {
      screen: 'UserDescribeScreen',
      params: {edit: true, newValue},
    });

    setErrorFirstName('');
    setErrorLastName('');
    setErrorDate('');
    setErrorImage('');
    setShowPopover(false);
  };

  return {
    handleFirstName,
    handleLastName,
    handleOnPressDatePicker,
    handleDateChange,
    handleCancelDate,
    handleBackButton,
    handleContinue,
    firstName,
    lastName,
    date,
    isDateSelected,
    isDatePickerOpen,
    errorFirstName,
    errorLastName,
    errorDate,
    errorImage,
    isLessor,
    isNewUserLessor,
    showPopover,
    setShowPopover,
  };
};
