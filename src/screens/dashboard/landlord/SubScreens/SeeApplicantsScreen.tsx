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
import {Application} from 'reduxFeatures/applications/types';

// Components
import ApplicantCard from 'components/cards/ApplicantCard';
import {CoreButton} from 'components/buttons/CoreButton';
import LoadingComponent from 'components/LoadingAndError/LoadingComponent';
import ErrorComponent from 'components/LoadingAndError/ErrorComponent';
import BackButton from 'components/buttons/BackButton';
import ConfirmModal from 'components/modals/ConfirmModal';

//Assets
import {Search} from 'assets';

// Helpers
import {size} from 'react-native-responsive-sizes';

// Types
import type {SeeApplicantsScreenProp} from './types';
import type {LessorNavigatorScreenNavigationProp} from '../../../../../navigationStacks/types';
import { useAppDispatch, useAppSelector } from 'reduxCore/hooks';
import { setApplicationsRound1, toggleRound1 } from 'reduxFeatures/applications/applicationSlice';

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

  // const [applicationsState, setApplicationsState] = useState<Application[]>([]);

  // const [selectedApplications, setSelectedApplications] = useState<
  //   Partial<Application>[]
  // >([]);

  // const [notSelectedApplications, setNotSelectedApplications] = useState<
  //   Partial<Application>[]
  // >([]);

  // useEffect(() => {
  //   if (advert) {
  //     setApplicationsState(applications ?? []);
  //   }
  // }, [advert, applications]);
  useEffect(() => {
    if (advert) {
      dispatch(setApplicationsRound1(applications ?? []));
    }
  }, [applications, advert, dispatch]);

  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation<LessorNavigatorScreenNavigationProp>();

  // const selectApplication = (id: number) => {
  //   const updatedApplications = applicationsState.map(application => {
  //     if (application.id === id) {
  //       return {
  //         ...application,
  //         round1: !application.round1,
  //       };
  //     }
  //     return application;
  //   });

  //   setApplicationsState(updatedApplications);
  //   const applicationsSelected = updatedApplications
  //     .filter(app => app.round1)
  //     .map(app => {
  //       return {
  //         id: app.id,
  //         round_1: app.round1,
  //         round_2: app.round2,
  //         round_3: app.round3,
  //       };
  //     });
  //   setSelectedApplications(applicationsSelected);

  //   const applicationsNotSelected = updatedApplications
  //     .filter(app => !app.round1)
  //     .map(app => {
  //       return {
  //         id: app.id,
  //         round_1: app.round1,
  //         round_2: app.round2,
  //         round_3: app.round3,
  //       };
  //     });
  //   setNotSelectedApplications(applicationsNotSelected);
  // };
  const selectApplication = (id: number) => {
    dispatch(toggleRound1(id));
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
      <ErrorComponent message="There was an error getting the applicants" />
    );
  }

  if (applicationsState.length === 0) {
    return <ErrorComponent message="No one has applied yet" />;
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
              <ApplicantCard
                key={application.id}
                selectApplication={selectApplication}
                currentSelectedNums={totalSelected}
                application={application}
              />
            );
          })}
        </ScrollView>
        <View style={styles.selectedButtonContainer}>
          <Text style={[fontStyles.bodyExtraSmall, {color: Color.Mint[100]}]}>
            {totalSelected === MAX_SELECT &&
              "You've selected the maximum number of 100"}
          </Text>
          <CoreButton
            disabled={totalSelected >= 1 ? false : true}
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
    paddingTop: size(10),
    paddingBottom: size(10),
    gap: size(10),
  },
  maxNumberText: {
    color: Color.Mint[100],
  },
});

export default SeeApplicantsScreen;
