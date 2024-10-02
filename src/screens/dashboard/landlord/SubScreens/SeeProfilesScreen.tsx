import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Styles
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

// Redux
import {
  useConfirmApplicationsMutation,
  useSeeApplicationsByAdvertIdQuery,
} from 'reduxFeatures/adverts/advertApi';
import {Application} from 'reduxFeatures/applications/types';

// Components
import {CoreButton} from 'components/buttons/CoreButton';
import LoadingComponent from 'components/LoadingAndError/LoadingComponent';
import ErrorComponent from 'components/LoadingAndError/ErrorComponent';
import BackButton from 'components/buttons/BackButton';
import ConfirmModal from 'components/modals/ConfirmModal';
import UserBlobCard from 'components/cards/UserBlobCard';

//Assets
import {Search} from 'assets';

// Helpers
import {size} from 'react-native-responsive-sizes';

// Types
import type {SeeProfilesScreenProp} from './types';
import type {LessorNavigatorScreenNavigationProp} from '../../../../../navigationStacks/types';

export const MAX_SELECT_2_ROUND = 20;

const SeeProfilesScreen = ({route}: SeeProfilesScreenProp) => {
  const {advertId} = route.params;

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

  const [applicationsState, setApplicationsState] = useState<Application[]>([]);

  const [selectedApplications, setSelectedApplications] = useState<
    Partial<Application>[]
  >([]);

  const [notSelectedApplications, setNotSelectedApplications] = useState<
    Partial<Application>[]
  >([]);

  useEffect(() => {
    if (advert) {
      setApplicationsState(applications ?? []);
    }
  }, [advert, applications]);

  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation<LessorNavigatorScreenNavigationProp>();

  const selectApplication = (id: number) => {
    const updatedApplications = applicationsState.map(application => {
      if (application.id === id) {
        return {
          ...application,
          round2: !application.round2,
        };
      }
      return application;
    });

    setApplicationsState(updatedApplications);
    const applicationsSelected = updatedApplications
      .filter(app => app.round2)
      .map(app => {
        return {
          id: app.id,
          round_1: app.round1,
          round_2: app.round2,
          round_3: app.round3,
        };
      });
    setSelectedApplications(applicationsSelected);

    const applicationsNotSelected = updatedApplications
      .filter(app => !app.round2)
      .map(app => {
        return {
          id: app.id,
          round_1: app.round1,
          round_2: app.round2,
          round_3: app.round3,
        };
      });
    setNotSelectedApplications(applicationsNotSelected);
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
      applicationType: 'Round-2',
      applications: applicationToBeSent,
    });
    navigation.navigate('seeProfiles', {advertId: advertId});
    toggleModal();
  };
  const totalApplications = applicationsState.length;
  const totalSelected = selectedApplications.length;
  const totalRemaining = Math.min(
    MAX_SELECT_2_ROUND - totalSelected,
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
      <ErrorComponent message="There was an error getting the applicants" />
    );
  }

  if (applicationsState.length === 0) {
    return <ErrorComponent message="We could not find the applicants" />;
  }

  return (
    <SafeAreaView style={[CoreStyleSheet.safeAreaViewShowContainer]}>
      <BackButton onPress={navigation.goBack} />
      <View style={CoreStyleSheet.headerContainer}>
        <Text style={fontStyles.headerSmall}>Applicants</Text>
      </View>

      <View style={styles.screenContainer}>
        <ScrollView bounces={true} showsVerticalScrollIndicator={false}>
          {applicationsState?.map(application => {
            return (
              <UserBlobCard
                key={application.id}
                selectApplication={selectApplication}
                currentSelectedNums={selectedApplications.length}
                application={application}
              />
            );
          })}
        </ScrollView>

        <CoreButton
          disabled={selectedApplications.length >= 1 ? false : true}
          value={`Selected ${selectedApplications.length}/${
            MAX_SELECT_2_ROUND <= totalApplications
              ? MAX_SELECT_2_ROUND
              : totalApplications
          }`}
          style={styles.coreButton}
          onPress={toggleModal}
        />
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

  coreButton: {width: '100%', marginTop: size(24), marginBottom: size(10)},

  iconContainer: {
    zIndex: 100,
  },
});

export default SeeProfilesScreen;
