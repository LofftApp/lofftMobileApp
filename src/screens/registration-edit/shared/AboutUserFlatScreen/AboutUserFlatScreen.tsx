import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

//Redux 📦
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';
import {useUserType} from 'reduxFeatures/user/useUserType';

//Screens 📺
import {useAboutUserFlatScreen} from './useAboutUserFlatScreen';

// Components 🪢
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import HeadlineContainer from 'components/containers/HeadlineContainer';
import SelectionButton from 'components/buttons/SelectionButton';
import Divider from 'components/bars/Divider';
import BackButton from 'components/buttons/BackButton';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import PopoverContent from 'components/modals/CustomPopover';

// Lib 📚
import Popover, {
  PopoverMode,
  PopoverPlacement,
} from 'react-native-popover-view';

// StylesSheet 🖼️
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import Color from 'styleSheets/lofftColorPallet.json';

//Assets 🎨
import {RegistrationBackground} from 'assets';

// Constants 📊
import {
  MAX_SELECTED_CHARS,
  MIN_SELECTED_CHARS,
} from 'components/componentData/constants';

// Helper 🤝
import {size} from 'react-native-responsive-sizes';

// Types 🏷 ️

const AboutUserFlatScreen = ({
  route,
}: {
  route?: {params: {edit: boolean; advertId: number}};
}) => {
  const edit = route?.params?.edit;
  const advertId = route?.params?.advertId;

  //Safe Area
  const insets = useSafeAreaInsets();
  const {height, width} = useWindowDimensions();

  const {isLessor} = useUserType();
  const {isNewUserLessor} = useNewUserDetails(isLessor, edit);

  const {
    selectedCharsIds,
    handleSelectChars,
    handleContinue,
    handleBackButton,
    error,
    isAdvertLoading,
    isAdvertError,
    characteristics,
    showPopover,
    setShowPopover,
  } = useAboutUserFlatScreen(edit, advertId);

  if (isAdvertLoading) {
    return <LoadingComponent />;
  }

  if (isAdvertError) {
    return (
      <NotFoundComponent
        message="We couldn't retrieve the advert details"
        backButton
        onPress={handleBackButton}
      />
    );
  }

  const charsButtons = characteristics?.map(char => {
    return (
      <SelectionButton
        key={char.id}
        id={char.id}
        emojiIcon={char.emoji}
        value={char.name}
        toggle={selectedCharsIds.includes(char.id)}
        selectFn={handleSelectChars}
        disabled={
          selectedCharsIds.length === MAX_SELECTED_CHARS &&
          !selectedCharsIds.includes(char.id)
        }
      />
    );
  });
  return (
    <View
      style={[
        CoreStyleSheet.safeAreaViewShowContainer,
        {
          paddingTop: insets.top,
        },
      ]}>
      <BackButton onPress={handleBackButton} />
      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />
      <View style={CoreStyleSheet.screenContainer}>
        <HeadlineContainer
          headlineText={
            isNewUserLessor || isLessor
              ? 'Tell us a bit about your flat'
              : 'Tell us a bit about yourself'
          }
          subDescription={
            isNewUserLessor || isLessor
              ? `Select at least ${MIN_SELECTED_CHARS} tags that describe your Lofft lifestyles. More tags selected, more likelihood you'll find the right crowd!`
              : `Select at least ${MIN_SELECTED_CHARS} tags that describe who you are and your lifestyles. More tags selected, more likelihood you'll find the right crowd in a Lofft!`
          }
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.selectionContainer}>{charsButtons}</View>
        </ScrollView>
        <Divider />
        <View style={[styles.footerContainer]}>
          <View style={styles.tagInfoContainer}>
            <Text
              style={
                fontStyles.bodySmall
              }>{`* Select at least ${MIN_SELECTED_CHARS} tags`}</Text>
          </View>
          {error ||
            (selectedCharsIds.length === MAX_SELECTED_CHARS && (
              <ErrorMessage
                message={
                  error ||
                  `You have selected maximum of ${MAX_SELECTED_CHARS} tags`
                }
              />
            ))}
          {!edit && <NewUserPaginationBar />}

          <NewUserJourneyContinueButton
            value="Continue"
            disabled={selectedCharsIds.length < MIN_SELECTED_CHARS}
            onPress={handleContinue}
          />
        </View>
      </View>
      <Popover
        mode={PopoverMode.RN_MODAL}
        popoverStyle={[
          styles.popoverContainer,
          {width: width * 0.95, height: height * 0.15},
        ]}
        // from={new Rect(width * 0.29, height * 0.27, 0, 0)}
        isVisible={showPopover}
        placement={PopoverPlacement.TOP}
        arrowSize={{width: 0, height: 0}}
        onRequestClose={() => setShowPopover(false)}>
        <PopoverContent
          text1="You have unsaved changes"
          icon1="info-circle"
          text2="To keep the changes, click on Continue and then Save."
          setShowPopover={setShowPopover}
          button
        />
      </Popover>
    </View>
  );
};

const styles = StyleSheet.create({
  selectionContainer: {
    marginTop: size(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: size(10),
  },
  tagInfoContainer: {
    marginBottom: size(5),
  },
  footerContainer: {
    paddingTop: size(20),
  },
  popoverContainer: {
    backgroundColor: Color.Mint[20],
    paddingHorizontal: size(10),
    borderRadius: 12,
    borderColor: Color.Mint[20],

    flexDirection: 'row',
    alignItems: 'center',
  },
  popoverContent: {
    flex: 1,
    paddingHorizontal: size(8),
    justifyContent: 'center',
    gap: size(10),
  },
  popoverText: {flexDirection: 'row', alignItems: 'center', gap: size(5)},

  buttonStyle: {
    backgroundColor: Color.Lavendar[100],
    borderColor: Color.Lavendar[100],
    borderRadius: 12,
    borderWidth: 2,
    width: size(70),
    height: size(41),
  },
});

export default AboutUserFlatScreen;
