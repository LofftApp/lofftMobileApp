import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

// Screens 📺
import ScreenBackButton from '@Components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import HeadlineContainer from '@Components/containers/HeadlineContainer';
import EmojiIcon from '@Components/Emojicon/EmojiIcon';
import {CoreButton} from '@Components/buttons/CoreButton';
import UserJourneyContinue from '@Redux/userRegistration/UserJourneyContinue';
import PaginationBar from '@Components/bars/PaginationBar';

// Styles 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
import Color from '@StyleSheets/lofftColorPallet.json';

// Data 💿
import flatPreferences from '@Components/componentData/flatPreferences.json';

const FlatFeaturesScreen = ({navigation, route}: any) => {
  const subHeaderText = route.params.subText;
  const preferences = flatPreferences;

  const [intitalpreferencesArray, seIintitalPreferencesArray] =
    useState(preferences);
  const [screen, setScreen] = useState(4);
  const [selectedTrack, setselectedTrack] = useState([]);
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

    setselectedTrack(wash);
    seIintitalPreferencesArray(preSeleted);
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
              marginVertical: 17,
            }}>
            <PaginationBar screen={screen} totalScreens={6} />
          </View>
          <View style={{marginVertical: 15}}></View>

          <UserJourneyContinue
            value="Continue"
            style={{backgroundColor: Color.Lavendar[100], borderWidth: 0}}
            textStyle={[fontStyles.headerSmall, {color: 'white'}]}
            disabled={false}
            onPress={(type: string) => {
              console.log(type);
              if (type === 'leeser') {
                navigation.navigate('AboutYouFlatHuntScreen', {
                  headerText: 'Who is your ideal flatmate?',
                  subText:
                    "Select all tags that describe your ideal flatmate and we'll match them for you!",
                });
              } else if (type === 'renter') {
                navigation.navigate('SelfDescribeScreen');
              }
            }}
            details={{flatFeatures: selectedTrack}}
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

export default FlatFeaturesScreen;
