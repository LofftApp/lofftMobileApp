import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

// Screens 📺
import ScreenBackButton from '@Screens/ScreenBackButton';

// Components 🪢
import HeadlineContainer from '@Components/containers/HeadlineContainer';
import EmojiIcon from '@Components/Emojicon/EmojiIcon';
import {CoreButton} from '@Components/buttons/CoreButton';
import PaginationBar from '@Components/bars/PaginationBar';

// Styles 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
import Color from '@StyleSheets/lofftColorPallet.json';

// Data 💿
import flatPreferences from '@Components/componentData/flatPreferences.json';

const FlatFeaturesScreen = ({navigation, route}: any) => {
  const subHeaderText =
    'Select all tags that describe who you are and find the Lofft of your life!';
  const preferences = flatPreferences;

  const [intitalpreferencesArray, seIintitalPreferencesArray] =
    useState(preferences);
  const [screen, setScreen] = useState(4);
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
            headlineText={'What is your ideal flat?'}
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
            <PaginationBar screen={screen} />
          </View>
          <View style={{marginVertical: 15}}></View>

          <CoreButton
            value="Continue"
            style={{backgroundColor: Color.Lavendar[100], borderWidth: 0}}
            textStyle={[fontStyles.headerSmall, {color: 'white'}]}
            disabled={false}
            onPress={() => {
              navigation.navigate('SelfDescribeScreen', {
                personalPreferences: route.params.personalPreferences,
                gender: route.params.gender,
                districts: route.params.districts,
                minRent: route.params.minRent,
                maxRent: route.params.maxRent,
                flatPreferences: selectTrack,
                warmRent: route.params.rentWarm,
              });
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

export default FlatFeaturesScreen;
