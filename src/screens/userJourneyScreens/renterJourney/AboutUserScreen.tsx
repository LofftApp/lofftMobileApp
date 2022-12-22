import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';

// Screens 📺
import ScreenBackButton from '@Components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import PaginationBar from '@Components/bars/PaginationBar';
import HeadlineContainer from '@Components/containers/HeadlineContainer';
import EmojiIcon from '@Components/Emojicon/EmojiIcon';
import {CoreButton} from '@Components/buttons/CoreButton';
import UserJourneyContinue from '@Redux/userRegistration/UserJourneyContinue';

// StylesSheet 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
import Color from '@StyleSheets/lofftColorPallet.json';

// Data 💿
import userPreferences from '@Components/componentData/userPreferences.json';

const AboutYouFlatHuntScreen = ({navigation, route}: any) => {
  const subHeaderText = route.params.subText;
  const preferences = userPreferences;

  const [intitalpreferencesArray, seIintitalPreferencesArray] =
    useState(preferences);
  const [screen] = useState(0);
  const [selectedTracks, setselectedTracks] = useState([]);
  const [alertTriger, setAlertTriger] = useState(false);

  const selectedEmojis = (id: any) => {
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

  const emojiElements = intitalpreferencesArray.map((emojiElement, index) => {
    return (
      <EmojiIcon
        key={index + 1}
        id={emojiElement.id}
        emojiIcon={emojiElement.emoji}
        value={emojiElement.value}
        toggle={emojiElement.toggle}
        selectedEmojis={selectedEmojis}
      />
    );
  });

  return (
    <ScreenBackButton nav={() => navigation.goBack()}>
      <SafeAreaView style={{}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeadlineContainer
            headlineText={route.params.headerText}
            subDescription={subHeaderText}
          />
          <View style={styles.emojiContainer}>{emojiElements}</View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            backgroundColor: 'white',
            height: 180,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <PaginationBar screen={screen} totalScreens={6} />
          </View>
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
            onPress={(type: string) => {
              if (type === 'leeser') {
                navigation.navigate('FlatPhotoUploadScreen');
              } else if (type === 'renter') {
                navigation.navigate('GenderIdentityScreen', {
                  selectedTagsFromScreenOne: selectedTracks,
                });
              }
            }}
          />
        </View>
      </SafeAreaView>
    </ScreenBackButton>
  );
};

const styles = StyleSheet.create({
  emojiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 150,
  },
});

export default AboutYouFlatHuntScreen;
