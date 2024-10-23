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
import {newUserScreens} from 'navigationStacks/newUserScreens';

// Validation 🛡  ️
import {characteristicsSchema} from 'lib/zodSchema';

// Constants 📊
import {
  MAX_SELECTED_CHARS,
  MIN_SELECTED_CHARS,
} from 'components/componentData/constants';
// Helper 🤝
import {size} from 'react-native-responsive-sizes';

// Types 🏷 ️
import {NewUserJourneyStackNavigation} from '../../navigationStacks/types';
import {useGetAssetsQuery} from 'reduxFeatures/user/userApi';
import {Characteristics} from 'reduxFeatures/registration/types';

const AboutUserFlatScreen = () => {
  const {data} = useGetAssetsQuery();
  console.log('data:', data?.characteristics);
  //Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  // initial state
  const characteristics = data?.characteristics;

  // Local State
  const [charsState, setCharsState] = useState(characteristics);
  const [selectedChars, setSelectedChars] = useState<Characteristics[]>([]);
  const [error, setError] = useState<string | undefined>('');

  //Redux
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {newUserDetails, setNewUserDetails, isLessor} = useNewUserDetails();
  const savedChars = newUserDetails.characteristics;

  //Safe Area
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (savedChars && savedChars.length > 0) {
      setSelectedChars(savedChars);

      const updatedCharsState = characteristics?.map(char => ({
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
      ? newUserScreens.lessor[currentScreen + 1]
      : newUserScreens.tenant[currentScreen + 1];
    navigation.navigate(screen);

    setCurrentScreen(currentScreen + 1);

    setError('');
  };

  const selectChar = (id: number) => {
    if (!charsState) {
      return;
    }
    const updatedChars = charsState.map(el => {
      return el.id === id ? {...el, toggle: !el.toggle} : el;
    });

    const charsSelected = updatedChars.filter(el => el.toggle);

    setSelectedChars(charsSelected);
    setCharsState(updatedChars);
  };

  const charsButtons = charsState?.map(char => {
    const {name, emoji, id, toggle} = char;
    return (
      <SelectionButton
        key={id}
        id={id}
        emojiIcon={emoji}
        value={name}
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
          headlineText={
            isLessor
              ? 'Tell us a bit about your flat'
              : 'Tell us a bit about yourself'
          }
          subDescription={
            isLessor
              ? `Select at least ${MIN_SELECTED_CHARS} tags that describe your Lofft lifestyles. More tags selected, more likelihood you'll find the right crowd!`
              : `Select at least ${MIN_SELECTED_CHARS} tags that describe who you are and your lifestyles. More tags selected, more likelihood you'll find the right crowd in a Lofft!`
          }
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
          {error ||
            (selectedChars.length === MAX_SELECTED_CHARS && (
              <ErrorMessage
                message={
                  error ||
                  `You have selected maximum of ${MAX_SELECTED_CHARS} tags`
                }
              />
            ))}
          <NewUserPaginationBar />
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

export default AboutUserFlatScreen;
