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
import {useManualPopoverTrigger} from 'reduxFeatures/settings/useManualPopoverTrigger';

// Screens 📺
import {newUserScreens} from 'navigationStacks/newUserScreens';

//Validation 🛡 ️
import {selfDescriptionSchema} from 'lib/zodSchema';

// helpers
import {isEqualValue} from 'helpers/isEqualValue';

//Types 🏷️
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';
import {
  EditProfileActions,
  EditProfileParams,
  UserType,
} from 'reduxFeatures/user/types';
import {PopoverKeys} from 'reduxFeatures/settings/types';

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
  } = useNewUserDetails(edit);
  const {data: currentUser} = useGetUserQuery(undefined, {skip: !edit});
  const [editUserProfile, {isLoading: isEditLoading, isError: isEditError}] =
    useEditUserProfileMutation();

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
    useManualPopoverTrigger({
      userId: currentUser?.id ?? 0,
      key: PopoverKeys.Edit,
    });

  const handleOnChange = (input: string) => {
    setText(input);
  };
  const handleOnFocus = () => {
    setTextFocus(true);
  };

  const handleOnBlur = () => {
    setTextFocus(false);
  };

  const handleBackButton = () => {
    if (!hasShownPopover && !isEqualValue(savedDescription, text)) {
      triggerPopover();
      return;
    }
    if (!edit) {
      setCurrentScreen(currentScreen - 1);
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
      setError('');
      return;
    }

    if (newValue || !isEqualValue(savedDescription, result.data)) {
      try {
        const editParams: EditProfileParams<UserType.TENANT | UserType.LESSOR> =
          {
            userId: currentUser?.id ?? 0,
            actionMethod: EditProfileActions.personalInfo,
            userType: isLessor ? UserType.LESSOR : UserType.TENANT,
            firstName: newUserDetails.firstName,
            lastName: newUserDetails.lastName,
            dateOfBirth: newUserDetails.dateOfBirth,
            selfDescription: result.data,
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
    setShowPopover(false);
  };

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
