import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Text, SafeAreaView} from 'react-native';
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
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';
import DatePicker from 'react-native-date-picker';
import ImagePreviewRow from 'reduxFeatures/imageHandling/ImagePreviewRow';
import DatePickerInput from 'components/coreComponents/inputField/inputs/DatePickerInput';
import UploadImageButton from 'reduxFeatures/imageHandling/UploadImageButton';

// Styles 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {fontStyles} from 'styleSheets/fontStyles';

//Assets 🎨
import {RegistrationBackground} from 'assets';

//Validation 🛡 ️
import {nameSchema} from 'lib/zodSchema';

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
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorDate, setErrorDate] = useState('');

  //Redux
  const {setCurrentScreen, currentScreen} = useNewUserCurrentScreen();
  const {isLessor, setNewUserDetails, newUserDetails} = useNewUserDetails();
  const savedFirstName = newUserDetails.firstName;
  const savedLastName = newUserDetails.lastName;
  const savedDate = newUserDetails.dateOfBirth;

  useEffect(() => {
    if (savedFirstName) {
      setFirstName(savedFirstName);
    }
    if (savedLastName) {
      setLastName(savedLastName);
    }
    if (savedDate) {
      setDate(new Date(savedDate));
    }
  }, [savedFirstName, savedLastName, savedDate]);

  const handleFirstName = (input: string) => {
    setFirstName(input);
    setErrorFirstName('');
  };

  const handleLastName = (input: string) => {
    setLastName(input);
    setErrorLastName('');
  };

  const handleDateChange = (input: Date) => {
    setDate(input);
    setIsModalOpen(false);
    setIsDateSelected(true);
    setErrorDate('');
  };

  const handleCancelDate = () => {
    setIsModalOpen(false);
  };

  const handleBackButton = () => {
    setCurrentScreen(currentScreen - 1);
    navigation.goBack();
    setErrorFirstName('');
    setErrorLastName('');
    setErrorDate('');
  };

  const handleContinue = () => {
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const result = nameSchema.safeParse({
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      dateOfBirth: isDateSelected ? date : null,
    });

    if (!result.success) {
      const firstError = result.error.flatten().fieldErrors?.firstName?.[0];
      const lastError = result.error.flatten().fieldErrors?.lastName?.[0];
      const dateError = isDateSelected
        ? result.error.flatten().fieldErrors?.dateOfBirth?.[0]
        : 'Please select your date of birth';
      if (firstError) {
        setErrorFirstName(firstError);
      }
      if (lastError) {
        setErrorLastName(lastError);
      }
      if (dateError) {
        setErrorDate(dateError);
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
      : newUserScreens.renter[currentScreen + 1];
    navigation.navigate(screen);

    setErrorFirstName('');
    setErrorLastName('');
    setErrorDate('');
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
            <View style={styles.textContainer}>
              <Text style={[fontStyles.bodySmall, styles.minText]}>
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
              <Text style={[fontStyles.bodySmall, styles.minText]}>
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

              <Text style={[fontStyles.bodySmall, styles.minText]}>
                Date of Birth
              </Text>
              <DatePickerInput
                date={date}
                setOpen={setIsModalOpen}
                error={errorDate}
              />
              {errorDate && <ErrorMessage isInputField message={errorDate} />}
              <DatePicker
                modal
                mode="date"
                open={isModalOpen}
                date={date}
                onConfirm={handleDateChange}
                onCancel={handleCancelDate}
              />
              <ImagePreviewRow />
              <UploadImageButton />
            </View>
          </ScrollView>

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
  textContainer: {
    paddingHorizontal: size(10),
    paddingVertical: size(10),
    gap: size(10),
  },

  minText: {
    color: Color.Black[80],
  },

  footerContainer: {
    paddingTop: size(20),
    paddingBottom: size(20),
    paddingHorizontal: size(16),
    gap: size(10),
  },
});

export default NameProfileScreen;
