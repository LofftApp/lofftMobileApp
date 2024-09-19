import React, {useState} from 'react';
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
import {getProfile} from 'reduxFeatures/user/usersMiddleware';
import {useAppSelector, useAppDispatch} from 'reduxCore/hooks';
import {changeAdvertStatus} from 'reduxFeatures/adverts/advertMiddleware';

// Components
import ApplicantCard from 'components/cards/ApplicantCard';
import BackButton from 'components/buttons/BackButton';
import ApplicantsCardAdvanced from 'components/cards/ApplicantCardAdvanced';
import {CoreButton} from 'components/buttons/CoreButton';

// Helpers
import {size} from 'react-native-responsive-sizes';

// Types
import type {
  AdvertApplicantWithSelected,
  SeeApplicantsScreenProp,
} from './types';
import type {LessorNavigatorScreenNavigationProp} from '../../../../../navigationStacks/types';
import {useSeeApplicationsByAdvertIdQuery} from 'reduxFeatures/adverts/advertApi';

export const MAX_SELECT = 5;

const SeeApplicantsScreen = ({route}: SeeApplicantsScreenProp) => {
  const {id} = route.params;

  const {data, error, isLoading} = useSeeApplicationsByAdvertIdQuery(id);
  console.log('SEE APPLICSANTS BY ADVERT ID +++++++++', data);

  const advert = data?.advert;

  // const applicantsWithSelected = advert.applicants?.map(applicant => {
  //   return {...applicant, selected: false};
  // });

  const [applicants, setApplicants] = useState<
    AdvertApplicantWithSelected[] | undefined
  >([]);

  const [finalRound, setFinalRound] = useState<AdvertApplicantWithSelected[]>(
    [],
  );
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation<LessorNavigatorScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const selectProfile = (id: number | null) => {
    // const feedingStyle = { width: '92%', position: 'absolute', bottom: 10, height: '8%' };
    const updatedProfiles = applicants?.map(el => {
      if (el.id === id) {
        return {
          ...el,
          selected: !el.selected,
        };
      } else {
        return el;
      }
    });

    setApplicants(updatedProfiles);

    const selectedProfilesOnly = updatedProfiles?.filter(el => el.selected);
    setFinalRound(selectedProfilesOnly ?? []);
  };

  if (isLoading) {
    return (
      <View style={styles.pageWrapper}>
        <SafeAreaView>
          <Text style={fontStyles.headerSmall}>Loading...</Text>
        </SafeAreaView>
      </View>
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
          {applicants?.map((el, index) => (
            <ApplicantCard
              key={index + 1}
              selectProfile={selectProfile}
              currentSelectedNums={finalRound.length}
              applicant={el}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
      <CoreButton
        disabled={finalRound.length >= 1 ? false : true}
        value={`Selected ${finalRound.length}/${MAX_SELECT}`}
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
                onPress={() => {
                  dispatch(changeAdvertStatus(advert.id ?? 1));
                  setModalVisible(!modalVisible);
                  navigation.navigate('shortlist', {
                    secondRoundApplicants: finalRound,
                    currentAdvert: advert,
                  });
                }}>
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
