import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Modal} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';

// Data 💿
import flatPreferences from '@Components/componentData/flatPreferences.json';

// Screens 📺
import BackButton from '@Components/buttons/BackButton';

// Components 🪢
import InputFieldText from '@Components/coreComponents/inputField/InputFieldText';
import {fontStyles} from '@StyleSheets/fontStyles';
import EmojiIcon from '@Components/Emojicon/EmojiIcon';
import {CoreButton} from '@Components/buttons/CoreButton';

// StyleSheets 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';

const SearchFilterModal = ({openModal, pullData}: any) => {
  const [minPrice, setMinPrice] = useState(100);
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

  const preferences = flatPreferences;

  const [intitalpreferencesArray, seIintitalPreferencesArray] =
    useState(preferences);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedTrack, setselectedTrack] = useState([]);

  const selectedEmojis = (id: any) => {
    const targets = [];

    const preSeleted = intitalpreferencesArray.map(element => {
      if (element.id === id) {
        targets.push(element);
        return {
          ...element,
          toggle: !element.toggle,
        };
      } else {
        return element;
      }
    });

    const wash: any = preSeleted.filter(el => el.toggle);

    setselectedTrack(wash);
    seIintitalPreferencesArray(preSeleted);
  };

  const emojiElements = intitalpreferencesArray.map((emojiElement, index) => {
    return (
      <EmojiIcon
        key={index + 1}
        id={emojiElement.id}
        emojiIcon={emojiElement.emoji}
        value={emojiElement.value}
        toggle={emojiElement.toggle}
        selectedEmojis={selectedEmojis}
      />
    );
  });

  const clearAll = () => {
    const clearedPreferences = intitalpreferencesArray.map(element => ({
      ...element,
      toggle: false,
    }));
    seIintitalPreferencesArray(clearedPreferences);
    setselectedTrack([]);
  };

  return (
    <Modal visible={openModal} animationType="fade">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={styles.filterHeight}>
            <BackButton title="Filters" onPress={() => pullData(false)} />
          </View>
          <View>
            <Text style={fontStyles.headerSmall}>Price Range</Text>
            <View style={styles.priceRangeContainer}>
              <View style={styles.priceFlex}>
                <View style={styles.inputContainer}>
                  <View style={styles.formContainer}>
                    <Text>Min. price</Text>
                    <InputFieldText
                      style={styles.priceInputContainer}
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
                      style={styles.priceInputContainer}
                      placeholder="5000"
                      // String is passed as value into text form.
                      value={String(maxPrice)}
                      type="currency"
                      onChangeText={(num: string) => handleMax(num)}
                    />
                  </View>
                </View>
              </View>
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
          <View style={styles.lowerPageHalfContainer}>
            <View style={styles.flatDetails}>
              <Text style={fontStyles.headerSmall}>Flat details</Text>
            </View>
            <View style={styles.emojiContainer}>{emojiElements}</View>
          </View>
          <View style={styles.pageBreak} />
          <View style={styles.buttonsContainer}>
            <CoreButton
              value="Clear all"
              invert={true}
              style={styles.clearAllButton}
              onPress={clearAll}
            />
            <CoreButton value="See Results" style={styles.seeResultButton} />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 65,
    height: '100%',
    paddingHorizontal: 16,
  },
  priceRangeContainer: {
    paddingVertical: 20,
  },
  emojiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
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
    height: 20,
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
    marginTop: 72,
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
  priceFlex: {
    flex: 1,
  },
  filterHeight: {
    height: 70,
  },
  errorMessage: {
    color: Color.Tomato[100],
  },
  priceInputContainer: {
    marginVertical: 10,
  },
  lowerPageHalfContainer: {
    paddingTop: 40,
  },
  flatDetails: {
    paddingBottom: 20,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  seeResultButton: {
    paddingHorizontal: 25,
  },
  clearAllButton: {
    paddingHorizontal: 25,
  },
  pageBreak: {
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
});

export default SearchFilterModal;

/* borderStyle: "solid",
borderColor: "red",
borderWidth: 2,*/
