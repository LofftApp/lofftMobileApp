import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
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

const BudgetScreen = () => {
  const navigation = useNavigation();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [, setMinFocus] = useState(false);
  const [, setMaxFocus] = useState(false);
  const [warmRent, setWarmRent] = useState(false);

  const handleMin = (num: any) => {
    setMinPrice(num);
    handleMinFocus();
  };

  const handleMax = (num: any) => {
    setMaxPrice(num);
    handleMaxFocus();
  };

  const handleMinFocus = () => {
    if (minPrice > 0) {
      setMinFocus(true);
    } else {
      setMinFocus(false);
    }
  };

  const handleMaxFocus = () => {
    if (minPrice > 0) {
      setMaxFocus(true);
    } else {
      setMaxFocus(false);
    }
  };

  const taco = (array: any) => {
    handleMin(array[0]);
    handleMax(array[1]);
  };

  return (
    <ScreenBackButton nav={() => navigation.goBack()}>
      <HeadlineContainer
        headlineText={`What is your ${'\n'}budget?`}
        subDescription={'Define the range for your monthly rental budget'}
      />

      <View style={styles.wrapper}>
        <View style={styles.inputContainer}>
          <View style={styles.formContainer}>
            <Text>Min. price</Text>
            <InputFieldText
              placeholder="0"
              // String is passed as value into text form.
              value={String(minPrice)}
              type="currency"
              onChangeText={(num: string) => {
                handleMin(num);
              }}
            />
          </View>

          <View style={styles.formContainer}>
            <Text>Max. price</Text>
            <InputFieldText
              placeholder="5000"
              // String is passed as value into text form.
              value={String(maxPrice)}
              type="currency"
              onChangeText={(num: string) => handleMax(num)}
            />
          </View>
        </View>
        {Number(minPrice) > Number(maxPrice) ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessage}>
              The min value must not be more than the max value!
            </Text>
          </View>
        ) : null}
        <View style={styles.sliderContainer}>
          <Slider
            thumbTintColor={Color.Lavendar[100]}
            minimumTrackTintColor={Color.Lavendar[80]}
            value={[minPrice, maxPrice]}
            animateTransitions={true}
            minimumValue={100}
            maximumValue={5000}
            onValueChange={value => {
              taco(value);
            }}
            step={100}
          />
          <View style={styles.sliderLegend}>
            <Text>{minPrice} €</Text>
            <Text>{maxPrice} €</Text>
          </View>
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.buttonWarmText}>Warm Rent</Text>
          <CustomSwitch
            value={warmRent}
            onValueChange={() => setWarmRent(!warmRent)}
          />
        </View>
      </View>
      <FooterNavBarWithPagination
        onPress={(targetScreen: any) =>
          navigationHelper(navigation, targetScreen)
        }
        details={{
          minRent: minPrice.toString(),
          maxRent: maxPrice.toString(),
          warmRent,
        }}
        disabled={Number(minPrice) > Number(maxPrice)}
      />
    </ScreenBackButton>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  inputForm: {
    borderWidth: size(2),
    padding: size(15),
    borderColor: Color.Black[100],
    borderRadius: size(12),
    marginTop: size(10),
  },
  buttonWarmText: {
    marginRight: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginTop: size(40),
  },
  pagingationBarContainer: {
    marginVertical: size(45),
  },
  buttonContainer: {
    marginBottom: size(55),
  },
  switchContainer: {
    marginTop: size(15),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  errorContainer: {
    alignItems: 'flex-end',
  },
  errorMessage: {
    color: Color.Tomato[100],
  },
});

export default BudgetScreen;
