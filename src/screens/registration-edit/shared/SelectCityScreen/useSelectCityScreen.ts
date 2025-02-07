// Needs refactoring to work with TypeScript
import {useState, useEffect, useRef, useMemo} from 'react';
import {Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//Redux
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useGetAssetsQuery} from 'reduxFeatures/assets/assetsApi';
import {useUserType} from 'reduxFeatures/user/useUserType';
import {useGetAdvertByIdQuery} from 'reduxFeatures/adverts/advertApi';
import {
  useEditUserProfileMutation,
  useGetUserQuery,
} from 'reduxFeatures/user/userApi';
import {useManualPopoverTrigger} from 'reduxFeatures/settings/useManualPopoverTrigger';

// Screens 📺
import {newUserScreens} from 'navigationStacks/newUserScreens';

//Validation 🛡 ️
import {cityDistrictsSchema} from 'lib/zodSchema';

// Helper 🤝
import {capitalize} from 'helpers/capitalize';
import {isEqualValue} from 'helpers/isEqualValue';

// Types
import {
  NewUserJourneyStackNavigation,
  SettingsScreenNavigationProp,
} from 'navigationStacks/types';
import {CityAssets, District} from 'reduxFeatures/assets/types';
import {
  EditActionMethods,
  EditUserProfileParams,
  UserType,
} from 'reduxFeatures/user/types';
import { PopoverKeys } from 'reduxFeatures/settings/types';

