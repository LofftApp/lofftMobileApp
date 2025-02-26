import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';

//Hooks 🪝
import {useSafeSpaceForScreen} from './useSafeSpaceForScreen';

//Styles 🎨
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {fontStyles} from 'styleSheets/fontStyles';

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
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';

// Helper 🤝
import {size} from 'react-native-responsive-sizes';

//Constants
import {MAX_GENDERS} from 'components/componentData/constants';
import NewUserScreensPopover from 'components/modals/NewUserScreensPopover';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';
import OpacityOverlay from 'components/modals/OpacityOverlay';

const SafeSpaceForScreen = ({
  route,
}: {
  route?: {params: {edit: boolean; advertId: number; newValue: boolean}};
}) => {
  const edit = route?.params?.edit || false;
  const advertId = route?.params?.advertId || 0;
  const newValue = route?.params?.newValue || false;

  const {
    handleBackButton,
    handleContinue,
    selectSafeSpace,
    selectedSafeSpaceIds,
    safeSpaces,
    error,
    isAdvertLoading,
    isAdvertError,
    isLessor,
    isNewUserLessor,
    showPopover,
    setShowPopover,
    isEditProfileLoading,
    isEditProfileError,
    isEditFlatLoading,
    isEditFlatError,
  } = useSafeSpaceForScreen(edit, advertId, newValue);

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

  return (
    <>
      <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
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
                ? 'Your flat is a safe place for...'
                : 'What is a safe place for you?'
            }
          />

          <FlatList
            data={safeSpaces}
            keyExtractor={space => space.id.toString()}
            renderItem={({item}) => (
              <SelectionButton
                id={item.id}
                emojiIcon={item.emoji}
                value={item.name}
                toggle={selectedSafeSpaceIds.includes(item.id)}
                selectFn={selectSafeSpace}
                disabled={
                  selectedSafeSpaceIds.length === MAX_GENDERS &&
                  !selectedSafeSpaceIds.includes(item.id)
                }
                isReady={!isAdvertLoading}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.selectionContainer}
          />
          <Divider />

          <View style={styles.footerContainer}>
            <View style={styles.tagInfoContainer}>
              <Text
                style={
                  fontStyles.bodySmall
                }>{`* Select up to ${MAX_GENDERS} tags`}</Text>
            </View>

            {(error || isEditProfileError || isEditFlatError) && (
              <ErrorMessage message={error as string} />
            )}
            {!edit && <NewUserPaginationBar />}
            <NewUserJourneyContinueButton
              value={
                edit ? (
                  isEditProfileLoading || isEditFlatLoading ? (
                    <LoadingButtonIcon />
                  ) : (
                    'Save'
                  )
                ) : (
                  'Continue'
                )
              }
              disabled={
                selectedSafeSpaceIds.length === 0 ||
                selectedSafeSpaceIds.length > MAX_GENDERS ||
                isEditProfileLoading ||
                isEditFlatLoading
              }
              onPress={handleContinue}
            />
          </View>
        </View>
        <NewUserScreensPopover
          showPopover={showPopover}
          setShowPopover={setShowPopover}
          save={edit}
        />
      </SafeAreaView>
      <OpacityOverlay
        loadingState={isEditProfileLoading || isEditFlatLoading}
      />
    </>
  );
};

const styles = StyleSheet.create({
  selectionContainer: {
    marginTop: size(10),
    paddingHorizontal: size(10),
    gap: size(10),
  },
  tagInfoContainer: {
    marginBottom: size(5),
  },
  footerContainer: {
    paddingTop: size(20),
  },
});

export default SafeSpaceForScreen;
