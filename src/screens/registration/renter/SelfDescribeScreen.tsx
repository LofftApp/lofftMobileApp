import React, {useState} from 'react';
import {View, StyleSheet, Pressable, TextInput} from 'react-native';

// Screens 📺
import ScreenBackButton from 'components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import FooterNavBarWithPagination from 'components/bars/FooterNavBarWithPagination';

// Styles 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import Color from 'styleSheets/lofftColorPallet.json';

// Helpers 🤝
import {navigationHelper} from '@Helpers/navigationHelper';

const SelfDescribeScreen = ({navigation, route}: any) => {
  const [text, setText] = useState('');
  const [textFocus, setTextFocus] = useState(false);

  const handleTextFocus = () => {
    setTextFocus(true);
  };

  return (
    <ScreenBackButton nav={() => navigation.goBack()}>
      <HeadlineContainer
        headlineText={`In your own ${'\n'}words!`}
        subDescription={
          'Describe yourself in a short text. Dont worry, this can be edited in your profile later!'
        }
      />

      <View style={{flex: 1}}>
        <TextInput
          keyboardType="default"
          placeholder="Who are you? What do you like?"
          value={text}
          style={[
            styles.inputText,
            {borderColor: textFocus ? Color.Lavendar[100] : Color.Black[100]},
          ]}
          onChangeText={text => setText(text)}
          onFocus={() => setTextFocus(true)}
          onBlur={() => setTextFocus(false)}
          multiline={true}
        />
      </View>

      <FooterNavBarWithPagination
        onPress={(targetScreen: any) =>
          navigationHelper(navigation, targetScreen)
        }
        details={{textAboutUser: text}}
      />
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
    borderWidth: 2,
    paddingHorizontal: 10,
    flex: 1,
    borderRadius: 16,
  },
});

export default SelfDescribeScreen;
