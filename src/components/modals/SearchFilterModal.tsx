import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Modal} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import {height, size} from 'react-native-responsive-sizes';

// Data 💿

// Screens 📺
import BackButton from 'components/buttons/BackButton';

// Components 🪢
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';
import {fontStyles} from 'styleSheets/fontStyles';
import SelectionButton from 'components/buttons/SelectionButton';
import {CoreButton} from 'components/buttons/CoreButton';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Types 🏷️
import type {SearchFilterModalProps, FeaturesState} from './types';
import {AdvertFeatures} from 'reduxFeatures/adverts/types';

const initialMinPrice = '100';
const initialMaxPrice = '5000';

const SearchFilterModal = ({
  openModal,
  toggleModal,
  setSearchTerm,
  initialFeatures,
  isSuccess,
  isError,
  isLoading,
}: SearchFilterModalProps) => {
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
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

  const onlyNumber = (value: string) => {
    return Number(value.replace(/\D/g, ''));
  };

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
      toggleModal();
      setFeaturesState(featuresWithSelected);
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

  const selectFeature = (id: number) => {
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

  const allFeaturesButtons = featuresState.map(feature => {
    return (
      <SelectionButton
        key={feature.id}
        id={feature.id}
        emojiIcon={feature.emoji}
        value={feature.name}
        toggle={feature.selected}
        selectFn={selectFeature}
      />
    );
  });

  const handleClearAll = () => {
    const clearedPreferences = featuresState.map(element => ({
      ...element,
      selected: false,
    }));
    setFeaturesState(clearedPreferences);
    setMinPrice(initialMinPrice);
    setMaxPrice(initialMaxPrice);
    setSelectedFeatures([]);
  };

  const isPriceValid = () => {
    const min = Number(minPrice);
    const max = Number(maxPrice);
    return min <= max && min >= 0 && max >= 0;
  };

  return (
    <Modal visible={openModal} animationType="fade">
      <View style={styles.mainContainer}>
        <View style={styles.filterHeight}>
          <BackButton title="Filters" onPress={toggleModal} />
        </View>
        <View>
          <Text style={fontStyles.headerSmall}>Price Range</Text>
          <View style={styles.priceRangeContainer}>
            <View style={styles.priceFlex}>
              <View style={styles.inputContainer}>
                <View style={styles.formContainer}>
                  <Text style={fontStyles.bodyExtraSmall}>Min. price</Text>
                  <InputFieldText
                    style={styles.priceInputContainer}
                    placeholder="0"
                    // String is passed as value into text form.
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
                    // String is passed as value into text form.
                    value={String(onlyNumber(maxPrice))}
                    type="currency"
                    onChangeText={handleMax}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.sliderContainer}>
          {+minPrice > +maxPrice && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorMessage}>
                The min value must not be more than the max value!
              </Text>
            </View>
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

          <View style={styles.sliderLegend}>
            <Text>{onlyNumber(minPrice)} €</Text>
            <Text>{onlyNumber(maxPrice)} €</Text>
          </View>
        </View>
        <View style={styles.lowerPageHalfContainer}>
          <View style={styles.flatDetails}>
            <Text style={fontStyles.headerSmall}>Flat details</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.emojiContainer}>
              {isError ? (
                <Text>Error fetching features. Please try again.</Text>
              ) : (
                allFeaturesButtons
              )}
            </View>
          </ScrollView>
        </View>
        <View style={styles.pageBreak} />
        <View style={styles.buttonsContainer}>
          <CoreButton
            value="Clear all"
            invert={true}
            disabled={isLoading}
            style={styles.clearAllButton}
            onPress={handleClearAll}
            textSize={fontStyles.headerExtraSmall}
          />
          {/* // event handler to send request */}
          <CoreButton
            value={
              isLoading ? 'Loading...' : isError ? 'Try again' : 'See results'
            }
            disabled={
              isLoading || selectedFeatures.length === 0 || !isPriceValid()
            }
            style={styles.seeResultButton}
            onPress={isError ? toggleModal : handleSearch}
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
    alignItems: 'center',
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
