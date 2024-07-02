import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Modal} from 'react-native';

// Screens 📺
import ScreenBackButton from 'components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import HeadlineContainer from 'components/containers/HeadlineContainer';
import FooterNavBarWithPagination from 'components/bars/FooterNavBarWithPagination';
import {CoreButton} from 'components/buttons/CoreButton';
import ImageUploadButton from 'reduxFeatures/imageHandling/ImageUploadButton';
import ImagePreviewRow from 'reduxFeatures/imageHandling/ImagePreviewRow';
import UploadImageButton from 'reduxFeatures/imageHandling/UploadImageButton';

// Styles 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Helpers 🤝
import {navigationHelper} from 'helpers/navigationHelper';
import {useNavigation} from '@react-navigation/native';
import {size} from 'react-native-responsive-sizes';

const FlatPhotoUploadScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ScreenBackButton nav={() => navigation.goBack()}>
      <HeadlineContainer
        headlineText="Show us how the flat looks like."
        subDescription="Describe your flat in a short text. This can be edited later!"
      />
      <ImagePreviewRow />
      <UploadImageButton onPress={() => setModalVisible(true)} />
      <TextInput
        multiline={true}
        style={styles.textInput}
        placeholder="Tell us about your lofft."
      />
      <FooterNavBarWithPagination
        onPress={(targetScreen: any) =>
          navigationHelper(navigation, targetScreen)
        }
        buttonValue="Take me to Lofft"
      />
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
            <ImageUploadButton onPress={() => setModalVisible(false)} />
            <CoreButton
              value="Cancel"
              onPress={() => setModalVisible(false)}
              invert
            />
          </View>
        </View>
      </Modal>
    </ScreenBackButton>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginTop: size(24),
    borderWidth: size(2),
    padding: size(16),
    paddingTop: size(16),
    height: size(203),
    borderRadius: size(16),
  },
  bottomContainer: {
    flex: 1,
    marginVertical: size(45),
    justifyContent: 'space-around',
  },
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

export default FlatPhotoUploadScreen;
