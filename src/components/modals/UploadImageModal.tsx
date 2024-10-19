import {CoreButton} from 'components/buttons/CoreButton';
import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {size} from 'react-native-responsive-sizes';
import Color from 'styleSheets/lofftColorPallet.json';

const UploadImageModal = ({modalVisible, setModalVisible}) => {
  const handleCancel = () => {
    setModalVisible(false);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CoreButton
            value="Take Photo"
            onPress={() => {}}
            // ! Disabled to be removed before production in new repo.
            disabled={true}
          />
          {/* This image upload has been disabled and needs refactoring */}
          {/* <ImageUploadButton onPress={() => setModalVisible(false)} /> */}
          <CoreButton value="Cancel" onPress={handleCancel} invert />
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
    borderTopLeftRadius: size(16),
    borderTopRightRadius: size(16),
    paddingHorizontal: size(35),
    paddingBottom: size(35),
    shadowColor: '#000',
    shadowOffset: {
      width: size(2),
      height: size(2),
    },
    shadowOpacity: 0.5,
    shadowRadius: size(4),
    elevation: 5,
  },
});

export default UploadImageModal;
