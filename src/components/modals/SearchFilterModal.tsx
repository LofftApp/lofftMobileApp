import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  SafeAreaView,
} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';

// Screens 📺
import BackButton from 'components/buttons/BackButton';

// Components 🪢
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';
import {fontStyles} from 'styleSheets/fontStyles';
import SelectionButton from 'components/buttons/SelectionButton';
import {CoreButton} from 'components/buttons/CoreButton';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import Divider from 'components/bars/Divider';

//Helpers
import {size} from 'react-native-responsive-sizes';
import {isPriceValid} from 'helpers/isPriceValid';
import {onlyNumber} from 'helpers/onlyNumber';

//Constants
import {
  initialMaxPrice,
  initialMinPrice,
} from 'components/componentData/constants';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

// Types 🏷️
import type {SearchFilterModalProps} from './types';
import {GetAdvertsParams} from 'reduxFeatures/adverts/types';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';

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

  const [selectedFeaturesIds, setSelectedFeaturesIds] = useState<number[]>([]);

  const handleSearch = async () => {
    if (
      !selectedFeaturesIds.length &&
      minPrice === initialMinPrice &&
      maxPrice === initialMaxPrice
    ) {
      toggleModal();
      return;
    }

    const query: GetAdvertsParams = {
      features: selectedFeaturesIds.join(','),
      minPrice,
      maxPrice,
    };

    setSearchTerm(query);
    if (isSuccess) {
      toggleModal();
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

  const handleSelectFeatures = (id: number) => {
    setSelectedFeaturesIds(prevIds =>
      prevIds.includes(id)
        ? prevIds.filter(featId => featId !== id)
        : [...prevIds, id],
    );
  };

  const allFeaturesButtons = initialFeatures.map(feature => {
    return (
      <SelectionButton
        key={feature.id}
        id={feature.id}
        emojiIcon={feature.emoji}
        value={feature.name}
        toggle={selectedFeaturesIds.includes(feature.id)}
        selectFn={handleSelectFeatures}
      />
    );
  });

  const handleClearAll = () => {
    setMinPrice(initialMinPrice);
    setMaxPrice(initialMaxPrice);
    setSelectedFeaturesIds([]);
    setSearchTerm(undefined);
  };

  return (
    <Modal visible={openModal} animationType="fade">
      <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
        <BackButton title="Filters" onPress={toggleModal} />
        <View style={CoreStyleSheet.screenContainer}>
          <Text style={fontStyles.headerSmall}>Price Range</Text>
          <View style={styles.priceRangeContainer}>
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
          <View style={styles.lowerPageHalfContainer}>
            <View style={styles.flatDetails}>
              <Text style={fontStyles.headerSmall}>Flat details</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.featuresContainer}>
                {isError ? (
                  <Text style={fontStyles.headerSmall}>
                    Error fetching features. Please try again.
                  </Text>
                ) : (
                  allFeaturesButtons
                )}
              </View>
            </ScrollView>
          </View>
          <Divider />
          <View style={styles.buttonsContainer}>
            <CoreButton
              value="Clear all"
              invert={true}
              disabled={isLoading}
              style={styles.clearAllButton}
              onPress={handleClearAll}
              textSize={fontStyles.headerExtraSmall}
            />
            <CoreButton
              value={
                isLoading ? (
                  <LoadingButtonIcon />
                ) : isError ? (
                  'Try again'
                ) : (
                  'See results'
                )
              }
              disabled={isLoading || !isPriceValid(minPrice, maxPrice)}
              style={styles.seeResultButton}
              onPress={isError ? toggleModal : handleSearch}
              textSize={fontStyles.headerExtraSmall}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  priceRangeContainer: {
    paddingVertical: size(20),
    paddingHorizontal: size(10),
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: size(5),
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: size(60),
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

  priceInputContainer: {
    marginVertical: size(10),
  },
  lowerPageHalfContainer: {
    flex: 1,
    height: '100%',
  },
  flatDetails: {
    paddingBottom: size(10),
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: size(16),
    alignItems: 'center',
  },
  seeResultButton: {
    width: '40%',
  },
  clearAllButton: {
    width: '40%',
  },

});

export default SearchFilterModal;
