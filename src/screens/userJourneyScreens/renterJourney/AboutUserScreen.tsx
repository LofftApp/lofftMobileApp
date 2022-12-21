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
import ScreenBackButton from '@Screens/ScreenBackButton';

// Components 🪢
import PaginationBar from '@Components/bars/PaginationBar';
import HeadlineContainer from '@Components/containers/HeadlineContainer';
import EmojiIcon from '@Components/Emojicon/EmojiIcon';
import {CoreButton} from '@Components/buttons/CoreButton';

// StylesSheet 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
import Color from '@StyleSheets/lofftColorPallet.json';

// Data 💿
import userPreferences from '@Components/componentData/userPreferences.json';

const AboutYouFlatHuntScreen = ({navigation}: any) => {
  const subHeaderText =
    "Select at least 3 tags that describe who you are and your lifestyles. More tags selected, more likelihood you'll find the right crowd in a Lofft!";
  const preferences = userPreferences;

  const [intitalpreferencesArray, seIintitalPreferencesArray] =
    useState(preferences);
  const [screen] = useState(0);
  const [selectTrack, setselectedTrack] = useState([]);
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

  const checkChoices = () => {
    setAlertTriger(true);

    setTimeout(() => {
      setAlertTriger(false);
    }, 800);
  };

  console.log(selectTrack);
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
            headlineText={'Tell us a bit about yourself'}
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

          {selectTrack.length >= 3 ? (
            <CoreButton
              value="Continue"
              style={{backgroundColor: Color.Lavendar[100], borderWidth: 0}}
              textStyle={[fontStyles.headerSmall, {color: 'white'}]}
              disabled={false}
              onPress={() => {
                navigation.navigate('GenderIdentityScreen', {
                  selectedTagsFromScreenOne: selectTrack,
                });
              }}
            />
          ) : (
            <Pressable
              onPress={() => {
                checkChoices();
              }}>
              <CoreButton
                value="Continue"
                style={{backgroundColor: '#BBBBBB', borderWidth: 0}}
                textStyle={[fontStyles.headerSmall, {color: 'white'}]}
                disabled={true}
                // onPress={() => {
                //   navigation.navigate('', {});
                // }}
              />
            </Pressable>
          )}
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
