import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Modal,
  SafeAreaView,
  ScrollView,
} from 'react-native';

// Screens 📺
import ScreenBackButton from 'components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import FooterNavBarWithPagination from 'components/bars/FooterNavBarWithPagination';
import {CoreButton} from 'components/buttons/CoreButton';
// import ImageUploadButton from 'reduxFeatures/imageHandling/ImageUploadButton';
import ImagePreviewRow from 'reduxFeatures/imageHandling/ImagePreviewRow';
import UploadImageButton from 'reduxFeatures/imageHandling/UploadImageButton';

// Styles 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Helpers 🤝
import {navigationHelper} from 'helpers/navigationHelper';
import {useNavigation} from '@react-navigation/native';
import {size} from 'react-native-responsive-sizes';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import BackButton from 'components/buttons/BackButton';
import {RegistrationBackground} from 'assets';
import CustomTextInput from 'components/coreComponents/inputField/inputs/CustomTextInput';
import Divider from 'components/bars/Divider';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import {MIN_DESCRIPTION_CHARS} from 'components/componentData/constants';
import {newUserScreens} from 'components/componentData/newUserScreens';
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {flatDescriptionSchema} from 'lib/zodSchema';

const FlatPhotoUploadScreen = () => {
  const navigation = useNavigation<NewUserJourneyStackNavigation>();
  const [text, setText] = useState('');
  const [textFocus, setTextFocus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');
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
    <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
      <BackButton onPress={handleBackButton} />
      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />
      <View style={CoreStyleSheet.screenContainer}>
        <HeadlineContainer
          headlineText="Show us how the flat looks like."
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
          <ImagePreviewRow />
          <UploadImageButton onPress={() => setModalVisible(true)} />

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
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <CoreButton
              value="Take Photo"
              onPress={() => {}}
              // ! Disabled to be removed before production in new repo.
              disabled={true}
            />
            {/* This image upload has been disabled and needs refactoring */}
            {/* <ImageUploadButton onPress={() => setModalVisible(false)} /> */}
            <CoreButton
              value="Cancel"
              onPress={() => setModalVisible(false)}
              invert
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },

  centeredView: {
    backgroundColor: Color.BlackOpacity[30],
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    minHeight: size(250),
    justifyContent: 'space-evenly',
    width: '100%',
    backgroundColor: Color.White[100],
    borderTopLeftRadius: size(16),
    borderTopRightRadius: size(16),
    paddingHorizontal: size(35),
    paddingBottom: size(35),
    shadowColor: '#000',
    shadowOffset: {
      width: size(2),
      height: size(2),
    },
    shadowOpacity: 0.5,
    shadowRadius: size(4),
    elevation: 5,
  },
  footerContainer: {
    paddingTop: size(20),
    paddingBottom: size(20),
    paddingHorizontal: size(16),
    gap: size(10),
  },
});

export default FlatPhotoUploadScreen;
