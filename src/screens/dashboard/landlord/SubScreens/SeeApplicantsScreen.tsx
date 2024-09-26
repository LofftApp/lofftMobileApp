import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Styles
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';
import LofftIcon from 'components/lofftIcons/LofftIcon';

// Redux
import {changeAdvertStatus} from 'reduxFeatures/adverts/advertMiddleware';
import {
  useConfirmApplicationsMutation,
  useSeeApplicationsByAdvertIdQuery,
} from 'reduxFeatures/adverts/advertApi';
import {useAppDispatch} from 'reduxCore/hooks';

// Components
import ApplicantCard from 'components/cards/ApplicantCard';
import {CoreButton} from 'components/buttons/CoreButton';
import LoadingComponent from 'components/LoadingAndError/LoadingComponent';
import ErrorComponent from 'components/LoadingAndError/ErrorComponent';

// Helpers
import {size} from 'react-native-responsive-sizes';
import {logWithLocation} from 'helpers/logWithLocation';

// Types
import type {SeeApplicantsScreenProp} from './types';
import type {LessorNavigatorScreenNavigationProp} from '../../../../../navigationStacks/types';
import {Application} from 'reduxFeatures/applications/types';

export const MAX_SELECT = 5;

const SeeApplicantsScreen = ({route}: SeeApplicantsScreenProp) => {
  const {id: advertId} = route.params;

  const {
    data: advert,
    error,
    isLoading,
  } = useSeeApplicationsByAdvertIdQuery(advertId);
  const applications = advert?.applications;

  const [
    confirmApplications,
    {data, isLoading: isConfirming, error: errorConfirming},
  ] = useConfirmApplicationsMutation();

  logWithLocation(
    'data>>>>>>>',
    data,
    'isConfirming>>>>>>',
    isConfirming,
    'errorConfirming>>>>>>',
    errorConfirming,
  );

  const [applicationsState, setApplicationsState] = useState<Application[]>([]);

  const [selectedApplications, setSelectedApplications] = useState<
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
          round1: !application.round1,
        };
      }
      return application;
    });

    setApplicationsState(updatedApplications);
    const applicationsSelected = updatedApplications
      .filter(app => app.round1)
      .map(app => {
        return {
          id: app.id,
          round1: app.round1,
          round2: app.round2,
          round3: app.round3,
        };
      });
    setSelectedApplications(applicationsSelected);
  };

  const handleConfirmApplications = () => {
    confirmApplications({
      id: advertId,
      applicationType: 'Round-1',
      applications: selectedApplications,
    });
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return (
      <ErrorComponent message="There was an error getting the applicants" />
    );
  }

  return (
    <View style={styles.pageWrapper}>
      <View style={styles.header}>
        <Pressable
          style={styles.iconContainer}
          onPress={() => {
            navigation.goBack();
          }}>
          <LofftIcon name="chevron-left" size={35} color={Color.Lavendar[80]} />
        </Pressable>
        <View style={styles.headerText}>
          <Text style={fontStyles.headerSmall}>Applicants</Text>
        </View>
      </View>

      <SafeAreaView style={styles.safeareaview}>
        <ScrollView bounces={true} contentContainerStyle={styles.scrollView}>
          {applicationsState?.map(application => {
            return (
              <ApplicantCard
                key={application.id}
                selectApplication={selectApplication}
                currentSelectedNums={selectedApplications.length}
                application={application}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
      <CoreButton
        disabled={selectedApplications.length >= 1 ? false : true}
        value={`Selected ${selectedApplications.length}/${MAX_SELECT}`}
        style={styles.coreButton}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[fontStyles.bodyMedium, styles.textAlign]}>
              🖐 {'\n'}
              Are you sure about your selection? There is no way back later on!!
            </Text>
            <View style={styles.choicesContainer}>
              <Pressable
                style={[styles.button, styles.buttonNo]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>No</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose, styles.marginButton]}
                // onPress={() => {
                //   dispatch(changeAdvertStatus(advert.id ?? 1));
                //   setModalVisible(!modalVisible);
                //   navigation.navigate('shortlist', {
                //     secondRoundApplicants: selectedApplications,
                //     currentAdvert: advert,
                //   });
                // }}>
                onPress={handleConfirmApplications}>
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    marginTop: size(60),
    width: '100%',
  },
  headerText: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  safeareaview: {
    position: 'relative',
  },
  scrollView: {
    paddingBottom: size(130),
    marginTop: size(20),
  },

  choicesContainer: {
    flexDirection: 'row',
    marginTop: size(30),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Black[10],
    opacity: 0.8,
  },
  coreButton: {width: '90%', position: 'absolute', bottom: size(10)},
  modalView: {
    margin: size(20),
    backgroundColor: 'white',
    borderRadius: 20,
    padding: size(35),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    padding: size(10),
    elevation: 2,
  },

  buttonNo: {
    backgroundColor: Color.Tomato[100],
  },

  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: Color.Mint[100],
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalText: {
    marginBottom: size(15),
    textAlign: 'center',
  },
  iconContainer: {
    paddingLeft: size(28),
    zIndex: 100,
  },
  textAlign: {
    textAlign: 'center',
  },
  marginButton: {
    marginLeft: size(20),
  },
});

export default SeeApplicantsScreen;
