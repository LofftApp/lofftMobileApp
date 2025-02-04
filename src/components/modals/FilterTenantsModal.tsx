import Divider from 'components/bars/Divider';
import BackButton from 'components/buttons/BackButton';
import {CoreButton} from 'components/buttons/CoreButton';
import CustomSwitch from 'components/buttons/CustomSwitch';
import SelectionButton from 'components/buttons/SelectionButton';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';

import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {fontStyles} from 'styleSheets/fontStyles';

interface Characteristic {
  id: number;
  emoji: string;
  name: string;
  createdAt: string;
}

interface filterParams {
  moreThanEighty: boolean;
  moveNow: boolean;
  setSpeakMyLanguages: boolean;
  characteristics: number[];
}

type FilterTenantsModal = {
  openFilterModal: boolean;
  setFilter: Dispatch<SetStateAction<boolean>>;
  characteristics: Characteristic[];
  isError: boolean;
  isLoading: boolean;
  setFilterParams: filterParams;
};

const FilterTenantsModal = ({
  openFilterModal,
  setFilter,
  characteristics,
  isError,
  isLoading,
  setFilterParams,
}: FilterTenantsModal) => {
  const toggleModal = () => {
    setFilter(!openFilterModal);
  };

  const [moreThanEighty, setMoreThanEighty] = useState(false);
  const [moveNow, setMoveNow] = useState(false);
  const [speakMyLanguages, setSpeakMyLanguages] = useState(false);

  const [selectedCharsIds, setSelectedCharsIds] = useState<number[]>([]);

  const handleEightyMatchSwitch = () => {
    setMoreThanEighty(!moreThanEighty);
  };

  const handleMoveNow = () => {
    setMoveNow(!moveNow);
  };

  const handleLanguages = () => {
    setSpeakMyLanguages(!speakMyLanguages);
  };

  const handleSelectChars = (id: number) => {
    setSelectedCharsIds(prevIds =>
      prevIds.includes(id)
        ? prevIds.filter(featId => featId !== id)
        : [...prevIds, id],
    );
  };

  const handleSearch = async () => {
    setFilterParams(prev => ({
      ...prev,
      moreThanEighty,
      moveNow,
      speakMyLanguages,
      characteristics: selectedCharsIds,
    }));
  };

  characteristics.map(characteristic => console.log(characteristic));

  const allCharacteristicsButtons = characteristics.map(characteristic => (
    <SelectionButton
      key={characteristic.id}
      id={characteristic.id}
      value={characteristic.name}
      emojiIcon={characteristic.emoji}
      toggle={selectedCharsIds.includes(characteristic.id)}
      selectFn={handleSelectChars}
    />
  ));

  return (
    <Modal visible={openFilterModal} animationType="fade">
      <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
        <BackButton title="Filters" onPress={toggleModal} />
        <View style={CoreStyleSheet.screenContainer}>
          <Text style={fontStyles.headerSmall}>Quick filters</Text>
          <View style={styles.justifyContentWrap}>
            <Text style={fontStyles.bodyExtraSmall}>
              Applicants must match 80%+
            </Text>
            <CustomSwitch
              value={moreThanEighty}
              onValueChange={handleEightyMatchSwitch}
            />
          </View>
          <View style={styles.justifyContentWrap}>
            <Text style={fontStyles.bodyExtraSmall}>
              Applicants must be move-in ready
            </Text>
            <CustomSwitch value={moveNow} onValueChange={handleMoveNow} />
          </View>
          <View style={styles.justifyContentWrap}>
            <Text style={fontStyles.bodyExtraSmall}>Speak my languages</Text>
            <CustomSwitch
              value={speakMyLanguages}
              onValueChange={handleLanguages}
            />
          </View>
          <Text style={fontStyles.headerSmall}>Lifestyle & personality</Text>
          <View style={styles.lowerPageHalfContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.featuresContainer}>
                {isError ? (
                  <Text style={fontStyles.headerSmall}>
                    Error fetching features. Please try again.
                  </Text>
                ) : (
                  allCharacteristicsButtons
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
              // onPress={handleClearAll}
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
              // disabled={isLoading || !isPriceValid(minPrice, maxPrice)}
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
  justifyContentWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: size(5),
    marginTop: size(10),
  },
  lowerPageHalfContainer: {
    flex: 1,
    height: '100%',
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

export default FilterTenantsModal;
