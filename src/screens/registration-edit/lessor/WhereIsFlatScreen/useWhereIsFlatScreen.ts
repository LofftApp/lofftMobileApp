import {useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

//Redux 🧠
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useUserType} from 'reduxFeatures/user/useUserType';
import {
  useEditAdvertMutation,
  useEditFlatMutation,
  useGetAdvertByIdQuery,
} from 'reduxFeatures/adverts/advertApi';
import {useManualPopoverTrigger} from 'reduxFeatures/settings/useManualPopoverTrigger';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {useFadeInAnimation} from 'hooks/useFadeInAnimation';

// Screen 📺
import {newUserScreens} from 'navigationStacks/newUserScreens';

// API Hook 🪝
import {useFindAddress} from 'hooks/useFindAddress';

//Validation 🛡️
import {addressSchema} from 'lib/zodSchema';
import {Currency} from 'reduxFeatures/assets/types';

//Helpers 🤝
import {isEqualValue} from 'helpers/isEqualValue';

// Types 🏷️
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';
import {Messages, PopoverKeys} from 'reduxFeatures/settings/types';
import {EditAdvertActions, EditFlatParams} from 'reduxFeatures/adverts/types';
import {UserType} from 'reduxFeatures/user/types';
import {useToast} from 'reduxFeatures/settings/useToast';
import {ToastTypes} from 'reduxFeatures/settings/types';

