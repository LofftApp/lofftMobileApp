import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
//Redux 📦
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';

// Screens 📺
import ScreenBackButton from 'components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import UserJourneyPaginationBar from 'components/buttons/NewUserJourneyPaginationBar';
import HeadlineContainer from 'components/containers/HeadlineContainer';
import SelectionButton from 'components/buttons/SelectionButton';
import UserJourneyContinue from 'components/buttons/NewUserJourneyContinueButton';

// StylesSheet 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Data 💿
import userPreferences from 'components/componentData/userPreferences.json';

// Helper 🤝
import {navigationHelper} from 'helpers/navigationHelper';
import {size} from 'react-native-responsive-sizes';
import {useNavigation} from '@react-navigation/native';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import BackButton from 'components/buttons/BackButton';
import {RegistrationBackground} from 'assets';
import NewUserJourneyButton from 'components/buttons/NewUserJourneyButton';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import {fontStyles} from 'styleSheets/fontStyles';
import Divider from 'components/bars/Divider';

interface SelectedTracks {
  id: number;
  value: string;
  emoji: string;
  toggle: boolean;
}

const AboutUserScreen = () => {
  const navigation = useNavigation();
  const preferences = userPreferences;

  const [intitalpreferencesArray, setintitalPreferencesArray] =
    useState(preferences);
  const [selectedTracks, setselectedTracks] = useState<SelectedTracks[]>([]);

  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const handleBackButton = () => {
    const previousScreen = currentScreen - 1;
    navigation.goBack();
    setCurrentScreen(previousScreen);
  };

  const selectFn = (id: number) => {
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

    const wash = preSeleted.filter(el => el.toggle);

    setselectedTracks(wash);
    setintitalPreferencesArray(preSeleted);
  };
  console.log(intitalpreferencesArray)

  const emojiElements = intitalpreferencesArray.map(
    (emojiElement, index: number) => {
      const {value, emoji, id, toggle} = emojiElement;
      return (
        <SelectionButton
          key={index + 1}
          id={id}
          emojiIcon={emoji}
          value={value}
          toggle={toggle}
          selectFn={selectFn}
          disabled={
            selectedTracks.length === 10 &&
            !selectedTracks.includes(emojiElement)
          }
        />
      );
    },
  );

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
          subDescription="Select at least 3 tags that describe who you are and your lifestyles. More tags selected, more likelihood you'll find the right crowd in a Lofft!"
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.selectionContainer}>{emojiElements}</View>
        </ScrollView>
        <Divider />
        <View style={styles.footerContainer}>
          <View style={styles.tagInfoContainer}>
            <Text style={fontStyles.bodySmall}>* Select at least 3 tags</Text>
          </View>
          <UserJourneyPaginationBar />
          <NewUserJourneyContinueButton
            value="Continue"
            disabled={selectedTracks.length < 3}
            onPress={(targetScreen: number) =>
              navigationHelper(navigation, targetScreen)
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  selectionContainer: {
    marginTop: size(20),
    flexDirection: 'row',
    flexWrap: 'wrap',
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
