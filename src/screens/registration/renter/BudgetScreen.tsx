import React, {useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet, SafeAreaView, Animated} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import {useNavigation} from '@react-navigation/native';

//Redux 📦
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';

// Screens 📺
import {newUserScreens} from 'components/componentData/newUserScreens';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import CustomSwitch from 'components/coreComponents/interactiveElements/CustomSwitch';
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';
import BackButton from 'components/buttons/BackButton';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import Divider from 'components/bars/Divider';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';

//Assets 🎨
import {RegistrationBackground} from 'assets';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {fontStyles} from 'styleSheets/fontStyles';

//Validation 🛡️
import {budgetSchema} from 'lib/zodSchema';

// Helpers 🤝
import {size} from 'react-native-responsive-sizes';
import {isPriceValid} from 'helpers/isPriceValid';
import {onlyNumber} from 'helpers/onlyNumber';

//Constants 📊
import {
  initialMaxPrice,
  initialMinPrice,
} from 'components/componentData/constants';

//Types 🏷️
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';

const BudgetScreen = () => {
  //Navigatiom
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  // Local State
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [, setMinFocus] = useState(false);
  const [, setMaxFocus] = useState(false);
  const [warmRent, setWarmRent] = useState(false);
  const [error, setError] = useState<string | undefined>('');

  //Redux
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {newUserDetails, setNewUserDetails} = useNewUserDetails();
  const savedBudget =
    newUserDetails.userType === 'renter' ? newUserDetails.budget : undefined;

  useEffect(() => {
    if (
      savedBudget?.maxPrice &&
      savedBudget?.minPrice &&
      savedBudget?.warmRent
    ) {
      setMinPrice(String(savedBudget?.minPrice));
      setMaxPrice(String(savedBudget?.maxPrice));
      setWarmRent(savedBudget?.warmRent);
    }
  }, [savedBudget?.minPrice, savedBudget?.maxPrice, savedBudget?.warmRent]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleMin = (num: string | number) => {
    if (+num <= +initialMaxPrice) {
      setMinPrice(num.toString());
      handleMinFocus();
    }
  };

  const handleMax = (num: string | number) => {
    if (+num >= +initialMinPrice && +num <= +initialMaxPrice) {
      setMaxPrice(num.toString());
      handleMaxFocus();
    }
  };

  const handleMinFocus = () => {
    if (+minPrice > 0) {
      setMinFocus(true);
    } else {
      setMinFocus(false);
    }
  };

  const handleMaxFocus = () => {
    if (+minPrice > 0) {
      setMaxFocus(true);
    } else {
      setMaxFocus(false);
    }
  };

  const handleSlider = (array: number[] | string[]) => {
    handleMin(array[0]);
    handleMax(array[1]);
  };

  const handleSwitch = () => {
    setWarmRent(prev => !prev);
  };
  const handleBackButton = () => {
    setCurrentScreen(currentScreen - 1);
    navigation.goBack();
    setError('');
  };

  const handleContinue = () => {
    const result = budgetSchema.safeParse({
      minPrice: +minPrice,
      maxPrice: +maxPrice,
      warmRent,
    });
    if (!result.success) {
      const maxPriceError = result.error?.flatten().fieldErrors?.maxPrice?.[0];
      const minPriceError = result.error?.flatten().fieldErrors?.minPrice?.[0];
      if (minPriceError) {
        setError(minPriceError);
      } else if (maxPriceError) {
        setError(maxPriceError);
      }
      return;
    }

    setNewUserDetails({budget: result.data});

    navigation.navigate(newUserScreens.renter[currentScreen + 1]);
    setCurrentScreen(currentScreen + 1);
    setError('');
  };

  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
      <BackButton onPress={handleBackButton} />
      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />
      <View style={CoreStyleSheet.screenContainer}>
        <HeadlineContainer
          headlineText={'What is your budget?'}
          subDescription={'Define the range for your monthly rental budget'}
        />

        <Animated.View
          style={[styles.priceRangeContainer, {opacity: fadeAnim}]}>
          <View style={styles.inputContainer}>
            <View style={styles.formContainer}>
              <Text style={fontStyles.bodyExtraSmall}>Min. price</Text>
              <InputFieldText
                style={styles.priceInputContainer}
                placeholder="0"
                value={String(onlyNumber(minPrice))}
                type="currency"
                onChangeText={handleMin}
              />
            </View>

            <View style={styles.formContainer}>
              <Text style={fontStyles.bodyExtraSmall}>Max. price</Text>
              <InputFieldText
                style={styles.priceInputContainer}
                placeholder="5000"
                value={String(onlyNumber(maxPrice))}
                type="currency"
                onChangeText={handleMax}
              />
            </View>
          </View>

          <View style={styles.sliderContainer}>
            {+minPrice > +maxPrice && (
              <ErrorMessage
                fontSize={fontStyles.bodyExtraSmall}
                message="The min value must not be more than the max value!"
              />
            )}
            <Slider
              thumbTintColor={Color.Lavendar[100]}
              minimumTrackTintColor={Color.Lavendar[80]}
              value={[onlyNumber(minPrice), onlyNumber(maxPrice)]}
              animateTransitions={true}
              minimumValue={100}
              maximumValue={5000}
              onValueChange={value => {
                handleSlider(value);
              }}
              step={100}
            />
          </View>

          <View style={styles.sliderLegend}>
            <Text style={fontStyles.bodyExtraSmall}>
              {onlyNumber(minPrice)} €
            </Text>
            <Text style={fontStyles.bodyExtraSmall}>
              {onlyNumber(maxPrice)} €
            </Text>
          </View>
        </Animated.View>
        <Animated.View style={[styles.switchContainer, {opacity: fadeAnim}]}>
          <Text style={fontStyles.bodySmall}>Warm Rent</Text>
          <CustomSwitch value={warmRent} onValueChange={handleSwitch} />
        </Animated.View>
      </View>
      <View style={styles.footerContainer}>
        <Divider />
        {error && <ErrorMessage message={error} />}
        <NewUserPaginationBar />
        <NewUserJourneyContinueButton
          value="Continue"
          disabled={!isPriceValid(minPrice, maxPrice)}
          onPress={handleContinue}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  priceRangeContainer: {
    paddingVertical: size(20),
    paddingHorizontal: size(10),
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: size(60),
  },
  priceInputContainer: {
    marginVertical: size(10),
  },
  formContainer: {
    width: '48%',
  },
  sliderLegend: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderContainer: {
    marginTop: size(30),
  },

  switchContainer: {
    marginTop: size(15),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: size(16),
    paddingHorizontal: size(10),
  },

  footerContainer: {
    paddingTop: size(20),
    paddingBottom: size(20),
    paddingHorizontal: size(16),
    gap: size(10),
  },
});

export default BudgetScreen;