export const useWhereIsFlatScreen = (
  edit?: boolean,
  advertId?: number,
  newValue?: boolean,
) => {
  // Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  // Local State
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState<Currency>('eur');
  const [warmRent, setWarmRent] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [addressDetails, setAddressDetails] = useState<{
    address: string;
    district?: string;
  }>({
    address: '',
    district: '',
  });
  const [errorAddress, setErrorAddress] = useState('');
  const [errorPrice, setErrorPrice] = useState('');
  const [isReady, setIsReady] = useState(false);

  // API Hook
  const {
    addresses,
    addressesWithDistrict,
    isLoading,
    error: errorSearch,
    setError: setErrorSearch,
  } = useFindAddress(location);

  // Redux
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {isLessor} = useUserType();
  const {newUserDetails, setNewUserDetails, resetNewUserState} =
    useNewUserDetails(edit);
  const {
    data: advert,
    isLoading: isLoadingAdvert,
    isError: isErrorAdvert,
  } = useGetAdvertByIdQuery(advertId ?? 0, {
    skip: !edit,
    refetchOnMountOrArgChange: true,
  });
  const {data: currentUser} = useGetUserQuery(undefined, {skip: !edit});

  const [editFlat, {isLoading: isEditFlatLoading, isError: isEditFlatError}] =
    useEditFlatMutation();

  const [
    editAdvert,
    {isLoading: isEditAdvertLoading, isError: isEditAdvertError},
  ] = useEditAdvertMutation();

  const newUserAddress =
    newUserDetails.userType === UserType.LESSOR
      ? newUserDetails.address
      : undefined;
  const newUserPrice =
    newUserDetails.userType === UserType.LESSOR
      ? newUserDetails.price
      : undefined;
  const newUserWarmRent =
    newUserDetails.userType === UserType.LESSOR
      ? newUserDetails.warmRent
      : undefined;
  const newUserCurrency =
    newUserDetails.userType === UserType.LESSOR
      ? newUserDetails.currency
      : undefined;

  const savedAddress = useMemo(() => {
    if (edit) {
      return {
        address: advert?.flat.address,
        district: advert?.flat.district.name,
      };
    }
    return newUserAddress;
  }, [newUserAddress, advert?.flat.address, edit, advert?.flat.district]);

  const savedPrice = useMemo(() => {
    if (edit) {
      return advert?.monthlyRent;
    }
    return newUserPrice;
  }, [newUserPrice, advert?.monthlyRent, edit]);

  const savedWarmRent = useMemo(() => {
    if (edit) {
      return advert?.warmRent;
    }
    return newUserWarmRent;
  }, [newUserWarmRent, advert?.warmRent, edit]);

  const savedCurrency = useMemo(() => {
    if (edit) {
      return advert?.currency;
    }
    return newUserCurrency;
  }, [newUserCurrency, advert?.currency, edit]);

  useEffect(() => {
    if (savedAddress) {
      setLocation(savedAddress.address ?? '');
      setAddressDetails({
        address: savedAddress.address ?? '',
        district: savedAddress.district ?? '',
      });
    }
    if (savedPrice) {
      setPrice(savedPrice.toString());
    }
    if (savedWarmRent) {
      setWarmRent(savedWarmRent);
    }
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!location) {
      setIsSearching(false);
    }
  }, [location]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const {fadeInAnim} = useFadeInAnimation(isReady);

  const {showPopover, triggerPopover, setShowPopover, hasShownPopover} =
    useManualPopoverTrigger({
      userId: currentUser?.id ?? 0,
      key: edit ? PopoverKeys.Edit : PopoverKeys.NewUser,
    });

  const {showToast} = useToast();

  const isNotEqualAllValues =
    !isEqualValue(savedAddress?.address, addressDetails.address) ||
    !isEqualValue(savedPrice?.toString(), price) ||
    !isEqualValue(savedWarmRent, warmRent) ||
    !isEqualValue(savedCurrency, currency);

  const handleBackButton = () => {
    if (!hasShownPopover && isNotEqualAllValues) {
      triggerPopover();
      return;
    }
    if (!edit) {
      setCurrentScreen(currentScreen - 1);
    }

    navigation.goBack();
    setErrorAddress('');
    setErrorPrice('');
    setErrorSearch('');
    setShowPopover(false);
  };

  const handleOnChangeSearch = async (searchTerm: string) => {
    setIsSearching(true);
    setLocation(searchTerm);
  };

  const handleOnChangePrice = (value: string) => {
    setPrice(value);
    setIsSearching(false);
  };

  const handleDropdownPress = (value: string) => {
    const addressIndex = addresses.indexOf(value);
    setLocation(value);
    setAddressDetails(addressesWithDistrict[addressIndex]);
    setIsSearching(false);
    setErrorAddress('');
  };

  const handleClearSearch = () => {
    setLocation('');
    setIsSearching(false);
  };

  const handleToggleWarmRent = () => {
    setWarmRent(prev => !prev);
  };

  const handleSelectCurrency = (id: Currency) => {
    setCurrency(id);
  };

  const createError = (err: unknown) => {
    const typedError = err as {
      status?: number;
    };
    if (typedError.status === 422) {
      setErrorPrice('We could not save your changes, please try again');
      setErrorAddress('We could not save your changes, please try again');
    } else {
      setErrorPrice('An error occurred, please try again');
      setErrorAddress('An error occurred, please try again');
    }
  };

  const handleContinue = async () => {
    const trimmedPrice = price.trim();
    const result = addressSchema.safeParse({
      address: addressDetails.address,
      district: addressDetails.district,
      price: Number(trimmedPrice),
      warmRent,
      currency,
    });

    if (!result.success) {
      const errAddress = result.error?.flatten().fieldErrors.address?.[0];
      const errPrice = result.error?.flatten().fieldErrors.price?.[0];

      if (errAddress) {
        setErrorAddress(errAddress);
      }
      if (errPrice) {
        setErrorPrice(errPrice);
      }
      return;
    }

    setNewUserDetails({
      address: {
        address: result.data.address,
        district: result.data.district,
      },
      price: result.data.price,
      warmRent: result.data.warmRent,
      currency: result.data.currency,
    });

    if (!edit) {
      setCurrentScreen(currentScreen + 1);
      navigation.navigate(newUserScreens.lessor[currentScreen + 1]);
      setErrorAddress('');
      setErrorPrice('');
      setErrorSearch('');
      return;
    }

    if (edit && (newValue || isNotEqualAllValues)) {
      if (isLessor) {
        try {
          const editFlatParams: EditFlatParams = {
            flatId: advert?.flat.id ?? 0,
            actionMethod: EditAdvertActions.Location,
            city: newUserDetails.city,
            districts: newUserDetails.districts,
            address: {
              address: result.data.address,
              district: result.data.district,
            },
          };

          const editAdvertParams = {
            advertId: advertId ?? 0,
            actionMethod: EditAdvertActions.Location,
            price: result.data.price,
            currency: result.data.currency,
            warmRent: result.data.warmRent,
          };

          await Promise.all([
            editFlat(editFlatParams).unwrap(),
            editAdvert(editAdvertParams).unwrap(),
          ]);
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

    setErrorAddress('');
    setErrorPrice('');
    setErrorSearch('');
  };

  return {
    handleBackButton,
    handleOnChangeSearch,
    handleOnChangePrice,
    handleDropdownPress,
    handleClearSearch,
    handleToggleWarmRent,
    handleSelectCurrency,
    handleContinue,
    location,
    price,
    currency,
    warmRent,
    isSearching,
    addresses,
    addressesWithDistrict,
    addressDetails,
    errorAddress,
    errorPrice,
    errorSearch,
    isLoading,
    fadeInAnim,
    isReady,
    isLoadingAdvert,
    isErrorAdvert,
    showPopover,
    setShowPopover,
    isEditFlatLoading,
    isEditFlatError,
    isEditAdvertLoading,
    isEditAdvertError,
  };
};
