import {useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

//Redux
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';

// Screens 📺
import {newUserScreens} from 'navigationStacks/newUserScreens';

//Validation 🛡 ️
import {flatDescriptionSchema} from 'lib/zodSchema';

//Types 🏷️
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';
import {useUserType} from 'reduxFeatures/user/useUserType';
import {
  useEditFlatMutation,
  useGetAdvertByIdQuery,
} from 'reduxFeatures/adverts/advertApi';

import {useFadeInAnimation} from 'hooks/useFadeInAnimation';
import {Messages, PopoverKeys} from 'reduxFeatures/settings/types';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {useManualPopover} from 'reduxFeatures/settings/useManualPopover';
import {isEqualValue} from 'helpers/isEqualValue';
import {EditAdvertActions, EditFlatParams} from 'reduxFeatures/adverts/types';
import {useToast} from 'reduxFeatures/settings/useToast';
import {ToastTypes} from 'reduxFeatures/settings/types';

export const useFlatDescribeScreen = (
  edit?: boolean,
  advertId?: number,
  newValue?: boolean,
) => {
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
  const {
    data: advert,
    isLoading: isAdvertLoading,
    isError: isAdvertError,
  } = useGetAdvertByIdQuery(advertId ?? 0, {
    skip: !edit,
    refetchOnMountOrArgChange: true,
  });

  const {data: currentUser} = useGetUserQuery(undefined, {skip: !edit});

  const [editFlat, {isLoading: isEditFlatLoading, isError: isEditFlatError}] =
    useEditFlatMutation();

  const {showPopover, triggerPopover, setShowPopover, hasShownPopover} =
    useManualPopover({
      userId: currentUser?.id ?? 0,
      key: edit ? PopoverKeys.Edit : PopoverKeys.NewUser,
    });

  const {showToast} = useToast();

  const lessorDescription =
    newUserDetails.userType === 'lessor' && newUserDetails.flatDescription;
  const lessorTagline =
    newUserDetails.userType === 'lessor' ? newUserDetails.tagLine : undefined;
  const lessorSize =
    newUserDetails.userType === 'lessor' ? newUserDetails.size : undefined;

  const savedDescription = useMemo(() => {
    return edit ? advert?.flat.description : lessorDescription;
  }, [edit, advert, lessorDescription]);

  useEffect(() => {
    if (savedDescription) {
      setText(savedDescription);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = (input: string) => {
    setText(input);
  };
  const handleOnFocus = () => {
    setTextFocus(true);
  };

  const handleOnBlur = () => {
    setTextFocus(false);
  };

  const {fadeInAnim} = useFadeInAnimation();

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
    setShowPopover(false);
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
    const trimmedText = text.trim();
    const result = flatDescriptionSchema.safeParse(trimmedText);

    if (!result.success) {
      setError(result.error.flatten().formErrors?.[0]);
      return;
    }

    setNewUserDetails({flatDescription: result.data});

    if (!edit) {
      const screen = newUserScreens.lessor[currentScreen + 1];
      navigation.navigate(screen);
      setCurrentScreen(currentScreen + 1);
      setError('');
      return;
    }

    if (edit && (newValue || !isEqualValue(savedDescription, text))) {
      if (isLessor) {
        try {
          const editFlatParams: EditFlatParams = {
            flatId: advert?.flat.id ?? 0,
            actionMethod: EditAdvertActions.FlatDetails,
            tagLine: lessorTagline,
            size: lessorSize,
            flatDescription: result.data,
          };
          await editFlat(editFlatParams).unwrap();
          showToast({
            message: Messages.ChangesSaved,
            type: ToastTypes.Success,
          });
        } catch (err) {
          createError(err);
          return;
        }
      }
    }

    navigation.goBack();
    navigation.goBack();
    resetNewUserState();
    setError('');
    setShowPopover(false);
  };

  return {
    text,
    textFocus,
    error,
    fadeInAnim,
    handleOnChange,
    handleOnFocus,
    handleOnBlur,
    handleBackButton,
    handleContinue,
    isAdvertLoading,
    isAdvertError,
    isNewUserLessor,
    isLessor,
    showPopover,
    setShowPopover,
    isEditFlatLoading,
    isEditFlatError,
  };
};