export const useSelectCityScreen = (edit?: boolean, advertId?: number) => {
  //Navigation
  const navigation = useNavigation<
    NewUserJourneyStackNavigation & SettingsScreenNavigationProp
  >();

  // initial state
  const {data} = useGetAssetsQuery();
  const cities: CityAssets[] = useMemo(() => data?.cities || [], [data]);

  //Local State
  const [city, setCity] = useState('');
  const [selectedCityId, setSelectedCityId] = useState<number | undefined>(
    undefined,
  );
  const [dropdownContent, setDropdownContent] = useState<
    CityAssets[] | Partial<CityAssets>[]
  >([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [isAllDistricts, setIsAllDistricts] = useState(false);
  const [selectedDistrictIds, setSelectedDistrictIds] = useState<number[]>([]);

  const [isQuery, setIsQuery] = useState(false);
  const [error, setError] = useState<string | undefined>('');

  //Redux
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {isLessor} = useUserType();
  const {
    setNewUserDetails,
    newUserDetails,
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

  const [editUserProfile, {isLoading: isEditLoading, isError: isEditError}] =
    useEditUserProfileMutation();

  const savedDistrictIds = useMemo(() => {
    if (edit) {
      return isLessor
        ? advert?.flat.district
        : currentUser?.profile?.districts.map(d => d.id);
    }
    return newUserDetails.districts;
  }, [
    edit,
    isLessor,
    advert?.flat.district,
    currentUser?.profile?.districts,
    newUserDetails.districts,
  ]);

  const savedCityId = useMemo(() => {
    if (edit) {
      return isLessor ? advert?.flat.city : currentUser?.profile.city.id;
    }
    return newUserDetails.city;
  }, [
    edit,
    isLessor,
    advert?.flat.city,
    currentUser?.profile.city,
    newUserDetails.city,
  ]);

  console.log('currentUser', currentUser);

  useEffect(() => {
    if (savedCityId) {
      const matchedCity = cities.find(c => c.id === savedCityId);

      if (matchedCity) {
        setCity(`${matchedCity.flag} ${capitalize(matchedCity.name)}`);
        setSelectedCityId(matchedCity.id);
        setDistricts(matchedCity.districts);
        setSelectedDistrictIds(savedDistrictIds);
        setIsAllDistricts(
          savedDistrictIds.length === matchedCity.districts.length,
        );
      }
    }

    if (edit && advert && advert.flat.city) {
      const matchedCity = cities.find(c => c.name === advert.flat.city);

      const matchedDistricts = matchedCity?.districts
        .filter(d => advert.flat.district.includes(d.name))
        .map(d => d.id);
      console.log('matchedCity', matchedCity);
      console.log('matchedDistricts', matchedDistricts);
      if (matchedCity) {
        setCity(`${matchedCity.flag} ${capitalize(matchedCity.name)}`);
        setSelectedCityId(matchedCity.id);
        setDistricts(matchedCity.districts);
        setSelectedDistrictIds(matchedDistricts ?? []);
        setIsAllDistricts(
          matchedDistricts?.length === matchedCity.districts.length,
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log('Cities', cities);

  const {showPopover, triggerPopover, setShowPopover, hasShownPopover} =
    useManualPopoverTrigger(PopoverKeys.City);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (districts.length >= 1 && city !== '') {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [districts, city, fadeAnim]);

  const selectAllDistrictsTags = () => {
    if (isAllDistricts) {
      setSelectedDistrictIds([]);
    } else {
      setSelectedDistrictIds(districts.map(dist => dist.id));
    }

    setIsAllDistricts(!isAllDistricts);
  };

  const handleOnChangeSearch = (input: string) => {
    setCity(input);
    setIsQuery(true);
    if (input) {
      const filteredCities = cities.filter(c =>
        c.name.toLowerCase().startsWith(input.toLowerCase()),
      );
      setDropdownContent(
        filteredCities.length > 0
          ? filteredCities
          : [{name: 'No results found', flag: ''}],
      );
    } else {
      setDropdownContent([]);
      setDistricts([]);
    }
  };

  const selectFn = (id: number) => {
    let updatedDistricts: number[] = [];
    if (isNewUserLessor || isLessor) {
      updatedDistricts = selectedDistrictIds.includes(id) ? [] : [id];
    } else {
      updatedDistricts = selectedDistrictIds.includes(id)
        ? selectedDistrictIds.filter(distId => distId !== id)
        : [...selectedDistrictIds, id];
    }
    setSelectedDistrictIds(updatedDistricts);
    setIsAllDistricts(updatedDistricts.length === districts.length);
    setError('');
  };

  const formattedDropDownContent = (citiesArr: CityAssets[]) =>
    citiesArr.map(cityData => `${cityData.flag} ${capitalize(cityData.name)} `);

  const handleDropDownPress = (value: string) => {
    const matchedCity = cities.find(
      c => c.name.toLowerCase() === value.split(' ')[1].toLowerCase(),
    );
    if (matchedCity) {
      setCity(value);
      setSelectedCityId(matchedCity.id);
      setDistricts(matchedCity.districts);
      setIsQuery(false);
      setIsAllDistricts(false);
    }
  };

  const handleClearSearch = () => {
    setCity('');
    setDistricts([]);
    setDropdownContent([]);
    setError('');
  };

  const handleBackButton = () => {
    if (
      !hasShownPopover &&
      (!isEqualValue(savedDistrictIds, selectedDistrictIds) ||
        !isEqualValue(savedCityId, selectedCityId))
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
    setError('');
    setShowPopover(false);
  };

  const handleContinue = async () => {
    const selectedCity = cities.find(c => c.id === selectedCityId);
    const selectedDistricts = districts.filter(d =>
      selectedDistrictIds.includes(d.id),
    );

    const result = cityDistrictsSchema.safeParse({
      city: selectedCity,
      districts: selectedDistricts,
    });

    if (!result.success) {
      const cityError = result.error?.flatten().fieldErrors.city?.[0];
      const districtError = result.error?.flatten().fieldErrors.districts?.[0];
      if (cityError) {
        setError(cityError);
      } else if (districtError) {
        setError(districtError);
      }
      return;
    }
    setNewUserDetails({
      city: selectedCityId,
      districts: selectedDistrictIds,
    });

    if (!edit) {
      navigation.navigate(
        isNewUserLessor || isLessor
          ? newUserScreens.lessor[currentScreen + 1]
          : newUserScreens.tenant[currentScreen + 1],
      );
      setCurrentScreen(currentScreen + 1);
      setError('');
      return;
    }

    if (isLessor) {
      navigation.navigate('NewUserNavigator', {
        screen: 'WhereIsFlatScreen',
        params: {edit: true, advertId},
      });
    }

    try {
      const editParams: EditUserProfileParams<'tenant' | 'lessor'> = {
        userId: currentUser?.id ?? 0,
        actionMethod: EditActionMethods.searchPreferences,
        userType: isLessor ? UserType.lessor : UserType.tenant,
        city: selectedCityId,
        districts: selectedDistrictIds,
      };
      await editUserProfile(editParams).unwrap();
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

    navigation.goBack();
    resetNewUserState();
    setError('');
  };
  return {
    city,
    districts,
    selectedDistrictIds,
    selectFn,
    isQuery,
    dropdownContent,
    handleOnChangeSearch,
    handleClearSearch,
    formattedDropDownContent,
    handleDropDownPress,
    fadeAnim,
    isAllDistricts,
    selectAllDistrictsTags,
    error,
    handleContinue,
    handleBackButton,
    isAdvertLoading,
    isAdvertError,
    isEditLoading,
    isEditError,
    isLessor,
    isNewUserLessor,
    showPopover,
    setShowPopover,
  };
};
