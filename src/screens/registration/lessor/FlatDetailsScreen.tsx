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
import {
  NewUserJourneyStackNavigation,
  SettingsScreenNavigationProp,
} from 'navigationStacks/types';
import {useUserType} from 'reduxFeatures/user/useUserType';
import {useGetAdvertByIdQuery} from 'reduxFeatures/adverts/advertApi';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import {useFadeInAnimation} from 'hooks/useFadeInAnimation';

const FlatDetailsScreen = ({
  route,
}: {
  route?: {params: {edit: boolean; advertId: number}};
}) => {
  const edit = route?.params?.edit;
  const advertId = route?.params?.advertId;
  //Navigation
  const navigation = useNavigation<
    NewUserJourneyStackNavigation & SettingsScreenNavigationProp
  >();

  //Local State
  const [tagLine, setTagLine] = useState('');
  const [size, setSize] = useState('');
  const [errorTagLine, setErrorTagLine] = useState('');
  const [errorSize, setErrorSize] = useState('');

  //Redux
  const {setCurrentScreen, currentScreen} = useNewUserCurrentScreen();
  const {isLessor} = useUserType();
  const {setNewUserDetails, newUserDetails} = useNewUserDetails(isLessor, edit);
  const {
    data: advert,
    isLoading,
    isError,
  } = useGetAdvertByIdQuery(advertId ?? 0, {skip: !edit});
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

    if (edit && advert?.flat.tagLine) {
      setTagLine(advert.flat.tagLine);
    }
    if (edit && advert?.flat.size) {
      setSize(advert.flat.size.toString());
    }
  }, [
    savedTagLine,
    savedSize,
    edit,
    advert,
    advert?.flat.tagLine,
    advert?.flat.size,
  ]);

  //animation
  const {fadeInAnim} = useFadeInAnimation();

  const handleTagLineChange = (input: string) => {
    setTagLine(input);
    setErrorTagLine('');
  };

  const handleSizeChange = (input: string) => {
    setSize(input);
    setErrorSize('');
  };

  const handleBackButton = () => {
    if (!edit) {
      setCurrentScreen(currentScreen - 1);
    }
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

    if (edit) {
      navigation.navigate('NewUserNavigator', {
        screen: 'FlatDescribeScreen',
        params: {edit: true, advertId},
      });
    } else {
      setCurrentScreen(currentScreen + 1);

      const screen = newUserScreens.lessor[currentScreen + 1];
      navigation.navigate(screen);
    }

    setErrorTagLine('');
    setErrorSize('');
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
          headlineText="Share some details about your flat"
          subDescription="Write a catchy headline to attract potential flatmates"
        />
        <View style={styles.mainContainer}>
          <View style={styles.centerContainer}>
            <Animated.View
              style={[styles.inputContainer, {opacity: fadeInAnim}]}>
              <InputFieldText
                value={tagLine}
                onChangeText={handleTagLineChange}
                placeholder={'Awesome flat in Moabit'}
              />

              <ErrorMessage isInputField message={errorTagLine} />
            </Animated.View>
            <Animated.View
              style={[styles.inputContainer, {opacity: fadeInAnim}]}>
              <Text style={[fontStyles.headerSmall, styles.minText]}>
                Flat size in m²
              </Text>

              <InputFieldText
                value={size}
                onChangeText={handleSizeChange}
                placeholder="68"
              />

              <ErrorMessage isInputField message={errorSize} />
            </Animated.View>
          </View>

          <View style={styles.footerContainer}>
            <Divider />
            {!edit && <NewUserPaginationBar />}
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

  footerContainer: {
    paddingTop: _size(20),
    gap: _size(10),
  },
});

export default FlatDetailsScreen;
