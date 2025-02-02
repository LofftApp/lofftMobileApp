import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, SafeAreaView, Animated} from 'react-native';
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
import CustomTextInput from 'components/coreComponents/inputField/inputs/CustomTextInput';

// Styles 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Assets 🎨
import {RegistrationBackground} from 'assets';

//Validation 🛡 ️
import {flatDescriptionSchema} from 'lib/zodSchema';

//Constants  📊
import {MIN_DESCRIPTION_CHARS} from 'components/componentData/constants';
// Helpers 🤝
import {size} from 'react-native-responsive-sizes';

//Types 🏷️
import {NewUserJourneyStackNavigation} from 'navigationStacks/types';
import {useUserType} from 'reduxFeatures/user/useUserType';
import {useGetAdvertByIdQuery} from 'reduxFeatures/adverts/advertApi';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';

const FlatDescribeScreen = ({
  route,
}: {
  route?: {params: {edit: boolean; advertId: number}};
}) => {
  const edit = route?.params?.edit;
  const advertId = route?.params?.advertId;
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
  const {
    data: advert,
    isLoading,
    isError,
  } = useGetAdvertByIdQuery(advertId ?? 0, {
    skip: !edit,
  });
  const savedDescription =
    newUserDetails.userType === 'lessor' && newUserDetails.flatDescription;

  useEffect(() => {
    if (savedDescription) {
      setText(savedDescription);
    }

    if (edit && advert?.flat.description) {
      setText(advert.flat.description);
    }
  }, [savedDescription, edit, advert, advert?.flat.description]);

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
    if (!edit) {
      setCurrentScreen(currentScreen - 1);
    }
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

    if (edit) {
      navigation.goBack();
      navigation.goBack();
    } else {
      setCurrentScreen(currentScreen + 1);
      const screen = newUserScreens.lessor[currentScreen + 1];

      navigation.navigate(screen);
    }

    setError('');
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isError) {
    return (
      <NotFoundComponent
        message="We couldn't retrieve the advert details"
        backButton
        onPress={handleBackButton}
      />
    );
  }

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
          headlineText={"It's your turn!"}
          subDescription={
            'Describe your flat in a short text. This can be edited later!'
          }
        />
        <View style={styles.mainContainer}>
          <Animated.View style={{opacity: fadeAnim}}>
            <CustomTextInput
              text={text}
              textFocus={textFocus}
              error={error}
              handleOnChange={handleOnChange}
              handleOnFocus={handleOnFocus}
              handleOnBlur={handleOnBlur}
              placeholder={'Tell us about your lofft.'}
              isFlat={isNewUserLessor || isLessor}
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
    gap: size(10),
  },
});

export default FlatDescribeScreen;
