import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';

// Screens 📺
import ScreenBackButton from 'components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';

// Styles 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Helpers 🤝
import {useNavigation} from '@react-navigation/native';
import {size} from 'react-native-responsive-sizes';

// Redux
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {CoreButton} from 'components/buttons/CoreButton';
import {useUpdateUserMutation} from 'reduxFeatures/user/userApi';

const SelfDescribeScreen = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [textFocus, setTextFocus] = useState(false);
  const [updateUser] = useUpdateUserMutation();

/* 🚨 🚨 🚨 temp logic to hook in Patch Mutation Hook needs to be moved over to last screen of registration journey */
  const {newUserDetails} = useNewUserDetails();
  const {data} = useGetUserQuery();
  console.log(newUserDetails, "🍌 🍌🍌🍌🍌🍌")
  const handleUserUpdate =  async () => {
    try {
      const result = await updateUser({ id: data?.user.id, userChoices: newUserDetails }).unwrap();
      console.log('Update successful:', result);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };


  return (
    <ScreenBackButton nav={() => navigation.goBack()}>
      <HeadlineContainer
        headlineText={`In your own ${'\n'}words!`}
        subDescription={
          'Describe yourself in a short text. Dont worry, this can be edited in your profile later!'
        }
      />

      <View style={styles.textContainer}>
        <TextInput
          keyboardType="default"
          placeholder="Who are you? What do you like?"
          value={text}
          style={[
            styles.inputText,
            {borderColor: textFocus ? Color.Lavendar[100] : Color.Black[100]},
          ]}
          onChangeText={input => setText(input)}
          onFocus={() => setTextFocus(true)}
          onBlur={() => setTextFocus(false)}
          multiline={true}
        />
      </View>

      {text.length < 20 && (
        <Text style={styles.min}>
          *Share you story in {20 - text.length} word
          {text.length === 19 ? '' : 's'} or more
        </Text>
      )}

      <CoreButton value="update user in db" onPress={handleUserUpdate} />

      {/* <FooterNavBarWithPagination
        onPress={(targetScreen: any) =>
          navigationHelper(navigation, targetScreen)
        }
        disabled={text.length >= 20 ? false : true}
        details={{textAboutUser: text}}
      /> */}
    </ScreenBackButton>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  min: {
    paddingVertical: size(10),
    color: Color.Black[80],
  },
  inputForm: {
    height: '65%',
    borderWidth: size(2),
    borderRadius: size(16),
  },
  inputText: {
    borderWidth: size(2),
    paddingHorizontal: size(10),
    flex: 1,
    borderRadius: size(16),
  },
});

export default SelfDescribeScreen;
