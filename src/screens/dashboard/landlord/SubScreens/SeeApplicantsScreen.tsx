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
// Styles
import Color from '@StyleSheets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/fontStyles';

import {getProfile} from '@Redux/user/usersMiddleware';
import {useAppSelector, useAppDispatch} from '@ReduxCore/hooks';
import LofftIcon from '@Components/lofftIcons/LofftIcon';
import {useNavigation} from '@react-navigation/native';

import ApplicantCard from '@Components/cards/ApplicantCard';
import BackButton from '@Components/buttons/BackButton';
import ApplicantsCardAdvanced from '@Components/cards/ApplicantCardAdvanced';
import {CoreButton} from '@Components/buttons/CoreButton';

const SeeApplicantsScreen = ({route}: any) => {
  const {advert} = route.params;
  const [applicants, setApplicants] = useState(advert.applicants);
  const navigation = useNavigation();
  const [maxSelect, setMaxSelected] = useState(5);
  const [finalRound, setFinalRound] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const mutateApplicants = () => {
    setApplicants(
      applicants.map(applicant => {
        return {...applicant, selected: false};
      }),
    );
  };

  useEffect(() => {
    mutateApplicants();
  }, []);

  const selectProfile = id => {
    // const feedingStyle = { width: '92%', position: 'absolute', bottom: 10, height: '8%' };
    const updatedProfiles = applicants.map(el => {
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

    const selectedProfilesOnly = updatedProfiles.filter(el => el.selected);

    setFinalRound(selectedProfilesOnly);
  };

  return (
    <View style={styles.pageWrapper}>
      <View style={styles.header}>
        <Pressable
          style={styles.iconContainer}
          onPress={() => navigation.goBack()}>
          <LofftIcon name="chevron-left" size={35} color={Color.Lavendar[80]} />
        </Pressable>
        <View style={styles.headerText}>
          <Text style={fontStyles.headerSmall}>Applicants</Text>
        </View>
      </View>

      <SafeAreaView style={styles.safeareaview}>
        <ScrollView bounces={true} contentContainerStyle={styles.scrollView}>
          {applicants.map((el, index) => (
            <ApplicantCard
              key={index + 1}
              maxSelect={maxSelect}
              selectProfile={selectProfile}
              currentSelectedNums={finalRound.length}
              name={el.email}
              id={el.id}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
      <CoreButton
        disabled={finalRound.length >= 1 ? false : true }
        value={`Selected ${finalRound.length}/${maxSelect}`}
        style={{width: '90%', position: 'absolute', bottom: 10}}
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
            <Text style={[fontStyles.bodyMedium, {textAlign: 'center'}]}>
              🖐 {"\n"}
              Are you sure about your selection? There is no way back
              later on!!
            </Text>
            <View style={styles.choicesContainer}>
              <Pressable
                style={[styles.button, styles.buttonNo]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>No</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose, {marginLeft: 30}]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate('Seeprofiles', { secondRoundApplicants: finalRound });

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
    marginTop: 60,
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
    paddingBottom: 130,
    marginTop: 20,
  },

  choicesContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Black[10],
    opacity: 0.8,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
    padding: 10,
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
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default SeeApplicantsScreen;