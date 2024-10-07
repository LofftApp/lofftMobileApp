import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Styles
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import Color from 'styleSheets/lofftColorPallet.json';

// Redux
import {
  useConfirmApplicationsMutation,
  useSeeApplicationsByAdvertIdQuery,
} from 'reduxFeatures/adverts/advertApi';
import {
  setApplicationsRound1,
  toggleRound1,
  toggleSelectAllRound1,
} from 'reduxFeatures/applications/applicationSlice';
import {useAppDispatch, useAppSelector} from 'reduxCore/hooks';

// Components
import ApplicantCardRound1 from 'components/cards/ApplicantCardRound1';
import {CoreButton} from 'components/buttons/CoreButton';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import BackButton from 'components/buttons/BackButton';
import ConfirmModal from 'components/modals/ConfirmModal';
import CheckBox from 'components/coreComponents/interactiveElements/CheckBox';

//Assets
import {Search} from 'assets';

// Helpers
import {size} from 'react-native-responsive-sizes';

// Types
import type {SeeApplicantsScreenProp} from './types';
import type {LessorNavigatorScreenNavigationProp} from '../../../../../navigationStacks/types';

export const MAX_SELECT = 100;

const SeeApplicantsScreen = ({route}: SeeApplicantsScreenProp) => {
  const {advertId} = route.params;
  const dispatch = useAppDispatch();

  const applicationsState = useAppSelector(
    state => state.applications.applicationsRound1,
  );
  const selectedApplications = useAppSelector(
    state => state.applications.applicationsSelectedRound1,
  );
  const notSelectedApplications = useAppSelector(
    state => state.applications.applicationsNotSelectedRound1,
  );
  const selectedAll = useAppSelector(
    state => state.applications.selectedAllRound1,
  );
  const {
    data: advert,
    error,
    isLoading,
  } = useSeeApplicationsByAdvertIdQuery(advertId);
  const applications = advert?.applications;

  const [
    confirmApplications,
    {isLoading: isConfirming, error: errorConfirming},
  ] = useConfirmApplicationsMutation();

  useEffect(() => {
    if (advert) {
      dispatch(setApplicationsRound1(applications ?? []));
    }
  }, [applications, advert, dispatch]);

  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation<LessorNavigatorScreenNavigationProp>();

  const selectApplication = (id: number) => {
    dispatch(toggleRound1(id));
  };
  const handleSelectAll = () => {
    dispatch(toggleSelectAllRound1());
  };
  const applicationToBeSent = [
    ...selectedApplications,
    ...notSelectedApplications,
  ];
  console.log('applicationToBeSent', applicationToBeSent);

  const toggleModal = () => {
    setModalVisible(prev => !prev);
  };

  const handleConfirmApplications = () => {
    confirmApplications({
      id: advertId,
      applicationType: 'Round-1',
      applications: applicationToBeSent,
    });
    navigation.navigate('selectionConfirmed', {
      advertId: advertId,
      round1: true,
    });
    toggleModal();
  };
  const totalApplications = applicationsState.length;
  const totalSelected = selectedApplications.length;
  const totalRemaining = Math.min(
    MAX_SELECT - totalSelected,
    totalApplications - totalSelected,
  );

  const confirmApplicationsModalAsset = {
    header: 'Are you sure you want to confirm these applicants?',
    description:
      'Once confirmed, you cannot select any more applicants or change the decision. In the next step, you will be able to see more details about the selected applicants.',
    middleText:
      totalRemaining > 0
        ? `⚡️ You can still select ${totalRemaining} more applicant${
            totalRemaining > 1 ? 's' : ''
          }`
        : '',
    buttonText: {
      first: isConfirming
        ? 'Confirming'
        : errorConfirming
        ? 'There was an error. Try Again'
        : `Confirm selection (${totalSelected})`,
      second: 'Back to applicants list',
    },
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return (
      <NotFoundComponent
        backButton
        message="There was an error getting the applicants"
      />
    );
  }

  if (applicationsState.length === 0) {
    return <NotFoundComponent backButton message="No one has applied yet" />;
  }

  return (
    <SafeAreaView style={[CoreStyleSheet.safeAreaViewShowContainer]}>
      <BackButton absolute onPress={navigation.goBack} />
      <View style={CoreStyleSheet.headerContainer}>
        <Text style={fontStyles.headerSmall}>Applicants</Text>
      </View>

      <View style={styles.screenContainer}>
        <ScrollView bounces={true} showsVerticalScrollIndicator={false}>
          {applicationsState?.map(application => {
            return (
              <ApplicantCardRound1
                key={application.id}
                selectApplication={selectApplication}
                currentSelectedNums={totalSelected}
                application={application}
              />
            );
          })}
        </ScrollView>
        <View style={styles.selectedButtonContainer}>
          {totalSelected === MAX_SELECT && (
            <Text style={[fontStyles.bodyExtraSmall, {color: Color.Mint[100]}]}>
              You've selected the maximum number of {MAX_SELECT}
            </Text>
          )}
          {totalApplications <= MAX_SELECT && (
            <View style={styles.checkboxContainer}>
              <CheckBox onPress={handleSelectAll} value={selectedAll} />
              <Text
                style={[
                  fontStyles.headerExtraSmall,
                  {color: Color.Black[100]},
                ]}>
                Select all applicants
              </Text>
            </View>
          )}
          <CoreButton
            disabled={totalSelected < 1}
            value={`Selected ${totalSelected}/${
              MAX_SELECT <= totalApplications ? MAX_SELECT : totalApplications
            }`}
            style={styles.coreButton}
            onPress={toggleModal}
          />
        </View>
      </View>

      <ConfirmModal
        openModal={modalVisible}
        setIsModalOpen={setModalVisible}
        modalAsset={confirmApplicationsModalAsset}
        image={<Search />}
        onPressFirstButton={handleConfirmApplications}
        fullScreen
        disabled={isConfirming}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: StyleSheet.flatten([
    CoreStyleSheet.screenContainer,
    {paddingVertical: 8},
  ]),

  coreButton: {width: '100%'},

  iconContainer: {
    zIndex: 100,
  },
  selectedButtonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: size(20),
    paddingBottom: size(10),
    gap: size(15),
  },
  maxNumberText: {
    color: Color.Mint[100],
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size(10),
  },
});

export default SeeApplicantsScreen;
