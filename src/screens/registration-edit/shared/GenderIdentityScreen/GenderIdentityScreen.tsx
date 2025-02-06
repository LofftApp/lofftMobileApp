import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

//Hooks 🪝
import {useGenderIdentityScreen} from './useGenderIdentityScreen';

//Styles 🎨
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Assets
import {RegistrationBackground} from 'assets';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import SelectionButton from 'components/buttons/SelectionButton';
import BackButton from 'components/buttons/BackButton';
import NewUserJourneyContinueButton from 'components/buttons/NewUserJourneyContinueButton';
import NewUserPaginationBar from 'components/buttons/NewUserPaginationBar';
import Divider from 'components/bars/Divider';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';

// Helper 🤝
import {size} from 'react-native-responsive-sizes';

//Constants 📊
import {MAX_GENDERS} from 'components/componentData/constants';
import EditScreensPopover from 'components/modals/EditScreensPopover';

//Types 🏷  ️

const GenderIdentityScreen = ({route}: {route?: {params: {edit: boolean}}}) => {
  const edit = route?.params?.edit;

  const {
    handleBackButton,
    handleContinue,
    selectGender,
    selectedGenderIds,
    genders,
    error,
    isLessor,
    showPopover,
    setShowPopover,
  } = useGenderIdentityScreen(edit);

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
          headlineText={'What is your gender identity?'}
          subDescription={'To help you find the right match'}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.selectionContainer}>
            {genders.map(el => (
              <SelectionButton
                key={el.id}
                value={el.name}
                toggle={selectedGenderIds.includes(el.id)}
                id={el.id}
                emojiIcon={el.emoji}
                selectFn={selectGender}
              />
            ))}
          </View>
        </ScrollView>
        <Divider />

        <View style={styles.footerContainer}>
          {error && <ErrorMessage message={error} />}
          {!edit && <NewUserPaginationBar />}
          <NewUserJourneyContinueButton
            value={edit ? (isLessor ? 'Save' : 'Continue') : 'Continue'}
            disabled={
              selectedGenderIds.length === 0 ||
              selectedGenderIds.length > MAX_GENDERS
            }
            onPress={handleContinue}
          />
        </View>
      </View>
      <EditScreensPopover
        showPopover={showPopover}
        setShowPopover={setShowPopover}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  selectionContainer: {
    marginTop: size(10),
    paddingHorizontal: size(10),
  },
  tagInfoContainer: {
    marginBottom: size(5),
  },
  footerContainer: {
    paddingTop: size(20),
  },
});

export default GenderIdentityScreen;
