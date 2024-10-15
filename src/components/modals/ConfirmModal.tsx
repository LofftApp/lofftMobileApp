import React from 'react';
import {View, Text, StyleSheet, Modal, SafeAreaView} from 'react-native';

// Components
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreButton} from 'components/buttons/CoreButton';
import {ApplyForFlatScreenBackground} from 'assets';
import Color from 'styleSheets/lofftColorPallet.json';

// Helpers 🥷🏻
import {size} from 'react-native-responsive-sizes';

// Types 🏷️
import type {ConfirmModalProps} from './types';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import BackButton from 'components/buttons/BackButton';

const ConfirmModal = ({
  openModal,
  setIsModalOpen,
  modalAsset,
  image,
  onPressFirstButton,
  fullScreen = false,
  disabled = false,
}: ConfirmModalProps) => {
  const marginTop = fullScreen ? size(24) : size(10);

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };
  return (
    <Modal visible={openModal} animationType="slide" transparent={true}>
      <SafeAreaView
        style={
          fullScreen
            ? CoreStyleSheet.fullScreenModalContainer
            : CoreStyleSheet.modalContainer
        }>
        <BackButton onPress={toggleModal} close />
        <ApplyForFlatScreenBackground
          height="100%"
          width="100%"
          style={CoreStyleSheet.backgroundImage}
        />
        {fullScreen ? (
          <>
            <View style={styles.fullScreenModalContainer}>
              <View style={styles.image}>{image}</View>
              <Text style={[fontStyles.headerSmall, styles.textContainer]}>
                {modalAsset.header}
              </Text>
              <Text style={[fontStyles.bodyMedium, styles.textContainer]}>
                {modalAsset.description}
              </Text>
              {modalAsset.middleText && (
                <Text
                  style={[
                    fontStyles.bodySmall,
                    styles.textContainer,
                    styles.textRed,
                  ]}>
                  {modalAsset.middleText}
                </Text>
              )}
              <View style={[styles.buttonsWrap, {marginTop: marginTop}]}>
                <CoreButton
                  value={modalAsset.buttonText.first}
                  onPress={onPressFirstButton}
                  disabled={disabled}
                />
                <CoreButton
                  invert={true}
                  value={modalAsset.buttonText.second}
                  onPress={toggleModal}
                  disabled={disabled}
                />
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.modalContainer}>
              <Text style={fontStyles.headerMedium}>{modalAsset.header}</Text>

              <View style={styles.image}>{image}</View>
              <View style={styles.descriptionContainer}>
                <Text style={fontStyles.bodySmall}>
                  {modalAsset.description}
                </Text>
              </View>
              <View style={[styles.buttonsWrap, {marginTop: marginTop}]}>
                <CoreButton
                  value={modalAsset.buttonText.first}
                  style={styles.coreButtonStyle}
                  onPress={onPressFirstButton}
                  disabled={disabled}
                />
                <CoreButton
                  value={modalAsset.buttonText.second}
                  style={styles.coreButtonStyle}
                  invert={true}
                  disabled={disabled}
                  onPress={toggleModal}
                />
              </View>
            </View>
          </>
        )}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: size(16),
    alignItems: 'center',
  },
  fullScreenModalContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: size(16),
    alignItems: 'center',
    paddingVertical: size(16),
    justifyContent: 'space-around',
  },
  headerContainer: {
    position: 'relative',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  descriptionContainer: {
    marginBottom: size(10),
  },

  image: {
    marginTop: size(-50),
  },

  coreButtonStyle: {
    width: '100%',
  },

  backgroundImage: {
    position: 'absolute',
    top: 50,
    zIndex: -1,
    left: -20,
  },
  textContainer: {
    textAlign: 'center',
    marginTop: size(24),
  },
  buttonsWrap: {
    width: '100%',
    gap: size(10),
    marginTop: size(24),
  },
  textRed: {
    color: Color.Tomato[100],
  },
});

export default ConfirmModal;
