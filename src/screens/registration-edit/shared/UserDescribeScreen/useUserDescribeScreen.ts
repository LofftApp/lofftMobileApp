import {useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

//Redux
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {
  useEditUserProfileMutation,
  useGetUserQuery,
} from 'reduxFeatures/user/userApi';
import {useUserType} from 'reduxFeatures/user/useUserType';

// Screens 📺
import {newUserScreens} from 'navigationStacks/newUserScreens';

//Validation 🛡 ️
import {selfDescriptionSchema} from 'lib/zodSchema';

//Types 🏷️
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';
import {isEqualValue} from 'helpers/isEqualValue';
import {EditUserProfileParams} from 'reduxFeatures/user/types';
import {useManualPopoverTrigger} from 'reduxFeatures/settings/useManualPopoverTrigger';

export const useUserDescribeScreen = (edit?: boolean, newValue?: boolean) => {
  //Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  //Local State
  const [text, setText] = useState('');
  const [textFocus, setTextFocus] = useState(false);
  const [error, setError] = useState('');

  //Redux
  const {setCurrentScreen, currentScreen} = useNewUserCurrentScreen();
  const {isLessor} = useUserType();
  const {
    setNewUserDetails,
    newUserDetails,
    isNewUserLessor,
    resetNewUserState,
  } = useNewUserDetails(isLessor, edit);
  const {data: currentUser} = useGetUserQuery(undefined, {skip: !edit});
  const [editUserProfile, {isLoading: isEditLoading, isError: isEditError}] =
    useEditUserProfileMutation();
  console.log('currentUser', currentUser);

  const savedDescription = useMemo(() => {
    if (edit) {
      return currentUser?.profile.description;
    } else {
      return newUserDetails.selfDescription;
    }
  }, [edit, newUserDetails.selfDescription, currentUser?.profile.description]);

  useEffect(() => {
    if (savedDescription) {
      setText(savedDescription);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {showPopover, triggerPopover, setShowPopover, hasShownPopover} =
    useManualPopoverTrigger('editName');

  const handleOnChange = (input: string) => {
    setText(input);
  };
  const handleOnFocus = () => {
    setTextFocus(true);
  };

  const handleOnBlur = () => {
    setTextFocus(false);
  };
  console.log('hasShwonPopover in describe', hasShownPopover);

  const handleBackButton = () => {
    if (!edit) {
      setCurrentScreen(currentScreen - 1);
    }
    if (!hasShownPopover && !isEqualValue(savedDescription, text)) {
      triggerPopover();
      return;
    }
    navigation.goBack();
    setError('');
  };
  const handleContinue = async () => {
    const trimmedText = text.trim();
    const result = selfDescriptionSchema.safeParse(trimmedText);
    if (!result.success) {
      setError(result.error.flatten().formErrors?.[0]);
      return;
    }

    setNewUserDetails({selfDescription: result.data});

    if (!edit) {
      setCurrentScreen(currentScreen + 1);
      const screen = isNewUserLessor
        ? newUserScreens.lessor[currentScreen + 1]
        : newUserScreens.tenant[currentScreen + 1];
      navigation.navigate(screen);
    }

    if (newValue || !isEqualValue(savedDescription, result.data)) {
      try {
        const editParams: EditUserProfileParams<'lessor' | 'tenant'> = {
          userId: currentUser?.id ?? 0,
          actionMethod: 'personalInfo',
          userType: isLessor ? 'lessor' : 'tenant',
          firstName: newUserDetails.firstName,
          lastName: newUserDetails.lastName,
          dateOfBirth: newUserDetails.dateOfBirth,
          selfDescription: result.data,
        };
        console.log('editParams', editParams);
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
    setShowPopover(false);
  };

  console.log('NewuSer', newUserDetails);
  return {
    handleOnChange,
    handleOnFocus,
    handleOnBlur,
    handleBackButton,
    handleContinue,
    text,
    textFocus,
    error,
    isEditLoading,
    isEditError,
    showPopover,
    setShowPopover,
  };
};
