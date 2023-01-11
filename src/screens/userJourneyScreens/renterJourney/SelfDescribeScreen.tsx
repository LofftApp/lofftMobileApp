import React, {useState} from 'react';
import {View, StyleSheet, Pressable, TextInput} from 'react-native';

// Screens 📺
import ScreenBackButton from '@Components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import HeadlineContainer from '@Components/containers/HeadlineContainer';
import FooterNavBarWithPagination from '@Components/bars/FooterNavBarWithPagination';

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
            value={text}
            style={styles.inputText}
            onChangeText={text => setText(text)}
            multiline={true}
          />
        </Pressable>
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
    paddingHorizontal: 10,
    flex: 1,
    borderRadius: 16,
  },
});

export default SelfDescribeScreen;
