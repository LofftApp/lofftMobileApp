import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, SafeAreaView, Animated, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//Redux
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';

// Screens 📺
import {newUserScreens} from 'navigationStacks/newUserScreens';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import BackButton from 'components/buttons/BackButton';
import Divider from 'components/bars/Divider';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';

// Styles 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {fontStyles} from 'styleSheets/fontStyles';

//Assets 🎨
import {RegistrationBackground} from 'assets';

//Validation 🛡 ️
import {flatDetailsSchema} from 'lib/zodSchema';

// Helpers 🤝
import {size as _size} from 'react-native-responsive-sizes';

//Types 🏷️
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';

const FlatDetailsScreen = () => {
  //Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  //Local State
  const [tagLine, setTagLine] = useState('');
  const [size, setSize] = useState('');
  const [errorTagLine, setErrorTagLine] = useState('');
  const [errorSize, setErrorSize] = useState('');

  //Redux
  const {setCurrentScreen, currentScreen} = useNewUserCurrentScreen();
  const {setNewUserDetails, newUserDetails} = useNewUserDetails();
  const savedTagLine =
    newUserDetails.userType === 'lessor' && newUserDetails.tagLine;
  const savedSize = newUserDetails.userType === 'lessor' && newUserDetails.size;

  useEffect(() => {
    if (savedTagLine) {
      setTagLine(savedTagLine);
    }
    if (savedSize) {
      setSize(savedSize.toString());
    }
  }, [savedTagLine, savedSize]);

  const handleTagLineChange = (input: string) => {
    setTagLine(input);
    setErrorTagLine('');
  };

  const handleSizeChange = (input: string) => {
    setSize(input);
    setErrorSize('');
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
    setErrorTagLine('');
    setErrorSize('');
  };
  const handleContinue = () => {
    const trimmedtagLine = tagLine.trim();
    const trimmedSize = size.trim();
    const result = flatDetailsSchema.safeParse({
      tagLine: trimmedtagLine,
      size: Number(trimmedSize),
    });

    if (!result.success) {
      const errTagLine = result.error.flatten().fieldErrors?.tagLine?.[0];
      const errSize = result.error.flatten().fieldErrors?.size?.[0];
      if (errTagLine) {
        setErrorTagLine(errTagLine);
      }
      if (errSize) {
        setErrorSize(errSize);
      }
      return;
    }

    setNewUserDetails({
      tagLine: result.data.tagLine,
      size: result.data.size,
    });

    setCurrentScreen(currentScreen + 1);

    const screen = newUserScreens.lessor[currentScreen + 1];
    navigation.navigate(screen);

    setErrorTagLine('');
    setErrorSize('');
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
          headlineText="Share some details about your flat"
          subDescription="Write a catchy headline to attract potential flatmates"
        />
        <View style={styles.mainContainer}>
          <View style={styles.centerContainer}>
            <Animated.View style={[styles.inputContainer, {opacity: fadeAnim}]}>
              <InputFieldText
                value={tagLine}
                onChangeText={handleTagLineChange}
                placeholder={'Awesome flat in Moabit'}
                style={styles.inputText}
              />

              <ErrorMessage isInputField message={errorTagLine} />
            </Animated.View>
            <Animated.View style={[styles.inputContainer, {opacity: fadeAnim}]}>
              <Text style={[fontStyles.headerSmall, styles.minText]}>
                Flat size in m²
              </Text>

              <InputFieldText
                value={size}
                onChangeText={handleSizeChange}
                placeholder="68"
                style={styles.inputText}
              />

              <ErrorMessage isInputField message={errorSize} />
            </Animated.View>
          </View>

          <View style={styles.footerContainer}>
            <Divider />
            <NewUserPaginationBar />
            <NewUserJourneyContinueButton
              value="Continue"
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
  centerContainer: {
    flex: 3,
    paddingHorizontal: _size(10),
    paddingVertical: _size(10),
    gap: _size(20),
  },

  minText: {
    color: Color.Black[80],
  },

  inputContainer: {
    gap: _size(10),
  },

  inputText: {},
  footerContainer: {
    paddingTop: _size(20),
    gap: _size(10),
  },
});

export default FlatDetailsScreen;
