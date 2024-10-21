import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//Redux
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useImagesToUpload} from 'reduxFeatures/imageHandling/useImagesToUpload';

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
import DatePicker from 'react-native-date-picker';
import ImagePreviewRow from 'components/imageUpload/ImagePreviewRow';
import DatePickerInput from 'components/coreComponents/inputField/inputs/DatePickerInput';
import UploadImageButton from 'components/imageUpload/UploadImageButton';
import UploadImageModal from 'components/modals/UploadImageModal';

// Styles 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {fontStyles} from 'styleSheets/fontStyles';

//Assets 🎨
import {RegistrationBackground} from 'assets';

//Validation 🛡 ️
import {nameSchema} from 'lib/zodSchema';

//Constants 📊
import {MAX_USER_IMAGES} from 'components/componentData/constants';

// Helpers 🤝
import {size} from 'react-native-responsive-sizes';

//Types 🏷 ️
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';

const NameProfileScreen = () => {
  //Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  //Local State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorDate, setErrorDate] = useState('');
  const [errorImage, setErrorImage] = useState('');

  //Redux
  const {setCurrentScreen, currentScreen} = useNewUserCurrentScreen();
  const {imagesToUpload, clearImagesToUpload, setSavedImages, savedImages} =
    useImagesToUpload();
  const {isLessor, setNewUserDetails, newUserDetails} = useNewUserDetails();
  const savedFirstName = newUserDetails.firstName;
  const savedLastName = newUserDetails.lastName;
  const savedDate = newUserDetails.dateOfBirth;
  const totalImages =
    (isLessor
      ? savedImages.lessor.userImages.length
      : savedImages.tenant.userImages.length) + imagesToUpload.length;

  useEffect(() => {
    if (savedFirstName) {
      setFirstName(savedFirstName);
    }
    if (savedLastName) {
      setLastName(savedLastName);
    }
    if (savedDate) {
      setDate(new Date(savedDate));
      setIsDateSelected(true);
    }
    if (
      savedImages.lessor.userImages.length > 0 ||
      savedImages.tenant.userImages.length > 0
    ) {
      setSavedImages({
        userType: isLessor ? 'lessor' : 'tenant',
        imageType: 'user',
        images: isLessor
          ? savedImages.lessor.userImages
          : savedImages.tenant.userImages,
      });
    }
  }, [
    savedFirstName,
    savedLastName,
    savedDate,
    isLessor,
    savedImages.tenant.userImages,
    savedImages.lessor.userImages,
    setSavedImages,
  ]);

  useEffect(() => {
    if (totalImages > MAX_USER_IMAGES) {
      setErrorImage(`You can only upload ${MAX_USER_IMAGES} images`);
    } else {
      setErrorImage('');
    }
  }, [totalImages]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  });

  const handleFirstName = (input: string) => {
    setFirstName(input);
    setErrorFirstName('');
  };

  const handleLastName = (input: string) => {
    setLastName(input);
    setErrorLastName('');
  };

  const handleOnPressDatePicker = () => {
    setIsDatePickerOpen(true);
  };

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
    setErrorImage('');
  };

  const handleDateChange = (input: Date) => {
    setDate(input);
    setIsDatePickerOpen(false);
    setIsDateSelected(true);
    setErrorDate('');
  };

  const handleCancelDate = () => {
    setIsDatePickerOpen(false);
  };

  const handleBackButton = () => {
    setCurrentScreen(currentScreen - 1);
    navigation.goBack();
    setErrorFirstName('');
    setErrorLastName('');
    setErrorDate('');
    setErrorImage('');
    clearImagesToUpload();
  };

  const handleContinue = () => {
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const concatImages = isLessor
      ? [...imagesToUpload, ...savedImages.lessor.userImages]
      : [...imagesToUpload, ...savedImages.tenant.userImages];

    const result = nameSchema.safeParse({
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      dateOfBirth: isDateSelected ? date : undefined,
      images: concatImages,
    });

    if (!result.success) {
      const firstError = result.error.flatten().fieldErrors?.firstName?.[0];
      const lastError = result.error.flatten().fieldErrors?.lastName?.[0];
      const dateError = result.error.flatten().fieldErrors?.dateOfBirth?.[0];
      const imageError = result.error.flatten().fieldErrors?.images?.[0];

      if (firstError) {
        setErrorFirstName(firstError);
      }
      if (lastError) {
        setErrorLastName(lastError);
      }
      if (dateError) {
        setErrorDate(dateError);
      }
      if (imageError) {
        setErrorImage(imageError);
      }
      return;
    }

    setNewUserDetails({
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      dateOfBirth: result.data.dateOfBirth.toISOString(),
    });

    setCurrentScreen(currentScreen + 1);
    const screen = isLessor
      ? newUserScreens.lessor[currentScreen + 1]
      : newUserScreens.tenant[currentScreen + 1];
    navigation.navigate(screen);

    setErrorFirstName('');
    setErrorLastName('');
    setErrorDate('');
    setErrorImage('');
    setTimeout(() => {
      setSavedImages({
        userType: isLessor ? 'lessor' : 'tenant',
        imageType: 'user',
        images: result.data.images,
      });
      clearImagesToUpload();
    }, 1000);
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
          headlineText="A bit more about you..."
          subDescription="How others should call you? Uploading a picture gets more attention!"
        />
        <View style={styles.mainContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.centerContainer}>
              <Animated.View
                style={[styles.inputContainer, {opacity: fadeAnim}]}>
                <Text style={[fontStyles.headerSmall, styles.minText]}>
                  First Name
                </Text>
                <InputFieldText
                  placeholder="Which name do you go by?"
                  value={firstName}
                  onChangeText={handleFirstName}
                  errorMessage={errorFirstName}
                />
                {errorFirstName && (
                  <ErrorMessage isInputField message={errorFirstName} />
                )}
              </Animated.View>
              <Animated.View
                style={[styles.inputContainer, {opacity: fadeAnim}]}>
                <Text style={[fontStyles.headerSmall, styles.minText]}>
                  Last Name
                </Text>
                <InputFieldText
                  placeholder="To be more authentic"
                  value={lastName}
                  onChangeText={handleLastName}
                  errorMessage={errorLastName}
                />
                {errorLastName && (
                  <ErrorMessage isInputField message={errorLastName} />
                )}
              </Animated.View>
              <Animated.View
                style={[styles.inputContainer, {opacity: fadeAnim}]}>
                <Text style={[fontStyles.headerSmall, styles.minText]}>
                  Date of Birth
                </Text>
                <DatePickerInput
                  date={date}
                  handleOnPress={handleOnPressDatePicker}
                  error={errorDate}
                  dateSelected={isDateSelected}
                />
                {errorDate && <ErrorMessage isInputField message={errorDate} />}
              </Animated.View>
              <DatePicker
                modal
                mode="date"
                open={isDatePickerOpen}
                date={date}
                onConfirm={handleDateChange}
                onCancel={handleCancelDate}
              />
              <Animated.View
                style={[styles.imagesContainer, {opacity: fadeAnim}]}>
                <UploadImageButton
                  onPress={toggleModal}
                  error={errorImage}
                  imageType="user"
                />

                <ImagePreviewRow imageType="user" />
                <UploadImageModal
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                />
              </Animated.View>
            </View>
          </ScrollView>

          <View style={styles.footerContainer}>
            <Divider />
            {errorImage && <ErrorMessage message={errorImage} />}
            <NewUserPaginationBar />
            <NewUserJourneyContinueButton
              value="Continue"
              onPress={handleContinue}
              disabled={!isDateSelected || !firstName || !lastName}
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
    paddingHorizontal: size(10),
    paddingVertical: size(10),
    gap: size(20),
  },
  inputContainer: {
    gap: size(10),
  },

  minText: {
    color: Color.Black[100],
  },

  imagesContainer: {
    gap: size(20),
  },

  footerContainer: {
    paddingBottom: size(20),
    paddingHorizontal: size(16),
    gap: size(10),
  },
});

export default NameProfileScreen;
