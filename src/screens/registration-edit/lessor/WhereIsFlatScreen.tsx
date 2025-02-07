import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

//Redux 🧠
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useUserType} from 'reduxFeatures/user/useUserType';
import {useGetAdvertByIdQuery} from 'reduxFeatures/adverts/advertApi';

// Screen 📺
import {newUserScreens} from 'navigationStacks/newUserScreens';

// API Hook 🪝
import {useFindAddress} from 'hooks/useFindAddress';

// Components 🪢
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';
import CustomSwitch from 'components/coreComponents/interactiveElements/CustomSwitch';
import BackButton from 'components/buttons/BackButton';
import HeadlineContainer from 'components/containers/HeadlineContainer';
import Divider from 'components/bars/Divider';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import CurrencyButton from 'components/buttons/CurrencyButton';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';

//Assets
import {RegistrationBackground} from 'assets';

// Styles 🖼️
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

//Validation 🛡️
import {addressSchema} from 'lib/zodSchema';
// Helpers 🤝
import {size} from 'react-native-responsive-sizes';

import {NewUserJourneyStackNavigation} from 'navigationStacks/types';
import {Currency} from 'reduxFeatures/assets/types';
import {useFadeInAnimation} from 'hooks/useFadeInAnimation';

const currencies: Currency[] = ['eur', 'gbp', 'usd'];

const WhereIsFlatScreen = ({
  route,
}: {
  route?: {params: {edit: boolean; advertId: number}};
}) => {
  const edit = route?.params?.edit;
  const advertId = route?.params?.advertId;
  // Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();
  // Safe Area
  const insets = useSafeAreaInsets();
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
  const {newUserDetails, setNewUserDetails} = useNewUserDetails(isLessor, edit);
  const {
    data: advert,
    isLoading: isLoadingAdvert,
    isError: isErrorAdvert,
  } = useGetAdvertByIdQuery(advertId ?? 0, {
    skip: !edit,
    refetchOnMountOrArgChange: true,
  });
  const savedAddress =
    newUserDetails.userType === 'lessor' ? newUserDetails.address : undefined;
  const savedPrice =
    newUserDetails.userType === 'lessor' ? newUserDetails.price : undefined;
  const savedWarmRent =
    newUserDetails.userType === 'lessor' ? newUserDetails.warmRent : undefined;
  const savedCurrency =
    newUserDetails.userType === 'lessor' ? newUserDetails.currency : undefined;
  console.log('savedAddress', savedAddress);

  useEffect(() => {
    if (savedAddress) {
      setLocation(savedAddress.address);
      setAddressDetails({
        address: savedAddress.address,
        district: savedAddress.district,
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

    if (edit && advert?.flat.address) {
      setLocation(advert?.flat.address);
      setAddressDetails({
        address: advert?.flat.address,
        district: advert?.flat.district,
      });
    }

    if (edit && advert?.monthlyRent) {
      setPrice(advert?.monthlyRent.toString());
    }

    if (edit && advert?.currency) {
      setCurrency('eur');
    }

    if (edit && advert?.warmRent) {
      setWarmRent(advert?.warmRent);
    }
  }, [
    savedAddress,
    savedPrice,
    savedWarmRent,
    savedCurrency,
    advert,
    edit,
    advert?.flat.address,
    advert?.flat.district,
    advert?.monthlyRent,
    advert?.currency,
    advert?.warmRent,
  ]);

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

  const handleBackButton = () => {
    if (!edit) {
      setCurrentScreen(currentScreen - 1);
    }
    navigation.goBack();
    setErrorAddress('');
    setErrorPrice('');
    setErrorSearch('');
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

  const handleContinue = () => {
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

    if (edit) {
      navigation.goBack();
      navigation.goBack();
    } else {
      setCurrentScreen(currentScreen + 1);

      navigation.navigate(newUserScreens.lessor[currentScreen + 1]);
    }

    setErrorAddress('');
    setErrorPrice('');
    setErrorSearch('');
  };
  if (isLoadingAdvert || !isReady) {
    return <LoadingComponent />;
  }

  if (isErrorAdvert) {
    return (
      <NotFoundComponent
        message="We couldn't retrieve the advert details"
        backButton
        onPress={handleBackButton}
      />
    );
  }

  return (
    <View
      style={[
        CoreStyleSheet.safeAreaViewShowContainer,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}>
      <BackButton onPress={handleBackButton} />
      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />
      <View style={[CoreStyleSheet.screenContainer]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            <HeadlineContainer headlineText={'Where is your flat?'} />
            <Animated.View
              style={{
                opacity: fadeInAnim,
              }}>
              <InputFieldText
                type="search"
                placeholder="Address of the flat"
                value={location}
                onChangeText={handleOnChangeSearch}
                dropdown={isSearching}
                dropDownContent={addresses}
                dropDownPressAction={handleDropdownPress}
                onClear={handleClearSearch}
                style={styles.inputContainer}
              />
            </Animated.View>
            <ErrorMessage isInputField message={errorAddress} />

            <ErrorMessage message={errorSearch || ''} />

            {isLoading && isSearching && (
              <ActivityIndicator
                size="large"
                color={Color.Lavendar[100]}
                style={styles.loading}
              />
            )}

            {!isSearching && (
              <View>
                <HeadlineContainer headlineText="How much is the monthly rent?" />
                <Animated.View
                  style={{
                    opacity: fadeInAnim,
                  }}>
                  <InputFieldText
                    value={price}
                    onChangeText={handleOnChangePrice}
                    keyboardType="numeric"
                    type="currency"
                    style={styles.inputContainer}
                    currency={currency}
                  />

                  <ErrorMessage isInputField message={errorPrice} />

                  <View style={styles.currencyContainer}>
                    {currencies.map((cur, index) => (
                      <CurrencyButton
                        key={currency + index}
                        currency={cur as Currency}
                        toggle={currency === cur}
                        selectFn={handleSelectCurrency}
                      />
                    ))}
                  </View>
                  <View style={styles.toggleContainer}>
                    <CustomSwitch
                      value={warmRent}
                      onValueChange={handleToggleWarmRent}
                    />
                    <Text style={[fontStyles.bodyMedium, styles.warmRentText]}>
                      This is warm rent
                    </Text>
                  </View>
                </Animated.View>
              </View>
            )}
          </View>
        </ScrollView>
        <Divider />
        <View style={styles.footerContainer}>
          {!edit && <NewUserPaginationBar />}

          <NewUserJourneyContinueButton
            value={edit ? 'Save' : 'Continue'}
            disabled={!location || !price}
            onPress={handleContinue}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  inputContainer: {
    marginTop: size(10),
  },

  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: size(10),
  },
  loading: {
    marginTop: size(50),
  },
  warmRentText: {
    marginLeft: size(8),
  },
  currencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: size(10),
  },
  footerContainer: {
    paddingTop: size(20),
  },
});

export default WhereIsFlatScreen;
