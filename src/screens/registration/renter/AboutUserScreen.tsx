import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//Redux 📦
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';

// Components 🪢
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import HeadlineContainer from 'components/containers/HeadlineContainer';
import SelectionButton from 'components/buttons/SelectionButton';
import Divider from 'components/bars/Divider';
import BackButton from 'components/buttons/BackButton';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';

// StylesSheet 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {RegistrationBackground} from 'assets';

// Data 💿
import userPreferences from 'components/componentData/userPreferences.json';
import {newUserScreens} from 'components/componentData/newUserScreens';

// Helper 🤝
import {size} from 'react-native-responsive-sizes';

// Types 🏷 ️
import {NewUserJourneyStackNavigation} from '../../../navigationStacks/types';
interface SelectedTracks {
  id: number;
  value: string;
  emoji: string;
  toggle: boolean;
}

const MAX_SELECTED_CHARS = 10;
const MIN_SELECTED_CHARS = 3;

const AboutUserScreen = () => {
  const navigation = useNavigation<NewUserJourneyStackNavigation>();
  const characteristics = userPreferences;

  const [charsState, setCharsState] = useState(characteristics);
  const [selectedChars, setSelectedChars] = useState<SelectedTracks[]>([]);

  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {newUserDetails, setNewUserDetails, isLessor} = useNewUserDetails();
  const savedChars = newUserDetails.characteristics;
  useEffect(() => {
    if (savedChars && savedChars.length > 0) {
      setSelectedChars(savedChars);

      const updatedCharsState = characteristics.map(char => ({
        ...char,
        toggle: savedChars.some(savedChar => savedChar.id === char.id),
      }));

      setCharsState(updatedCharsState);
    } else {
      setSelectedChars([]);
    }
  }, [savedChars, characteristics]);

  const handleBackButton = () => {
    const previousScreen = currentScreen - 1;
    navigation.goBack();
    setCurrentScreen(previousScreen);
  };

  const handleContinue = () => {
    const screen = isLessor
      ? newUserScreens.lessor[5]
      : newUserScreens.renter[3];
    navigation.navigate(screen);
  };

  const selectChar = (id: number) => {
    const updatedChars = charsState.map(element => {
      if (element.id === id) {
        return {
          ...element,
          toggle: !element.toggle,
        };
      } else {
        return element;
      }
    });

    const charsSelected = updatedChars.filter(el => el.toggle);

    setSelectedChars(charsSelected);
    setCharsState(updatedChars);
    setNewUserDetails({characteristics: charsSelected});
  };

  const charsButtons = charsState.map(char => {
    const {value, emoji, id, toggle} = char;
    return (
      <SelectionButton
        key={id}
        id={id}
        emojiIcon={emoji}
        value={value}
        toggle={toggle}
        selectFn={selectChar}
        disabled={selectedChars.length === MAX_SELECTED_CHARS && !toggle}
      />
    );
  });

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
          headlineText="Tell us a bit about yourself"
          subDescription={`Select at least ${MIN_SELECTED_CHARS} tags that describe who you are and your lifestyles. More tags selected, more likelihood you'll find the right crowd in a Lofft!`}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.selectionContainer}>{charsButtons}</View>
        </ScrollView>
        <Divider />
        <View style={styles.footerContainer}>
          <View style={styles.tagInfoContainer}>
            <Text
              style={
                fontStyles.bodySmall
              }>{`* Select at least ${MIN_SELECTED_CHARS} tags`}</Text>
          </View>
          <NewUserPaginationBar />
          <NewUserJourneyContinueButton
            value="Continue"
            disabled={selectedChars.length < MIN_SELECTED_CHARS}
            onPress={handleContinue}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  selectionContainer: {
    marginTop: size(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: size(10),
  },
  tagInfoContainer: {
    marginBottom: size(5),
  },
  footerContainer: {
    paddingTop: size(20),
    paddingBottom: size(10),
  },
});

export default AboutUserScreen;
