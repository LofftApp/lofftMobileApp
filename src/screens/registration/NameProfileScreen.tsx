import React, {useEffect, useState} from 'react';
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
import DatePickerInput from 'components/coreComponents/inputField/inputs/DatePickerInput';

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
import {
  NewUserJourneyStackNavigation,
  SettingsScreenNavigationProp,
} from 'navigationStacks/types';
import {useUserType} from 'reduxFeatures/user/useUserType';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import {useFadeInAnimation} from 'hooks/useFadeInAnimation';

const NameProfileScreen = ({route}: {route?: {params: {edit: boolean}}}) => {
  const edit = route?.params?.edit;
  //Navigation
  const navigation = useNavigation<
    NewUserJourneyStackNavigation & SettingsScreenNavigationProp
  >();

  //Local State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorDate, setErrorDate] = useState('');
  const [errorImage, setErrorImage] = useState('');

  //Redux
  const {isLessor} = useUserType();
  const {setCurrentScreen, currentScreen} = useNewUserCurrentScreen();
  const {isNewUserLessor, setNewUserDetails, newUserDetails} =
    useNewUserDetails(isLessor, edit);
  const savedFirstName = newUserDetails.firstName;
  const savedLastName = newUserDetails.lastName;
  const savedDate = newUserDetails.dateOfBirth;
  console.log('NewUSerDetails', newUserDetails);
  const {data: currentUser} = useGetUserQuery();
  console.log('currentUser', currentUser);

  useEffect(() => {
    //New User
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

    //Edit User Profile
    if (edit && currentUser?.profile.firstName) {
      setFirstName(currentUser.profile.firstName);
    }
    if (edit && currentUser?.profile.lastName) {
      setLastName(currentUser.profile.lastName);
    }
    if (edit && currentUser?.profile.dateOfBirth) {
      setDate(new Date(currentUser.profile.dateOfBirth));
      setIsDateSelected(true);
    }
  }, [
    savedFirstName,
    savedLastName,
    savedDate,
    edit,
    currentUser?.profile.firstName,
    currentUser?.profile.lastName,
    currentUser?.profile.dateOfBirth,
  ]);

  const {fadeInAnim} = useFadeInAnimation();

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
  };

  const handleContinue = () => {
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    const result = nameSchema.safeParse({
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      dateOfBirth: isDateSelected ? date : undefined,
    });

    if (!result.success) {
      const firstError = result.error.flatten().fieldErrors?.firstName?.[0];
      const lastError = result.error.flatten().fieldErrors?.lastName?.[0];
      const dateError = result.error.flatten().fieldErrors?.dateOfBirth?.[0];

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
    console.log('result', result);

    setNewUserDetails({
      userType: isNewUserLessor || isLessor ? 'lessor' : 'tenant',
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      dateOfBirth: result.data.dateOfBirth.toISOString(),
    });

    if (edit) {
      navigation.navigate('NewUserNavigator', {
        screen: 'UserDescribeScreen',
        params: {edit: true},
      });
    } else {
      const screen = isNewUserLessor
        ? newUserScreens.lessor[currentScreen + 1]
        : newUserScreens.tenant[currentScreen + 1];
      navigation.navigate(screen);
      setCurrentScreen(currentScreen + 1);
    }

    setErrorFirstName('');
    setErrorLastName('');
    setErrorDate('');
    setErrorImage('');
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
          subDescription="How others should call you?"
        />
        <View style={styles.mainContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.centerContainer}>
              <Animated.View
                style={[styles.inputContainer, {opacity: fadeInAnim}]}>
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
                style={[styles.inputContainer, {opacity: fadeInAnim}]}>
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
                style={[styles.inputContainer, {opacity: fadeInAnim}]}>
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
            </View>
          </ScrollView>
        </View>

        <View style={styles.footerContainer}>
          <Divider />
          {errorImage && <ErrorMessage message={errorImage} />}
          {!edit && <NewUserPaginationBar />}
          <NewUserJourneyContinueButton
            value={'Continue'}
            onPress={handleContinue}
            disabled={!isDateSelected || !firstName || !lastName}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
    gap: size(10),
  },
});

export default NameProfileScreen;
