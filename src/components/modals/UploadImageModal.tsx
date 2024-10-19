import {CoreButton} from 'components/buttons/CoreButton';
import React, {Dispatch, SetStateAction} from 'react';
import {Modal, SafeAreaView, StyleSheet, View} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import Color from 'styleSheets/lofftColorPallet.json';

type UploadImageModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const UploadImageModal = ({
  isModalOpen,
  setIsModalOpen,
}: UploadImageModalProps) => {
  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalOpen}
      onRequestClose={toggleModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CoreButton
            value="Take Photo"
            onPress={() => {}}
            // ! Disabled to be removed before production in new repo.

          />
          {/* This image upload has been disabled and needs refactoring */}
          {/* <ImageUploadButton onPress={() => setModalVisible(false)} /> */}
          <CoreButton value="Cancel" onPress={toggleModal} invert />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: Color.BlackOpacity[30],
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    minHeight: size(250),
    justifyContent: 'space-evenly',
    width: '100%',
    backgroundColor: Color.White[100],
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: size(35),
    paddingBottom: size(35),
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: size(4),
    elevation: 5,
  },
});

export default UploadImageModal;
