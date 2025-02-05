import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, SafeAreaView, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//Redux
import {useNewUserCurrentScreen} from 'reduxFeatures/registration/useNewUserCurrentScreen';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {
  useEditUserProfileMutation,
  useGetUserQuery,
} from 'reduxFeatures/user/userApi';

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
import {isEqualValue} from 'helpers/isEqualValue';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';
import {EditUserProfileParams} from 'reduxFeatures/user/types';

const UserDescribeScreen = ({
  route,
}: {
  route?: {params: {edit: boolean; newValue: boolean}};
}) => {
  const edit = route?.params?.edit;
  const newValue = route?.params?.newValue;
  console.log('newValue in describe screen', newValue);
  //Navigation
  const navigation = useNavigation<NewUserJourneyStackNavigation>();

  //Animation
  const {fadeInAnim} = useFadeInAnimation();

  //Local State
  const [text, setText] = useState('');
  const [textFocus, setTextFocus] = useState(false);
  const [error, setError] = useState('');

  //Redux
  const {setCurrentScreen, currentScreen} = useNewUserCurrentScreen();
  const {isLessor} = useUserType();
  const {
    setNewUserDetails,
    newUserDetails,
    isNewUserLessor,
    resetNewUserState,
  } = useNewUserDetails(isLessor, edit);
  const {data: currentUser} = useGetUserQuery(undefined, {skip: !edit});
  const [editUserProfile, {isLoading: isEditLoading}] =
    useEditUserProfileMutation();
  console.log('currentUser', currentUser);

  const savedDescription = useMemo(() => {
    if (edit) {
      return currentUser?.profile.description;
    } else {
      return newUserDetails.selfDescription;
    }
  }, [edit, newUserDetails.selfDescription, currentUser?.profile.description]);

  useEffect(() => {
    if (savedDescription) {
      setText(savedDescription);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const handleContinue = async () => {
    const trimmedText = text.trim();
    const result = selfDescriptionSchema.safeParse(trimmedText);
    if (!result.success) {
      setError(result.error.flatten().formErrors?.[0]);
      return;
    }

    setNewUserDetails({selfDescription: result.data});

    if (edit) {
      if (newValue || !isEqualValue(savedDescription, result.data)) {
        try {
          const editParams: EditUserProfileParams<'lessor' | 'tenant'> = {
            userId: currentUser?.id ?? 0,
            actionMethod: 'personalInfo',
            userType: isLessor ? 'lessor' : 'tenant',
            firstName: newUserDetails.firstName,
            lastName: newUserDetails.lastName,
            dateOfBirth: newUserDetails.dateOfBirth,
            selfDescription: result.data,
          };
          console.log('editParams', editParams);
          await editUserProfile(editParams).unwrap();
          setError('');
          navigation.goBack();
          navigation.goBack();
        } catch (err) {
          const typedError = err as {
            status?: number;
          };
          if (typedError.status === 422) {
            setError('Please fill out all the required fields');
          } else {
            setError('An error occurred, please try again');
          }
        }
      } else {
        navigation.goBack();
        navigation.goBack();
      }
      resetNewUserState();
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
            value={
              edit ? isEditLoading ? <LoadingButtonIcon /> : 'Save' : 'Continue'
            }
            disabled={text.length < MIN_DESCRIPTION_CHARS || isEditLoading}
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
