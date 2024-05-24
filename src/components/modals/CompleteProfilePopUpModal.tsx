import React from 'react';
import {View, Text, StyleSheet, Image, Modal, Pressable} from 'react-native';

// Redux 🏗️
import {useSelector} from 'react-redux';

// Components
import {fontStyles} from 'styleSheets/fontStyles';
import {CoreButton} from 'components/buttons/CoreButton';
import {CrossIcon} from '../../assets';

// Helpers 🥷🏻
import { width, height, size, fontSize } from 'react-native-responsive-sizes';

const CompleteProfilePopUpModal = ({
  openModal,
  pullData,
  profileNotDoneObject,
}: any) => {

  console.log("hehe", openModal)
  return (
    <Modal visible={openModal} animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.completeProfileContainer}>
          <View style={styles.headerContainer}>
            <Text style={fontStyles.headerMedium}>
              {profileNotDoneObject.header}
            </Text>
            <Pressable
              style={styles.pressableStyle}
              onPress={() => {
                pullData(false);
              }}>
              <CrossIcon />
            </Pressable>
          </View>
          <View>
            <Image source={profileNotDoneObject.icon} />
          </View>
          <View>
            <Text style={fontStyles.bodyMedium}>
              {profileNotDoneObject.description}
            </Text>
          </View>
          <CoreButton
            value="Complete my profile now"
            style={styles.coreButtonStyle}
            disabled={false}
          />
          <CoreButton
            value="Do it later"
            style={styles.coreButtonStyle}
            disabled={false}
            invert={true}
            onPress={() => {
              pullData(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: '74%',
    marginTop: 'auto',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  completeProfileContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: size(16),
    paddingBottom: size(80),
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  coreButtonStyle: {
    borderWidth: 2,
    marginTop: size(5),
    height: size(45),
    width: '100%',
  },
  pressableStyle: {
    marginTop: size(16),
    marginRight: size(14),
  },
});

export default CompleteProfilePopUpModal;
