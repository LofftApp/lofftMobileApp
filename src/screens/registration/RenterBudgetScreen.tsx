import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';

// Screens 📺
import ScreenBackButton from '@Components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import HeadlineContainer from '@Components/containers/HeadlineContainer';
import CustomSwitch from '@Components/coreComponents/interactiveElements/CustomSwitch';
import FooterNavBarWithPagination from '@Components/bars/FooterNavBarWithPagination';
import InputFieldText from '@Components/coreComponents/inputField/InputFieldText';

// StyleSheets 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';

// Helpers 🤝
import {navigationHelper} from '@Helpers/navigationHelper';

const RenterBudgetScreen = ({navigation}: any) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minFocus, setMinFocus] = useState(false);
  const [maxFocus, setMaxFocus] = useState(false);
  const [warmRent, setWarmRent] = useState(false);

  const handleMin = (num: any) => {
    setMinPrice(num.toString());
    handleMinFocus();
  };

  const handleMax = (num: any) => {
    setMaxPrice(num.toString());
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

      <View style={{flex: 1}}>
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
          <Text style={{marginRight: 12}}>Warm Rent</Text>
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
  inputForm: {
    borderWidth: 2,
    padding: 15,
    borderColor: Color.Black[100],
    borderRadius: 12,
    marginTop: 10,
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
    marginTop: 40,
  },
  pagingationBarContainer: {
    marginVertical: 45,
  },
  buttonContainer: {
    marginBottom: 55,
  },
  switchContainer: {
    marginTop: 15,
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

export default RenterBudgetScreen;
