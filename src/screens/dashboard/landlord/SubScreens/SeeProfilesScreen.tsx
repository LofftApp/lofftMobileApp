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

// Components
import {CoreButton} from 'components/buttons/CoreButton';
import LoadingComponent from 'components/LoadingAndNotFound/LoadingComponent';
import NotFoundComponent from 'components/LoadingAndNotFound/NotFoundComponent';
import BackButton from 'components/buttons/BackButton';
import ConfirmModal from 'components/modals/ConfirmModal';
import ApplicantCardRound2 from 'components/cards/ApplicantCardRound2';

//Assets
import {Search} from 'assets';

// Helpers
import {size} from 'react-native-responsive-sizes';

//Constants
import {MAX_SELECT_ROUND2} from 'components/componentData/constants';

// Types
import type {SeeProfilesScreenProp} from './types';
import type {LessorNavigatorScreenNavigationProp} from '../../../../navigationStacks/types';
import {useSelectApplicants} from 'reduxFeatures/applications/useSelectApplicants';

const SeeProfilesScreen = ({route}: SeeProfilesScreenProp) => {
  const {advertId} = route.params;

  const {
    applicationsStateRound2: applicationsState,
    selectedApplicationsRound2: selectedApplications,
    notSelectedApplicationsRound2: notSelectedApplications,
    toggleRound2,
    setApplicationsRound2,
  } = useSelectApplicants();

  const {
    data: advert,
    error,
    isLoading,
  } = useSeeApplicationsByAdvertIdQuery(advertId, {
    refetchOnMountOrArgChange: true,
  });
  const applications = advert?.applications;

  const [
    confirmApplications,
    {isLoading: isConfirming, error: errorConfirming},
  ] = useConfirmApplicationsMutation();

  useEffect(() => {
    if (advert) {
      setApplicationsRound2(applications ?? []);
    }
  }, [applications, advert, setApplicationsRound2]);

  const selectApplication = (id: number) => {
    toggleRound2(id);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation<LessorNavigatorScreenNavigationProp>();

  const applicationToBeSent = [
    ...selectedApplications,
    ...notSelectedApplications,
  ];

  const toggleModal = () => {
    setModalVisible(prev => !prev);
  };

  const handleConfirmApplications = () => {
    confirmApplications({
      id: advertId,
      applicationType: 'Round-2',
      applications: applicationToBeSent,
    });
    navigation.navigate('selectionConfirmed', {
      advertId: advertId,
      round2: true,
    });
    toggleModal();
  };
  const totalApplications = applicationsState.length;
  const totalSelected = selectedApplications.length;

  const totalRemaining = Math.min(
    MAX_SELECT_ROUND2 - totalSelected,
    totalApplications - totalSelected,
  );

  const confirmApplicationsModalAsset = {
    header: 'Are you sure you want to confirm these applicants?',
    description:
      'Once confirmed, you cannot select any more applicants or change the decision.',
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
      second: 'Back to applicants profiles',
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
    return (
      <NotFoundComponent
        backButton
        message="We could not find the applicants"
      />
    );
  }

  return (
    <SafeAreaView style={[CoreStyleSheet.safeAreaViewShowContainer]}>
      <BackButton title="Profiles" onPress={navigation.goBack} />

      <View style={styles.screenContainer}>
        <ScrollView bounces={true} showsVerticalScrollIndicator={false}>
          {applicationsState?.map(application => {
            return (
              <ApplicantCardRound2
                key={application.id}
                selectApplication={selectApplication}
                currentSelectedNums={totalSelected}
                application={application}
              />
            );
          })}
        </ScrollView>

        <View style={styles.selectedButtonContainer}>
          <Text style={[fontStyles.bodyExtraSmall, {color: Color.Black[50]}]}>
            {`You can select up to ${MAX_SELECT_ROUND2} applicants`}
          </Text>
          <CoreButton
            disabled={totalSelected >= 1 ? false : true}
            value={`Selected ${totalSelected}/${
              MAX_SELECT_ROUND2 <= totalApplications
                ? MAX_SELECT_ROUND2
                : totalApplications
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
    {paddingVertical: size(10)},
  ]),

  coreButton: {width: '100%'},

  iconContainer: {
    zIndex: 100,
  },
  selectedButtonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: size(10),
    paddingBottom: size(10),
    gap: size(10),
  },
});

export default SeeProfilesScreen;
