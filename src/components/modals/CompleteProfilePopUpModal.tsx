import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';

import Color from '@StyleSheets/lofftColorPallet.json';
import IconButton from '@Components/buttons/IconButton';
import LofftIcon from '@Components/lofftIcons/LofftIcon';
import {CrossIcon} from '../../assets';

// Redux 🏗️
import {useSelector} from 'react-redux';

// Components
import HighlightedButtons from '@Components/containers/HighlithgtedButtons';
import PaginationBar from '@Components/bars/PaginationBar';
import LofftHeaderPhoto from '@Components/cards/LofftHeaderPhoto';
import ScreenImage from '@Assets/images/Illustration.png';
import {fontStyles} from '@StyleSheets/fontStyles';
import {CoreButton} from '@Components/buttons/CoreButton';
import Chips from '@Components/buttons/Chips';


const CompleteProfilePopUpModal = ({openModal, pullData, profileNotDoneObject}:any) => {

  return (
    <Modal visible={openModal} animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.completeProfileContainer}>
          <View style={styles.headerContainer}>
            <Text style={fontStyles.headerMedium}>
              {profileNotDoneObject.header}
            </Text>
            <CrossIcon
              style={{
                marginTop: 16,
                marginRight: 14,
              }}
              onPress={() => {
                pullData(false);
              }}
            />
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
            style={{
              borderWidth: 2,
              marginTop: 14,
              height: 45,
              width: '100%',
            }}
            disabled={false}
          />
          <CoreButton
            value="Do it later"
            style={{
              borderWidth: 2,
              marginTop: 5,
              height: 45,
              width: '100%',
            }}
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
});

export default CompleteProfilePopUpModal;
