import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';

// Screens 📺
import ScreenBackButton from '@Screens/ScreenBackButton';

// Components 🪢
import HeadlineContainer from '@Components/containers/HeadlineContainer';
import {CoreButton} from '@Components/buttons/CoreButton';
import PaginationBar from '@Components/bars/PaginationBar';
import CustomSwitch from '@Components/coreComponents/interactiveElements/CustomSwitch';

// StyleSheets 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
import Color from '@StyleSheets/lofftColorPallet.json';

const FinderBudgetScreen = ({navigation, route}: any) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minFocus, setMinFocus] = useState(false);
  const [maxFocus, setMaxFocus] = useState(false);
  const [priceRange, setPriceRange] = useState([]);
  const [screen, setScreen] = useState(3);
  const [warmRent, setWarmRent] = useState(false);

  const user = {
    selectedPreferences: route.params.selectedPreferences,
    gender: route.params.gender,
    selectedDistricts: route.params.selectedDistricts,
  };

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
            <TextInput
              keyboardType="default"
              style={[
                styles.inputForm,
                {
                  borderColor: minFocus
                    ? Color.Lavendar[100]
                    : Color.Black[100],
                },
              ]}
              placeholder="100 €"
              autoCapitalize="words"
              value={`${minPrice} €`}
              onChangeText={num => handleMin(num)}
            />
          </View>

          <View style={styles.formContainer}>
            <Text>Max. price</Text>
            <TextInput
              keyboardType="default"
              style={[
                styles.inputForm,
                {
                  borderColor: maxFocus
                    ? Color.Lavendar[100]
                    : Color.Black[100],
                },
              ]}
              placeholder="5000 €"
              autoCapitalize="words"
              value={`${maxPrice} €`}
              onChangeText={num => handleMax(num)}
            />
          </View>
        </View>
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
        <View style={styles.warmRentContainer}>
          <View style={styles.switchContainer}>
            <Text style={{marginRight: 12}}>Warm Rent</Text>
            <CustomSwitch
              value={warmRent}
              onValueChange={() => setWarmRent(!warmRent)}
            />
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.pagingationBarContainer}>
          <PaginationBar screen={screen} />
        </View>
        <CoreButton
          value="Continue"
          style={{
            backgroundColor: Color.Lavendar[100],
            borderWidth: 0,
            width: '100%',
          }}
          textStyle={[fontStyles.headerSmall, {color: 'white'}]}
          disabled={false}
          onPress={() => {
            navigation.navigate('FlatFeaturesScreen', {
              personalPreferences: user.selectedPreferences,
              gender: user.gender,
              districts: user.selectedDistricts,
              minRent: minPrice.toString(),
              maxRent: maxPrice.toString(),
              rentWarm: warmRent,
            });
          }}
        />
      </View>
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
  warmRentContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 40,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FinderBudgetScreen;