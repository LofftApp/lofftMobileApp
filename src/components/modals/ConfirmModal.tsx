import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
} from 'react-native';

// Redux 🏗️
// import {useSelector} from 'react-redux';

// Components
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreButton} from 'components/buttons/CoreButton';
import {CrossIcon} from '../../assets';

// Helpers 🥷🏻
import {size} from 'react-native-responsive-sizes';

// Types 🏷️
import type {ConfirmModalProps} from './types';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

const ConfirmModal = ({
  openModal,
  setIsModalOpen,
  modalAsset,
  onPressFirstButton,
}: ConfirmModalProps) => {
  return (
    <Modal visible={openModal} animationType="slide" transparent={true}>
      <SafeAreaView style={CoreStyleSheet.modalContainer}>
        <View style={styles.completeProfileContainer}>
          <View style={styles.headerContainer}>
            <Text style={fontStyles.headerMedium}>{modalAsset.header}</Text>
            <Pressable
              style={styles.pressableStyle}
              onPress={() => {
                setIsModalOpen(false);
              }}>
              <CrossIcon />
            </Pressable>
          </View>
          <View>
            <Image source={modalAsset.icon} />
          </View>
          <View>
            <Text style={fontStyles.bodySmall}>{modalAsset.description}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <CoreButton
              value={modalAsset.buttonText.first}
              style={styles.coreButtonStyle}
              onPress={onPressFirstButton}
            />
            <CoreButton
              value={modalAsset.buttonText.second}
              style={styles.coreButtonStyle}
              invert={true}
              onPress={() => {
                setIsModalOpen(false);
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  completeProfileContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: size(16),
    paddingVertical: size(16),
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: size(8),
  },
  coreButtonStyle: {
    width: '100%',
  },
  pressableStyle: {
    marginTop: size(12),
    marginRight: size(14),
  },
});

export default ConfirmModal;
