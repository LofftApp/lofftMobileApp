import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';

// StylesSheet 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Assets 🎨
import {RegistrationBackground} from 'assets';

// Data 💿
import userPreferences from 'components/componentData/userPreferences.json';
import {newUserScreens} from 'components/componentData/newUserScreens';

// Validation 🛡  ️
import {characteristicsSchema} from 'lib/zodSchema';

// Helper 🤝
import {size} from 'react-native-responsive-sizes';

// Types 🏷 ️
import {NewUserJourneyStackNavigation} from '../../navigationStacks/types';
interface SelectedTracks {
  id: number;
  value: string;
  emoji: string;
  toggle: boolean;
}

const MAX_SELECTED_CHARS = 10;
const MIN_SELECTED_CHARS = 3;

const AboutUserScreen = () => {
  // initial state
  const characteristics = userPreferences;

  // Local State
  const [charsState, setCharsState] = useState(characteristics);
  const [selectedChars, setSelectedChars] = useState<SelectedTracks[]>([]);
  const [error, setError] = useState<string | undefined>('');
  //Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  //Redux
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {newUserDetails, setNewUserDetails, isLessor} = useNewUserDetails();
  const savedChars = newUserDetails.characteristics;

  //Safe Area
  const insets = useSafeAreaInsets();

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
    setError('');
  };

  const handleContinue = () => {
    const result = characteristicsSchema.safeParse(selectedChars);
    if (!result.success) {
      setError(result.error?.flatten().formErrors.at(0));
      return;
    }
    setNewUserDetails({characteristics: selectedChars});
    const screen = isLessor
      ? newUserScreens.lessor[5]
      : newUserScreens.renter[3];
    navigation.navigate(screen);

    setCurrentScreen(currentScreen + 1);

    setError('');
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
    <View
      style={[
        CoreStyleSheet.safeAreaViewShowContainer,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}>
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
          {error && <ErrorMessage message={error} />}
          <NewUserJourneyContinueButton
            value="Continue"
            disabled={selectedChars.length < MIN_SELECTED_CHARS}
            onPress={handleContinue}
          />
        </View>
      </View>
    </View>
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