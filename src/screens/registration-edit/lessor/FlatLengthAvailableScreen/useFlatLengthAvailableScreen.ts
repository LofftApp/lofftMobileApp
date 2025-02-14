import {useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

//Redux 🧠
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';

// Screen 📺
import {newUserScreens} from 'navigationStacks/newUserScreens';

//Validation 🛡 ️
import {dateLengthSchema} from 'lib/zodSchema';

// Styles 🖼️

// Helpers 🤝
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
dayjs.extend(isToday);

// Types
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';
import {useUserType} from 'reduxFeatures/user/useUserType';
import {useFadeInAnimation} from 'hooks/useFadeInAnimation';
import {
  useEditAdvertMutation,
  useGetAdvertByIdQuery,
} from 'reduxFeatures/adverts/advertApi';

import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {useManualPopoverTrigger} from 'reduxFeatures/settings/useManualPopoverTrigger';
import {PopoverKeys} from 'reduxFeatures/settings/types';
import {isEqualValue} from 'helpers/isEqualValue';
import {EditAdvertActions, EditAdvertParams} from 'reduxFeatures/adverts/types';
export const useFlatLengthAvailableScreen = (
  edit?: boolean,
  advertId?: number,
) => {
  // Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  // Local State
  const [selector, setSelector] = useState('');
  const [fromDate, setFromDate] = useState<Date | null>(new Date());
  const [fromDateSelected, setFromDateSelected] = useState(false);
  const [untilDate, setUntilDate] = useState<Date | null>(new Date());
  const [untilDateSelected, setUntilDateSelected] = useState(false);
  const [today, setToday] = useState(false);
  const [permanent, setPermanent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorFromDate, setErrorFromDate] = useState('');
  const [errorUntilDate, setErrorUntilDate] = useState('');

  // Redux
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {isLessor} = useUserType();
  const {newUserDetails, setNewUserDetails, resetNewUserState} =
    useNewUserDetails(isLessor, edit);
  const {
    data: advert,
    isLoading: isAdvertLoading,
    isError: isAdvertError,
  } = useGetAdvertByIdQuery(advertId ?? 0, {
    skip: !edit,
    refetchOnMountOrArgChange: true,
  });

  const {data: currentUser} = useGetUserQuery(undefined, {skip: !edit});

  const [
    editAdvert,
    {isLoading: isEditAdvertLoading, isError: isEditAdvertError},
  ] = useEditAdvertMutation();

  const {showPopover, triggerPopover, setShowPopover, hasShownPopover} =
    useManualPopoverTrigger({
      userId: currentUser?.id ?? 0,
      key: edit ? PopoverKeys.Edit : PopoverKeys.Gender,
    });

  const lessorFromDate =
    newUserDetails.userType === 'lessor' && newUserDetails.fromDate;

  const lessorUntilDate =
    newUserDetails.userType === 'lessor' && newUserDetails.untilDate;

  const savedFromDate = useMemo(() => {
    return edit ? advert?.fromDate : lessorFromDate;
  }, [edit, advert?.fromDate, lessorFromDate]);

  const savedUntilDate = useMemo(() => {
    return edit ? advert?.toDate : lessorUntilDate;
  }, [edit, advert?.toDate, lessorUntilDate]);

  console.log('savedFromDate', savedFromDate);
  console.log('savedUntilDate', savedUntilDate);
  console.log('From date', fromDate);
  console.log('Until date', untilDate);
  console.log('Today', today);
  console.log('FromDateSelected', fromDateSelected);
  console.log('UntilDateSelected', untilDateSelected);
  useEffect(() => {
    if (savedFromDate) {
      if (dayjs(new Date(savedFromDate)).isToday()) {
        setToday(true);
      }
      setFromDate(new Date(savedFromDate));
      setFromDateSelected(true);
    }
    if (savedUntilDate) {
      setUntilDate(new Date(savedUntilDate));
      setUntilDateSelected(true);
    }
    if (savedUntilDate === null) {
      setPermanent(true);
      setUntilDateSelected(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {fadeInAnim} = useFadeInAnimation();

  const isNotEqualAllValues =
    !isEqualValue(savedFromDate?.toString(), fromDate?.toString()) ||
    !isEqualValue(savedUntilDate?.toString(), untilDate?.toString());

  const handleBackButton = () => {
    if (!hasShownPopover && isNotEqualAllValues) {
      triggerPopover();
      return;
    }

    if (!edit) {
      setCurrentScreen(currentScreen - 1);
    }
    navigation.goBack();
    setErrorFromDate('');
    setErrorUntilDate('');
  };

  const handleFromDate = () => {
    setSelector('from');
    setIsModalOpen(true);
  };

  const handleUntilDate = () => {
    setSelector('until');
    setIsModalOpen(true);
  };

  const handleDateChange = (input: Date) => {
    setIsModalOpen(false);

    if (selector === 'from') {
      setFromDate(input);
      setFromDateSelected(true);
      setToday(dayjs(input).isToday());
      setErrorFromDate('');
    } else if (selector === 'until') {
      setUntilDate(input);
      setPermanent(false);
      setUntilDateSelected(true);
      setErrorUntilDate('');
    }

    setSelector('');
  };

  const handleToggleToday = () => {
    const isTodayDate = today ? fromDate : new Date();
    setFromDate(isTodayDate);
    setFromDateSelected(!today);
    setToday(prev => !prev);
    setErrorFromDate('');
  };

  const handleTogglePermanent = () => {
    setUntilDateSelected(!permanent);
    setUntilDate(null);
    setPermanent(prev => !prev);
    setErrorUntilDate('');
  };

  const handleCancelDate = () => {
    setIsModalOpen(false);
    setSelector('');
  };

  const createError = (err: unknown) => {
    const typedError = err as {
      status?: number;
    };
    if (typedError.status === 422) {
      const errorMsg = 'We could not save your changes, please try again';
      setErrorFromDate(errorMsg);
      setErrorUntilDate(errorMsg);
    } else {
      const errorMsg = 'An error occurred, please try again';
      setErrorFromDate(errorMsg);
      setErrorUntilDate(errorMsg);
    }
  };

  const handleContinue = async () => {
    const result = dateLengthSchema.safeParse({
      fromDate: fromDateSelected ? fromDate : undefined,
      untilDate: untilDateSelected && !permanent ? untilDate : null,
      permanent: permanent,
    });

    if (!result.success) {
      const errFromDate = result.error?.flatten().fieldErrors.fromDate?.[0];
      const errUntilDate = result.error?.flatten().fieldErrors.untilDate?.[0];

      if (errFromDate) {
        setErrorFromDate(errFromDate);
      }

      if (errUntilDate) {
        setErrorUntilDate(errUntilDate);
      }

      return;
    }
    setNewUserDetails({
      fromDate: fromDate?.toISOString(),
      untilDate: result.data.permanent ? null : untilDate?.toISOString(),
      permanent: result.data.permanent,
    });

    if (!edit) {
      setCurrentScreen(currentScreen + 1);
      const screen = newUserScreens.lessor[currentScreen + 1];
      navigation.navigate(screen);
      setErrorFromDate('');
      setErrorUntilDate('');
      return;
    }

    if (isNotEqualAllValues) {
      try {
        const editAdvertParams: EditAdvertParams = {
          advertId: advertId ?? 0,
          actionMethod: EditAdvertActions.Availability,
          fromDate: fromDate?.toISOString(),
          untilDate: result.data.permanent ? null : untilDate?.toISOString(),
          permanent: result.data.permanent,
        };
        await editAdvert(editAdvertParams).unwrap();
        console.log('editAdvertParams', editAdvertParams);
      } catch (err) {
        createError(err);
        return;
      }
    }

    navigation.goBack();
    resetNewUserState();
    setErrorFromDate('');
    setErrorUntilDate('');
  };

  return {
    fadeInAnim,
    handleBackButton,
    handleFromDate,
    handleUntilDate,
    handleDateChange,
    handleToggleToday,
    handleTogglePermanent,
    handleCancelDate,
    handleContinue,
    fromDate,
    fromDateSelected,
    untilDate,
    untilDateSelected,
    today,
    permanent,
    isModalOpen,
    errorFromDate,
    errorUntilDate,
    isAdvertLoading,
    isAdvertError,
    isEditAdvertLoading,
    isEditAdvertError,
    showPopover,
    setShowPopover,
  };
};
