import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';

// Screens
import ScreenBackButton from '../../components/coreComponents/Screens/ScreenBackButton';

// Styles
import {fontStyles} from '../../styles/fontStyles';
import color from '../../styles/lofftColorPallet.json';

// Settings
import PaginationBar from '../../components/bars/PaginationBar';

// Components
import HeadlineContainer from '../../components/containers/HeadlineContainer';
import EmojiIcon from '../../components/Emojicon/EmojiIcon';
import {CoreButton} from '../../components/buttons/CoreButton';

const FlatFeaturesScreen = ({navigation, route}) => {
  const subHeaderText =
    'Select all tags that describe who you are and find the Lofft of your life!';
  const preferences = [
    {
      id: 1,
      emoji: '🚌',
      value: 'Bus stop closeby',
      toggle: false,
    },
    {
      id: 2,
      emoji: '↑',
      value: 'Elevator',
      toggle: false,
    },
    {
      id: 3,
      emoji: '🚊',
      value: 'Close to U- or S-Bahn',
      toggle: false,
    },
    {
      id: 4,
      emoji: '⛱',
      value: 'Balcony / Terrace',
      toggle: false,
    },
    {
      id: 5,
      emoji: '🛖',
      value: 'Ground floor',
      toggle: false,
    },
    {
      id: 6,
      emoji: '🛋',
      value: 'Fully furnished',
      toggle: false,
    },
    {
      id: 7,
      emoji: '🥘',
      value: 'Built-in kitchen',
      toggle: false,
    },
    {
      id: 8,
      emoji: '🐶',
      value: 'Pet friendly',
      toggle: false,
    },
    {
      id: 9,
      emoji: '🚋',
      value: 'Near tram stop',
      toggle: false,
    },
    {
      id: 10,
      emoji: '🦽',
      value: 'Accessible',
      toggle: false,
    },
  ];

  const [intitalpreferencesArray, seIintitalPreferencesArray] =
    useState(preferences);
  const [screen, setScreen] = useState(4);
  const [selectTrack, setselectedTrack] = useState([]);
  const [alertTriger, setAlertTriger] = useState(false);

  const selectedEmojis = id => {
    const targets = [];

    const preSeleted = intitalpreferencesArray.map(element => {
      if (element.id === id) {
        targets.push(element);
        return {
          ...element,
          toggle: !element.toggle,
        };
      } else {
        // const targetIndex = targets.map(e => e.hello).indexOf(id);
        // if (targetIndex > -1) {
        //   targets.splice(targetIndex,1);
        // }
        return element;
      }
    });

    const wash = preSeleted.filter(el => el.toggle);

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
            style={{backgroundColor: color.Lavendar[100], borderWidth: 0}}
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
