import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//Redux 📦
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';

// Screens 📺
import {newUserScreens} from 'components/componentData/newUserScreens';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import BackButton from 'components/buttons/BackButton';
import {RegistrationBackground} from 'assets';
import Divider from 'components/bars/Divider';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import CustomTextInput from 'components/coreComponents/inputField/inputs/CustomTextInput';
import UploadImageModal from 'components/modals/UploadImageModal';

// Styles 🖼️
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Validation 🛡️
import {flatDescriptionSchema} from 'lib/zodSchema';

//Constants 📊
import {MIN_DESCRIPTION_CHARS} from 'components/componentData/constants';

// Helpers 🤝
import {size} from 'react-native-responsive-sizes';

//Types 🏷️
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';

const FlatDescribeScreen = () => {
  //navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  //Local State
  const [text, setText] = useState('');
  const [textFocus, setTextFocus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');

  //Redux
  const {currentScreen, setCurrentScreen} = useNewUserCurrentScreen();
  const {newUserDetails, setNewUserDetails} = useNewUserDetails();
  const savedDescription =
    newUserDetails.userType === 'lessor' && newUserDetails.flatDescription;

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

  const handleBackButton = () => {
    setCurrentScreen(currentScreen - 1);
    navigation.goBack();
    setError('');
  };

  const handleContinue = () => {
    const trimmedText = text.trim();
    const result = flatDescriptionSchema.safeParse(trimmedText);
    if (!result.success) {
      setError(result.error.flatten().formErrors?.[0]);
      return;
    }

    setNewUserDetails({flatDescription: result.data});

    setCurrentScreen(currentScreen + 1);
    const screen = newUserScreens.lessor[currentScreen + 1];
    navigation.navigate(screen);
    setError('');
  };
  return (
    <>
      <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
        <BackButton onPress={handleBackButton} />
        <RegistrationBackground
          height="100%"
          width="100%"
          style={CoreStyleSheet.backgroundImage}
        />
        <View style={CoreStyleSheet.screenContainer}>
          <HeadlineContainer
            headlineText="Tell us how the flat looks like."
            subDescription="Describe your flat in a short text. This can be edited later!"
          />
          <View style={styles.mainContainer}>
            <CustomTextInput
              text={text}
              textFocus={textFocus}
              error={error}
              handleOnChange={handleOnChange}
              handleOnFocus={handleOnFocus}
              handleOnBlur={handleOnBlur}
              placeholder="Tell us about your lofft."
              isFlat
            />

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
      <UploadImageModal
        isModalOpen={modalVisible}
        setIsModalOpen={setModalVisible}
      />
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },

  footerContainer: {
    paddingTop: size(20),
    paddingBottom: size(20),
    paddingHorizontal: size(16),
    gap: size(10),
  },
});

export default FlatDescribeScreen;
