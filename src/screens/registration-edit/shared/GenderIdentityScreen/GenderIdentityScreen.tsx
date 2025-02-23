import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';

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
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';
import OpacityOverlay from 'components/modals/OpacityOverlay';
import NewUserScreensPopover from 'components/modals/NewUserScreensPopover';

// Helper 🤝
import {size} from 'react-native-responsive-sizes';

//Constants 📊
import {MAX_GENDERS} from 'components/componentData/constants';

const GenderIdentityScreen = ({route}: {route?: {params: {edit: boolean}}}) => {
  const edit = route?.params?.edit || false;

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
    isEditError,
    isEditLoading,
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

        <FlatList
          data={genders}
          keyExtractor={gender => gender.id.toString()}
          renderItem={({item}) => (
            <SelectionButton
              id={item.id}
              emojiIcon={item.emoji}
              value={item.name}
              toggle={selectedGenderIds.includes(item.id)}
              selectFn={selectGender}
              disabled={
                selectedGenderIds.length === MAX_GENDERS &&
                !selectedGenderIds.includes(item.id)
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.selectionContainer}
        />
        <Divider />

        <View style={styles.footerContainer}>
          {(error || isEditError) && <ErrorMessage message={error as string} />}
          {!edit && <NewUserPaginationBar />}
          <NewUserJourneyContinueButton
            value={
              edit ? (
                isLessor ? (
                  isEditLoading ? (
                    <LoadingButtonIcon />
                  ) : (
                    'Save'
                  )
                ) : (
                  'Continue'
                )
              ) : (
                'Continue'
              )
            }
            disabled={
              selectedGenderIds.length === 0 ||
              selectedGenderIds.length > MAX_GENDERS ||
              isEditLoading
            }
            onPress={handleContinue}
          />
        </View>
      </View>
      <NewUserScreensPopover
        showPopover={showPopover}
        setShowPopover={setShowPopover}
        save={isLessor && edit}
      />
      {isLessor && <OpacityOverlay loadingState={isEditLoading} />}
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
