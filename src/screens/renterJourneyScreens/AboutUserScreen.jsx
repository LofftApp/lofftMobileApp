import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';

// Styles
import {fontStyles} from '../../styles/fontStyles';
import color from '../../styles/lofftColorPallet.json';

// Settings
import PaginationBar from '../../components/bars/PaginationBar';

// Components
import ScreenBackButton from '../../components/coreComponents/Screens/ScreenBackButton';
import HeadlineContainer from '../../components/containers/HeadlineContainer';
import EmojiIcon from '../../components/Emojicon/EmojiIcon';
import {CoreButton} from '../../components/buttons/CoreButton';
import userPreferences from '../../components/componentData/userPreferences.json';

const AboutYouFlatHuntScreen = ({navigation}) => {
  const subHeaderText =
    "Select at least 3 tags that describe who you are and your lifestyles. More tags selected, more likelihood you'll find the right crowd in a Lofft!";
  const preferences = userPreferences;

  const [intitalpreferencesArray, seIintitalPreferencesArray] =
    useState(preferences);
  const [screen, setScreen] = useState(0);
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
            <PaginationBar screen={screen} />
          </View>
          <View style={{marginVertical: 13}}>
            <Text
              style={
                alertTriger ? {color: color.Tomato[100]} : {color: '#4A4A4A'}
              }>
              * Select at least 3 tags
            </Text>
          </View>

          {selectTrack.length >= 3 ? (
            <CoreButton
              value="Continue"
              style={{backgroundColor: color.Lavendar[100], borderWidth: 0}}
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
