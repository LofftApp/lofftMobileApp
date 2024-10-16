import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

// Screen 📺
import ScreenBackButton from 'components/coreComponents/ScreenTemplates/ScreenBackButton';

// APIs
import {findAddress} from 'api/mapbox/findAddress';

// Components 🪢
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';
import CustomSwitch from 'components/coreComponents/interactiveElements/CustomSwitch';
import FooterNavBarWithPagination from 'components/bars/FooterNavBarWithPagination';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';

// Helpers 🤝
import {navigationHelper} from 'helpers/navigationHelper';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import BackButton from 'components/buttons/BackButton';
import {RegistrationBackground} from 'assets';
import HeadlineContainer from 'components/containers/HeadlineContainer';
import {size} from 'react-native-responsive-sizes';
import Divider from 'components/bars/Divider';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';

const WhereIsFlatScreen = ({navigation}: any) => {
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [adressesDropdown, setAdressesDropDown] = useState<string[]>([]);
  const [warmRent, setWarmRent] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState([]);
  const [addressDetails, setAddressDetails] = useState({
    address: '',
    district: '',
  });
  const [error, setError] = useState('');
  console.log(adressesDropdown, 'adressesDropdown');
  console.log('addressDetails', addressDetails);
  console.log('query', query);
  console.log('location', location);

  const handleBackButton = () => {
    navigation.goBack();
  };
  useEffect(() => {
    if (!location) {
      setIsSearching(false);
    }
  }, [location]);

  const handleOnChangeSearch = async (searchTerm: string) => {
    setIsSearching(true);
    setLocation(searchTerm);
    const address = await findAddress(searchTerm);
    setQuery(address);
    const addresslist = address.map((data: any) => {
      return data.address;
    });
    setAdressesDropDown(addresslist);
  };

  const handleOnChangePrice = (value: string) => {
    setPrice(value);
  };

  const handleDropdownPress = (value: string) => {
    const addressIndex = adressesDropdown.indexOf(value);
    setLocation(value);
    setAddressDetails(query[addressIndex]);
    setIsSearching(false);
  };

  const handleClearSearch = () => {
    setLocation('');
    setIsSearching(false);
  };

  const handleToggleWarmRent = () => {
    setWarmRent(prev => !prev);
  };

  const handleContinue = () => {
    console.log('location', location);
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
              <InputFieldText
                type="search"
                placeholder="Address of the flat"
                value={location}
                onChangeText={handleOnChangeSearch}
                dropdown={isSearching}
                dropDownContent={adressesDropdown}
                dropDownPressAction={handleDropdownPress}
                onClear={handleClearSearch}
                style={styles.inputContainer}
              />
            </View>
            {!isSearching && (
              <View>
                <HeadlineContainer headlineText="How much is the monthly rent?" />
                <InputFieldText
                  value={price}
                  onChangeText={handleOnChangePrice}
                  keyboardType="numeric"
                  type="currency"
                  style={styles.inputContainer}
                />
                <View style={styles.toggleContainer}>
                  <CustomSwitch
                    value={warmRent}
                    onValueChange={handleToggleWarmRent}
                  />
                  <Text style={[fontStyles.bodyMedium, styles.warmRentText]}>
                    This is warm rent
                  </Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
        <Divider />
        <View style={styles.footerContainer}>
          {error && <ErrorMessage message={error} />}
          <NewUserPaginationBar />
          <NewUserJourneyContinueButton
            value="Continue"
            // disabled={selectedGender.length === 0}
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
  priceContainer: {},

  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  warmRentText: {
    marginLeft: 8,
  },
  footerContainer: {
    paddingTop: size(20),
    paddingBottom: size(10),
  },
});

export default WhereIsFlatScreen;
