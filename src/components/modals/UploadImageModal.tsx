import {CoreButton} from 'components/buttons/CoreButton';
import React, {Dispatch, SetStateAction} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {size} from 'react-native-responsive-sizes';
import {ImageToUpload} from 'reduxFeatures/imageHandling/types';
import {useImagesToUpload} from 'reduxFeatures/imageHandling/useImagesToUpload';
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

  const {setImagesToUpload} = useImagesToUpload();

  const handleTakePhoto = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      includeBase64: false,
    });
    toggleModal();
    setImagesToUpload(result.assets as ImageToUpload[]);
  };

  const handleImageUpload = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });
    toggleModal();
    setImagesToUpload(result.assets as ImageToUpload[]);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalOpen}
      onRequestClose={toggleModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CoreButton value="Take Photo" onPress={handleTakePhoto} />
          <CoreButton
            value="Upload from Library"
            onPress={handleImageUpload}
            style={{
              backgroundColor: Color.Blue[80],
              borderColor: Color.Blue[80],
            }}
          />
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
    minHeight: size(350),
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
