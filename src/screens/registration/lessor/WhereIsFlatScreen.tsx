import React, {useEffect, useRef, useState} from 'react';
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

//Redux 🧠
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';

// Screen 📺
import {newUserScreens} from 'components/componentData/newUserScreens';

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

const WhereIsFlatScreen = () => {
  // Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  // Local State
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
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
  const {newUserDetails, setNewUserDetails} = useNewUserDetails();
  const savedAddress =
    newUserDetails.userType === 'lessor' && newUserDetails.address;
  const savedPrice =
    newUserDetails.userType === 'lessor' && newUserDetails.price;
  const savedWarmRent =
    newUserDetails.userType === 'lessor' && newUserDetails.warmRent;

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
  }, [savedAddress, savedPrice, savedWarmRent]);

  useEffect(() => {
    if (!location) {
      setIsSearching(false);
    }
  }, [location]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleBackButton = () => {
    setCurrentScreen(currentScreen - 1);
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

  const handleContinue = () => {
    const result = addressSchema.safeParse({
      address: addressDetails.address,
      district: addressDetails.district,
      price: Number(price),
      warmRent,
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
    });

    setCurrentScreen(currentScreen + 1);

    navigation.navigate(newUserScreens.lessor[currentScreen + 1]);

    setErrorAddress('');
    setErrorPrice('');
    setErrorSearch('');
  };

  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
      <BackButton onPress={handleBackButton} />
      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />
      <View style={[CoreStyleSheet.screenContainer]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            <View>
              <HeadlineContainer headlineText={'Where is your flat?'} />
              <Animated.View
                style={{
                  opacity: fadeAnim,
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
              {errorAddress && !errorSearch && !isSearching && (
                <ErrorMessage isInputField message={errorAddress} />
              )}
              {errorSearch && !errorAddress && (
                <ErrorMessage message={errorSearch} />
              )}
              {isLoading && isSearching && (
                <ActivityIndicator
                  size="large"
                  color={Color.Lavendar[100]}
                  style={styles.loading}
                />
              )}
            </View>
            {!isSearching && (
              <View>
                <HeadlineContainer headlineText="How much is the monthly rent?" />
                <Animated.View
                  style={{
                    opacity: fadeAnim,
                  }}>
                  <InputFieldText
                    value={price}
                    onChangeText={handleOnChangePrice}
                    keyboardType="numeric"
                    type="currency"
                    style={styles.inputContainer}
                  />
                  {errorPrice && (
                    <ErrorMessage isInputField message={errorPrice} />
                  )}
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
          <NewUserPaginationBar />
          <NewUserJourneyContinueButton
            value="Continue"
            disabled={!location || !price}
            onPress={handleContinue}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    gap: size(100),
  },
  inputContainer: {
    marginTop: size(10),
  },

  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: size(16),
  },
  loading: {
    marginTop: size(50),
  },
  warmRentText: {
    marginLeft: size(8),
  },
  footerContainer: {
    paddingTop: size(20),
    paddingBottom: size(10),
  },
});

export default WhereIsFlatScreen;
