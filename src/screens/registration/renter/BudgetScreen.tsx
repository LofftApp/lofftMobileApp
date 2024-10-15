import React, {useState} from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';

// Screens 📺
import ScreenBackButton from 'components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import CustomSwitch from 'components/coreComponents/interactiveElements/CustomSwitch';
import FooterNavBarWithPagination from 'components/bars/FooterNavBarWithPagination';
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Helpers 🤝
import {navigationHelper} from 'helpers/navigationHelper';
import {useNavigation} from '@react-navigation/native';
import {size} from 'react-native-responsive-sizes';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import BackButton from 'components/buttons/BackButton';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {RegistrationBackground} from 'assets';
import {onlyNumber} from 'helpers/onlyNumber';
import {fontStyles} from 'styleSheets/fontStyles';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import Divider from 'components/bars/Divider';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import {newUserScreens} from 'components/componentData/newUserScreens';
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';
export const initialMinPrice = '100';
export const initialMaxPrice = '5000';

const BudgetScreen = () => {
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [, setMinFocus] = useState(false);
  const [, setMaxFocus] = useState(false);
  const [warmRent, setWarmRent] = useState(false);
  const [error, setError] = useState<string | undefined>('');

  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen(0);

  const handleMin = (num: string | number) => {
    setMinPrice(num.toString());
    handleMinFocus();
  };

  const handleMax = (num: string | number) => {
    setMaxPrice(num.toString());
    handleMaxFocus();
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
    navigation.navigate(newUserScreens.renter[6]);
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
          headlineText={`What is your ${'\n'}budget?`}
          subDescription={'Define the range for your monthly rental budget'}
        />

        <View style={styles.priceRangeContainer}>
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
        </View>
        <View style={styles.switchContainer}>
          <Text style={fontStyles.bodySmall}>Warm Rent</Text>
          <CustomSwitch value={warmRent} onValueChange={handleSwitch} />
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Divider />
        {error && <ErrorMessage message={error} />}
        <NewUserPaginationBar />
        <NewUserJourneyContinueButton
          value="Continue"
          disabled={+minPrice > +maxPrice}
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
