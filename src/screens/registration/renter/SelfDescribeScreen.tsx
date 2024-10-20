import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  SafeAreaView,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//Redux
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';

// Screens 📺
import {newUserScreens} from 'components/componentData/newUserScreens';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import BackButton from 'components/buttons/BackButton';
import Divider from 'components/bars/Divider';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';

// Styles 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {fontStyles} from 'styleSheets/fontStyles';

//Assets 🎨
import {RegistrationBackground} from 'assets';

//Validation 🛡 ️
import {selfDescriptionSchema} from 'lib/zodSchema';

//Constants  📊
import {MIN_DESCRIPTION_CHARS} from 'components/componentData/constants';
// Helpers 🤝
import {size} from 'react-native-responsive-sizes';
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';

const SelfDescribeScreen = () => {
  //Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  //Local State
  const [text, setText] = useState('');
  const [textFocus, setTextFocus] = useState(false);
  const [error, setError] = useState('');

  //Redux
  const {setCurrentScreen, currentScreen} = useNewUserCurrentScreen();
  const {setNewUserDetails, newUserDetails} = useNewUserDetails();
  const savedDescription =
    newUserDetails.userType === 'renter' && newUserDetails.selfDescription;

  useEffect(() => {
    if (savedDescription) {
      setText(savedDescription);
    }
  }, [savedDescription]);

  const handleOnChange = (input: string) => {
    setText(input);
  };
  const handleOnFocus = () => {
    setTextFocus(true);
  };

  const handleOnBlur = () => {
    setTextFocus(false);
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleBackButton = () => {
    setCurrentScreen(currentScreen - 1);
    navigation.goBack();
    setError('');
  };
  const handleContinue = () => {
    const trimmedText = text.trim();
    const result = selfDescriptionSchema.safeParse(trimmedText);
    if (!result.success) {
      setError(result.error.flatten().formErrors?.[0]);
      return;
    }

    setNewUserDetails({selfDescription: result.data});

    setCurrentScreen(currentScreen + 1);
    const screen = newUserScreens.renter[currentScreen + 1];
    navigation.navigate(screen);
    setError('');
  };

  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
      <BackButton onPress={handleBackButton} />
      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />

      <View style={CoreStyleSheet.screenContainer}>
        <HeadlineContainer
          headlineText={`In your own ${'\n'}words!`}
          subDescription={
            'Describe yourself in a short text. Dont worry, this can be edited in your profile later!'
          }
        />
        <View style={styles.mainContainer}>
          <Animated.View style={[styles.textContainer, {opacity: fadeAnim}]}>
            <TextInput
              keyboardType="default"
              placeholder="Who are you? What do you like?"
              placeholderTextColor={Color.Black[50]}
              value={text}
              style={[
                styles.inputText,
                fontStyles.bodySmall,
                {
                  borderColor: textFocus
                    ? error
                      ? Color.Tomato[100]
                      : Color.Lavendar[100]
                    : Color.Black[50],
                },
              ]}
              onChangeText={handleOnChange}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              multiline={true}
            />

            <Text style={[fontStyles.bodySmall, styles.minText]}>
              {text.length < MIN_DESCRIPTION_CHARS &&
                !error &&
                `*Share your story in ${
                  MIN_DESCRIPTION_CHARS - text.length
                } word${
                  MIN_DESCRIPTION_CHARS - text.length === 1 ? '' : 's'
                } or more`}
              {error && <ErrorMessage isInputField message={error} />}
            </Text>
          </Animated.View>

          <View style={styles.footerContainer}>
            <Divider />
            <NewUserPaginationBar />
            <NewUserJourneyContinueButton
              value="Continue"
              disabled={text.length < MIN_DESCRIPTION_CHARS}
              onPress={handleContinue}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textContainer: {
    height: '45%',
    paddingHorizontal: size(10),
    paddingVertical: size(10),
    gap: size(10),
  },
  minText: {
    color: Color.Black[80],
  },

  inputText: {
    borderWidth: 2,
    paddingLeft: size(10),
    paddingVertical: size(5),
    flex: 1,
    borderRadius: 12,
  },
  footerContainer: {
    paddingTop: size(20),
    paddingBottom: size(20),
    paddingHorizontal: size(16),
    gap: size(10),
  },
});

export default SelfDescribeScreen;
