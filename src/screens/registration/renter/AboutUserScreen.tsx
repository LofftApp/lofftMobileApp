import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

// Screens 📺
import ScreenBackButton from 'components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import UserJourneyPaginationBar from 'components/buttons/UserJourneyPaginationBar';
import HeadlineContainer from 'components/containers/HeadlineContainer';
import SelectionButton from 'components/buttons/SelectionButton';
import UserJourneyContinue from 'components/buttons/UserJourneyContinue';

// StylesSheet 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Data 💿
import userPreferences from 'components/componentData/userPreferences.json';

// Helper 🤝
import {navigationHelper} from 'helpers/navigationHelper';
import {size} from 'react-native-responsive-sizes';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';
import {setCurrentScreen} from 'reduxFeatures/registration/newUserSlice';

interface SelectedTracks {
  id: number;
  value: string;
  emoji: string;
  toggle: boolean;
}

const AboutYouFlatHuntScreen = () => {
  const navigation = useNavigation();
  const preferences = userPreferences;

  const [intitalpreferencesArray, setintitalPreferencesArray] =
    useState(preferences);
  const [selectedTracks, setselectedTracks] = useState<SelectedTracks[]>([]);
  const [alertTriger] = useState(false);

  const currentScreen = useAppSelector(state => state.newUser.currentScreen);
  const dispatch = useAppDispatch();

  const handleBackButton = () => {
    const previousScreen = (Number(currentScreen) - 1).toString();
    dispatch(setCurrentScreen(previousScreen));
    navigation.goBack();
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
    <ScreenBackButton nav={handleBackButton}>
      <HeadlineContainer
        headlineText="Tell us a bit about yourself"
        subDescription="Select at least 3 tags that describe who you are and your lifestyles. More tags selected, more likelihood you'll find the right crowd in a Lofft!"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.emojiContainer}>{emojiElements}</View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <UserJourneyPaginationBar />
        <View style={styles.tagInfoContainer}>
          <Text
            style={
              // eslint-disable-next-line react-native/no-inline-styles
              alertTriger ? {color: Color.Tomato[100]} : {color: '#4A4A4A'}
            }>
            * Select at least 3 tags
          </Text>
        </View>
        <UserJourneyContinue
          value="Continue"
          disabled={selectedTracks.length < 3}
          details={{flatMate: selectedTracks}}
          onPress={(targetScreen: number) =>
            navigationHelper(navigation, targetScreen)
          }
        />
      </View>
    </ScreenBackButton>
  );
};

const styles = StyleSheet.create({
  emojiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: size(150),
  },
  tagInfoContainer: {
    marginVertical: size(13),
  },
  footerContainer: {
    paddingTop: size(35),
    paddingBottom: size(28),
  },
});

export default AboutYouFlatHuntScreen;
