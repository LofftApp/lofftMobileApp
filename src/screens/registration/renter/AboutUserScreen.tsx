import React, {useState, FC} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

// Screens 📺
import ScreenBackButton from 'components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import UserJourneyPaginationBar from 'reduxFeatures/registration/UserJourneyPaginationBar';
import HeadlineContainer from 'components/containers/HeadlineContainer';
import EmojiIcon from 'components/Emojicon/EmojiIcon';
import UserJourneyContinue from 'reduxFeatures/registration/UserJourneyContinue';

// StylesSheet 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Data 💿
import userPreferences from 'components/componentData/userPreferences.json';

// Helper 🤝
import {navigationHelper} from 'helpers/navigationHelper';

const AboutYouFlatHuntScreen = ({navigation}: any) => {
  const preferences = userPreferences;

  const [intitalpreferencesArray, seIintitalPreferencesArray] =
    useState(preferences);
  const [screen] = useState(0);
  const [selectedTracks, setselectedTracks] = useState([]);
  const [alertTriger, setAlertTriger] = useState(false);

  const selectedEmojis = (id: any) => {
    const targets = [];

    interface EmojiItem {
      id: number;
      emojiIcon: string;
      value: string;
      toggle: boolean;
    }

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

    setselectedTracks(wash);
    seIintitalPreferencesArray(preSeleted);
  };

  const checkChoices = () => {
    setAlertTriger(true);

    setTimeout(() => {
      setAlertTriger(false);
    }, 800);
  };

  const emojiElements = intitalpreferencesArray.map(
    (emojiElement: any, index: number) => {
      return (
        <EmojiIcon
          key={index + 1}
          id={emojiElement.id}
          emojiIcon={emojiElement.emoji}
          value={emojiElement.value}
          toggle={emojiElement.toggle}
          selectedEmojis={selectedEmojis}
          disabled={
            selectedTracks.length === 10 &&
            !selectedTracks.includes(emojiElement)
          }
        />
      );
    },
  );

  return (
    <ScreenBackButton nav={() => navigation.goBack()}>
      <HeadlineContainer
        headlineText={'Tell us a bit about yourself'}
        subDescription={
          "Select at least 3 tags that describe who you are and your lifestyles. More tags selected, more likelihood you'll find the right crowd in a Lofft!"
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.emojiContainer}>{emojiElements}</View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <UserJourneyPaginationBar />
        <View style={{marginVertical: 13}}>
          <Text
            style={
              alertTriger ? {color: Color.Tomato[100]} : {color: '#4A4A4A'}
            }>
            * Select at least 3 tags
          </Text>
        </View>
        <UserJourneyContinue
          value="Continue"
          disabled={selectedTracks.length < 3}
          details={{flatMate: selectedTracks}}
          onPress={(targetScreen: any) =>
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
    marginBottom: 150,
  },
  footerContainer: {
    paddingTop: 35,
    paddingBottom: 28,
  },
});

export default AboutYouFlatHuntScreen;
