import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  SafeAreaView,
  Pressable,
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
import {descriptionSchema} from 'lib/zodSchema';

//Constants  📊
import {MIN_DESCRIPTION_CHARS} from 'components/componentData/constants';
// Helpers 🤝
import {size} from 'react-native-responsive-sizes';
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';
import DatePicker from 'react-native-date-picker';
import {dateFormatConverter} from 'helpers/dateFormatConverter';

const NameProfileScreen = () => {
  //Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  //Local State
  const [text, setText] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [textFocus, setTextFocus] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  //Redux
  const {setCurrentScreen, currentScreen} = useNewUserCurrentScreen();
  const {isLessor, setNewUserDetails, newUserDetails} = useNewUserDetails();
  const savedDescription = newUserDetails.description;

  useEffect(() => {
    if (savedDescription) {
      setText(savedDescription);
    }
  }, [savedDescription]);

  const handleFirstName = (input: string) => {
    setFirstName(input);
  };

  const handleLastName = (input: string) => {
    setLastName(input);
  };

  const handleOnChange = (input: string) => {
    setText(input);
  };
  const handleOnFocus = () => {
    setIsModalOpen(true);
  };

  const handleOnBlur = () => {
    setTextFocus(false);
  };

  const handleDateChange = (input: Date) => {
    setDate(input);
    setIsModalOpen(false);
  };

  const handleCancelDate = () => {
    setIsModalOpen(false);
  };

  const handleBackButton = () => {
    setCurrentScreen(currentScreen - 1);
    navigation.goBack();
    setError('');
  };
  const handleContinue = () => {
    const result = descriptionSchema.safeParse(text);
    if (!result.success) {
      console.log('description Error', result.error.flatten().formErrors?.[0]);
      setError(result.error.flatten().formErrors?.[0]);
      return;
    }
    setNewUserDetails({description: text});

    setCurrentScreen(currentScreen + 1);
    const screen = isLessor
      ? newUserScreens.lessor[currentScreen + 1]
      : newUserScreens.renter[currentScreen + 1];
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
          headlineText="A bit more about you..."
          subDescription="How others should call you? Uploading a picture gets more attention!"
        />
        <View style={styles.mainContainer}>
          <View style={styles.textContainer}>
            <Text style={[fontStyles.bodyExtraSmall, styles.minText]}>
              First Name
            </Text>
            <InputFieldText
              placeholder="Which name do you go by?"
              value={firstName}
              onChangeText={handleFirstName}
            />
            {error && <ErrorMessage message={error} />}

            <Text style={[fontStyles.bodyExtraSmall, styles.minText]}>
              Last Name
            </Text>
            <InputFieldText
              placeholder="To be more authentic"
              value={lastName}
              onChangeText={handleLastName}
            />
            {error && <ErrorMessage message={error} />}

            <Text style={[fontStyles.bodyExtraSmall, styles.minText]}>
              Date of Birth
            </Text>
            <Pressable onPress={() => setIsModalOpen(true)}>
              <View style={styles.dateInput}>
                <Text style={[fontStyles.bodyMedium, styles.dateText]}>
                  {dateFormatConverter({date: date})}
                </Text>
              </View>
            </Pressable>
            <DatePicker
              modal
              mode="date"
              open={isModalOpen}
              date={date}
              onConfirm={handleDateChange}
              onCancel={handleCancelDate}
            />
          </View>

          <View style={styles.footerContainer}>
            <Divider />
            {error && <ErrorMessage message={error} />}
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
    paddingHorizontal: size(10),
    paddingVertical: size(10),
    gap: size(10),
  },
  dateInput: {
    marginBottom: size(8),
    borderWidth: size(2),
    borderRadius: size(12),
    borderColor: Color.Black[50],
    paddingHorizontal: size(8),
    height: size(48),
    justifyContent: 'center',
  },

  dateText: {
    color: Color.Black[100],
    marginLeft: size(10),
  },

  minText: {
    color: Color.Black[80],
  },

  inputText: {
    borderWidth: size(2),
    paddingLeft: size(10),
    paddingVertical: size(5),
    flex: 1,
    borderRadius: 16,
  },
  footerContainer: {
    paddingTop: size(20),
    paddingBottom: size(20),
    paddingHorizontal: size(16),
    gap: size(10),
  },
});

export default NameProfileScreen;
