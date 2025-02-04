import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//Redux
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

//Hooks 🪝
import {useUserType} from 'reduxFeatures/user/useUserType';
import {useFadeInAnimation} from 'hooks/useFadeInAnimation';

// Screens 📺
import {newUserScreens} from 'navigationStacks/newUserScreens';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import BackButton from 'components/buttons/BackButton';
import Divider from 'components/bars/Divider';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import CustomTextInput from 'components/coreComponents/inputField/inputs/CustomTextInput';

// Styles 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Assets 🎨
import {RegistrationBackground} from 'assets';

//Validation 🛡 ️
import {selfDescriptionSchema} from 'lib/zodSchema';

//Constants  📊
import {MIN_DESCRIPTION_CHARS} from 'components/componentData/constants';
// Helpers 🤝
import {size} from 'react-native-responsive-sizes';

//Types 🏷️
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';

const UserDescribeScreen = ({route}: {route?: {params: {edit: boolean}}}) => {
  const edit = route?.params?.edit;
  //Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  //Local State
  const [text, setText] = useState('');
  const [textFocus, setTextFocus] = useState(false);
  const [error, setError] = useState('');

  //Redux
  const {setCurrentScreen, currentScreen} = useNewUserCurrentScreen();
  const {isLessor} = useUserType();
  const {setNewUserDetails, newUserDetails, isNewUserLessor} =
    useNewUserDetails(isLessor, edit);
  const savedDescription = newUserDetails.selfDescription;

  const {data: currentUser} = useGetUserQuery(undefined, {skip: !edit});

  const {fadeInAnim} = useFadeInAnimation();

  useEffect(() => {
    // New User
    if (savedDescription) {
      setText(savedDescription);
    }
    // Edit User Profile
    if (edit && currentUser?.profile.description) {
      setText(currentUser.profile.description);
    }
  }, [savedDescription, currentUser, edit, currentUser?.profile.description]);

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
    if (!edit) {
      setCurrentScreen(currentScreen - 1);
    }
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

    if (edit) {
      navigation.goBack();
      navigation.goBack();
    } else {
      setCurrentScreen(currentScreen + 1);
      const screen = isNewUserLessor
        ? newUserScreens.lessor[currentScreen + 1]
        : newUserScreens.tenant[currentScreen + 1];
      navigation.navigate(screen);
    }

    setError('');
  };

  console.log('NewuSer', newUserDetails);

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
            edit
              ? 'Describe yourself in a short text'
              : "Describe yourself in a short text. Don't worry, this can be updated later."
          }
        />
        <View style={styles.mainContainer}>
          <Animated.View style={{opacity: fadeInAnim}}>
            <CustomTextInput
              text={text}
              textFocus={textFocus}
              error={error}
              handleOnChange={handleOnChange}
              handleOnFocus={handleOnFocus}
              handleOnBlur={handleOnBlur}
              placeholder={'Who are you? What do you like?'}
            />
          </Animated.View>
        </View>

        <View style={styles.footerContainer}>
          <Divider />
          {!edit && <NewUserPaginationBar />}
          <NewUserJourneyContinueButton
            value={edit ? 'Save' : 'Continue'}
            disabled={text.length < MIN_DESCRIPTION_CHARS}
            onPress={handleContinue}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 4,
  },

  minText: {
    color: Color.Black[80],
  },

  inputText: {
    borderWidth: 2,
    paddingLeft: size(10),
    paddingVertical: size(5),
    borderRadius: 12,
    height: size(10),
  },
  footerContainer: {
    flex: 1,
    paddingTop: size(20),
    paddingBottom: size(20),
    gap: size(10),
  },
});

export default UserDescribeScreen;
