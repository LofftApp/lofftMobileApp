import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// hooks  🪝
import {useWhereIsFlatScreen} from './useWhereIsFlatScreen';

// Components 🪢
import DropdownInput from 'components/coreComponents/inputField/DropdownInput';
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
import NewUserScreensPopover from 'components/modals/NewUserScreensPopover';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';

//Assets
import {RegistrationBackground} from 'assets';

// Styles 🖼️
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

// Helpers 🤝
import {size} from 'react-native-responsive-sizes';

// Types 🏷 ️
import {Currency} from 'reduxFeatures/assets/types';
import OpacityOverlay from 'components/modals/OpacityOverlay';
import CurrencyInput from 'components/coreComponents/inputField/inputs/CurrencyInput';

const currencies: Currency[] = ['eur', 'gbp', 'usd'];

const WhereIsFlatScreen = ({
  route,
}: {
  route?: {params: {edit: boolean; advertId: number; newValue?: boolean}};
}) => {
  const edit = route?.params?.edit;
  const advertId = route?.params?.advertId;
  const newValue = route?.params?.newValue;

  // Safe Area
  const insets = useSafeAreaInsets();

  const {
    fadeInAnim,
    isSearching,
    location,
    errorAddress,
    errorSearch,
    errorPrice,
    addresses,
    isLoading,
    isLoadingAdvert,
    price,
    currency,
    warmRent,
    isReady,
    isErrorAdvert,
    isEditAdvertLoading,
    isEditAdvertError,
    isEditFlatError,
    isEditFlatLoading,
    handleOnChangeSearch,
    handleDropdownPress,
    handleClearSearch,
    handleOnChangePrice,
    handleSelectCurrency,
    handleToggleWarmRent,
    handleContinue,
    handleBackButton,
    showPopover,
    setShowPopover,
  } = useWhereIsFlatScreen(edit, advertId, newValue);

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
    <>
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
                <DropdownInput
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
              {(errorAddress || isEditFlatError) && (
                <ErrorMessage isInputField message={errorAddress} />
              )}

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
                    <CurrencyInput
                      value={price}
                      onChangeText={handleOnChangePrice}
                      keyboardType="numeric"
                      style={styles.inputContainer}
                      currency={currency}
                    />

                    {(errorPrice || isEditAdvertError) && (
                      <ErrorMessage isInputField message={errorPrice} />
                    )}

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
                      <Text
                        style={[fontStyles.bodyMedium, styles.warmRentText]}>
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
              value={
                edit ? (
                  isEditAdvertLoading || isEditFlatLoading ? (
                    <LoadingButtonIcon />
                  ) : (
                    'Save'
                  )
                ) : (
                  'Continue'
                )
              }
              disabled={
                !location || !price || isEditAdvertLoading || isEditFlatLoading
              }
              onPress={handleContinue}
            />
          </View>
        </View>
        <NewUserScreensPopover
          showPopover={showPopover}
          setShowPopover={setShowPopover}
        />
      </View>

      <OpacityOverlay loadingState={isEditAdvertLoading || isEditFlatLoading} />
    </>
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
