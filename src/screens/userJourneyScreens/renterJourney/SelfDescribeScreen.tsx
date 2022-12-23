import React, {useState} from 'react';
import {View, StyleSheet, Pressable, TextInput} from 'react-native';

// Screens 📺
import ScreenBackButton from '@Components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import HeadlineContainer from '@Components/containers/HeadlineContainer';
import UserJourneyContinue from '@Redux/userRegistration/UserJourneyContinue';
import UserJourneyPaginationBar from '@Redux/userRegistration/UserJourneyPaginationBar';

// Styles 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
import Color from '@StyleSheets/lofftColorPallet.json';

// Helpers 🤝
import {navigationHelper} from '@Helpers/navigationHelper';

const SelfDescribeScreen = ({navigation, route}: any) => {
  const [text, setText] = useState('');
  const [textFocus, setTextFocus] = useState(false);

  const handleTextFocus = () => {
    setTextFocus(true);
  };

  console.log(textFocus);

  return (
    <ScreenBackButton nav={() => navigation.goBack()}>
      <HeadlineContainer
        headlineText={`In your own ${'\n'}words!`}
        subDescription={
          'Describe yourself in a short text. Dont worry, this can be edited in your profile later!'
        }
      />

      <View style={{flex: 1}}>
        <Pressable
          style={[
            styles.inputForm,
            {borderColor: textFocus ? Color.Lavendar[100] : Color.Black[100]},
          ]}
          onPress={() => handleTextFocus()}>
          <TextInput
            keyboardType="default"
            placeholder="Who are you? What do you like?"
            autoCapitalize="words"
            value={text}
            style={styles.inputText}
            onChangeText={text => setText(text)}
            multiline={true}
          />
        </Pressable>
      </View>

      <View style={styles.options}>
        <View style={styles.paginationContainer}>
          <UserJourneyPaginationBar />
        </View>

        <UserJourneyContinue
          value="Continue"
          style={{backgroundColor: Color.Lavendar[100], borderWidth: 0}}
          textStyle={[fontStyles.headerSmall, {color: 'white'}]}
          disabled={false}
          onPress={(targetScreen: any) =>
            navigationHelper(navigation, targetScreen)
          }
          details={{textAboutUser: text}}
        />
      </View>
    </ScreenBackButton>
  );
};

const styles = StyleSheet.create({
  inputForm: {
    height: '65%',
    borderWidth: 2,
    borderRadius: 16,
  },
  inputText: {
    paddingHorizontal: 10,
    flex: 1,
    borderRadius: 16,
  },
  options: {
    marginBottom: 55,
  },
  paginationContainer: {
    marginVertical: 47,
  },
});

export default SelfDescribeScreen;
