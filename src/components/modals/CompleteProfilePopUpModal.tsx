import React from 'react';
import {View, Text, StyleSheet, Image, Modal, Pressable} from 'react-native';

// Redux 🏗️
import {useSelector} from 'react-redux';

// Components
import {fontStyles} from '@StyleSheets/fontStyles';
import {CoreButton} from 'components/buttons/CoreButton';
import {CrossIcon} from '../../assets';

const CompleteProfilePopUpModal = ({
  openModal,
  pullData,
  profileNotDoneObject,
}: any) => {
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
    height: '64%',
    marginTop: 'auto',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  completeProfileContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  coreButtonStyle: {
    borderWidth: 2,
    marginTop: 5,
    height: 45,
    width: '100%',
  },
  pressableStyle: {
    marginTop: 16,
    marginRight: 14,
  },
});

export default CompleteProfilePopUpModal;
