import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Modal} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import {height, size} from 'react-native-responsive-sizes';

// Data 💿

// Screens 📺
import BackButton from 'components/buttons/BackButton';

// Components 🪢
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';
import {fontStyles} from 'styleSheets/fontStyles';
import EmojiIcon from 'components/Emojicon/EmojiIcon';
import {CoreButton} from 'components/buttons/CoreButton';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Types 🏷️
import type {SearchFilterModalProps, FeaturesState} from './types';
import {AdvertFeatures} from 'reduxFeatures/adverts/types';

const SearchFilterModal = ({
  openModal,
  setOpenModal,
  setSearchTerm,
  initialFeatures,
  isSuccess,
  isError,
  isLoading,
}: SearchFilterModalProps) => {
  const [minPrice, setMinPrice] = useState('100');
  const [maxPrice, setMaxPrice] = useState('5000');
  const [, setMinFocus] = useState(false);
  const [, setMaxFocus] = useState(false);
  const featuresWithSelected = useCallback(
    () =>
      initialFeatures.map(element => ({
        ...element,
        selected: false,
      })),
    [initialFeatures],
  );

  const [selectedFeatures, setSelectedFeatures] = useState<AdvertFeatures[]>(
    [],
  );
  console.log('selectedFeatures', selectedFeatures);
  const [featuresState, setFeaturesState] = useState<FeaturesState[]>([]);
  console.log('featuresState', featuresState);

  useEffect(() => {
    setFeaturesState(featuresWithSelected);
  }, [featuresWithSelected]);

  const handleSearch = async () => {
    const featuresIds = selectedFeatures.map(track => track.id).join(',');

    const query = {
      features: featuresIds,
      minPrice,
      maxPrice,
    };
    console.log('query', query);
    setSearchTerm(query);
    if (isSuccess) {
      setOpenModal(false);
      setFeaturesState([]);
      setSelectedFeatures([]);
    }
  };

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

  const selectedEmojis = (id: number) => {
    const updatedFeatures = featuresState.map(element => {
      if (element.id === id) {
        return {
          ...element,
          selected: !element.selected,
        };
      } else {
        return element;
      }
    });

    const featuresSelected = updatedFeatures.filter(el => el.selected);

    setSelectedFeatures(featuresSelected);
    setFeaturesState(updatedFeatures);
  };

  const allFeaturesButtons = featuresState.map((emojiElement, index) => {
    return (
      <EmojiIcon
        key={index + 1}
        id={emojiElement.id}
        emojiIcon={emojiElement.emoji}
        value={emojiElement.name}
        toggle={emojiElement.selected}
        selectedEmojis={selectedEmojis}
      />
    );
  });

  const clearAll = () => {
    const clearedPreferences = featuresState.map(element => ({
      ...element,
      selected: false,
    }));
    setFeaturesState(clearedPreferences);
    setSelectedFeatures([]);
  };

  return (
    <Modal visible={openModal} animationType="fade">
      <View style={styles.mainContainer}>
        <View style={styles.filterHeight}>
          <BackButton title="Filters" onPress={() => setOpenModal(false)} />
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
        {Number(minPrice) > Number(maxPrice) && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessage}>
              The min value must not be more than the max value!
            </Text>
          </View>
        )}
        <View style={styles.sliderContainer}>
          <Slider
            thumbTintColor={Color.Lavendar[100]}
            minimumTrackTintColor={Color.Lavendar[80]}
            value={[+minPrice, +maxPrice]}
            animateTransitions={true}
            minimumValue={100}
            maximumValue={5000}
            onValueChange={value => {
              handleSlider(value);
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.emojiContainer}>{allFeaturesButtons}</View>
          </ScrollView>
        </View>
        <View style={styles.pageBreak} />
        <View style={styles.buttonsContainer}>
          <CoreButton
            value="Clear all"
            invert={true}
            disabled={isLoading}
            style={styles.clearAllButton}
            onPress={clearAll}
            textSize={fontStyles.headerExtraSmall}
          />
          {/* // event handler to send request */}
          <CoreButton
            value={
              isLoading
                ? 'Loading...'
                : isError
                ? 'Error. Try again'
                : 'See results'
            }
            disabled={isLoading}
            style={styles.seeResultButton}
            onPress={isError ? () => setOpenModal(false) : handleSearch}
            textSize={fontStyles.headerExtraSmall}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: size(65),
    height: '100%',
    paddingHorizontal: size(16),
  },
  priceRangeContainer: {
    paddingVertical: size(20),
  },
  emojiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  inputForm: {
    borderWidth: size(2),
    padding: size(15),
    borderColor: Color.Black[100],
    borderRadius: 12,
    marginTop: size(10),
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: height(20),
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
    marginTop: size(72),
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
  priceFlex: {
    flex: 1,
  },
  filterHeight: {
    flex: 1,
    maxHeight: size(66),
  },
  errorMessage: {
    color: Color.Tomato[100],
  },
  priceInputContainer: {
    marginVertical: size(10),
  },
  lowerPageHalfContainer: {
    paddingTop: size(20),
    flex: 2,
  },
  flatDetails: {
    paddingBottom: size(10),
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: size(10),
    marginBottom: size(90),
  },
  seeResultButton: {
    paddingHorizontal: size(25),
  },
  clearAllButton: {
    paddingHorizontal: size(25),
  },
  pageBreak: {
    borderBottomWidth: size(1),
    paddingVertical: size(5),
  },
});

export default SearchFilterModal;

/* borderStyle: "solid",
borderColor: "red",
borderWidth: 2,*/
