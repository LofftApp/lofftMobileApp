import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  Modal,
} from 'react-native';

// APIs 🧠
import {libraryImageUpload} from '@Firebase/firebaseStorage';

// Screens 📺
import ScreenBackButton from '@Components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import HeadlineContainer from '@Components/containers/HeadlineContainer';
import LofftIcon from '@Components/lofftIcons/LofftIcon';
import FooterNavBarWithPagination from '@Components/bars/FooterNavBarWithPagination';
import {CoreButton} from '@Components/buttons/CoreButton';

// Styles 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
import Color from '@StyleSheets/lofftColorPallet.json';

// Helpers 🤝
import {navigationHelper} from '@Helpers/navigationHelper';

const FlatPhotoUploadScreen = ({navigation}: any) => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <ScreenBackButton nav={() => navigation.goBack()}>
      <HeadlineContainer
        headlineText="Show us how the flat looks like."
        subDescription="Describe your flat in a short text. This can be edited later!"
      />

      <TouchableOpacity
        style={styles.imageUploadButton}
        onPress={() => setModalVisible(true)}>
        <LofftIcon name="upload" size={30} color={Color.Lavendar[100]} />
        <Text style={[fontStyles.headerSmall, styles.uploadText]}>
          Upload Pictures
        </Text>
      </TouchableOpacity>
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
            <CoreButton value="Take Photo" onPress={() => {}} />
            <CoreButton
              value="Upload Photo"
              onPress={async () => {
                const response = await libraryImageUpload({
                  limit: 5,
                  targetDb: 'loffts',
                });
                console.log(response);
              }}
            />
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
  imageUploadButton: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: Color.Lavendar[100],
    paddingVertical: 16,
    alignItems: 'center',
  },
  uploadText: {
    color: Color.Lavendar[100],
    marginTop: 12,
  },
  textInput: {
    marginTop: 24,
    borderWidth: 2,
    padding: 16,
    paddingTop: 16,
    height: 203,
    borderRadius: 16,
  },
  bottomContainer: {
    flex: 1,
    marginVertical: 45,
    justifyContent: 'space-around',
  },
  centeredView: {
    backgroundColor: Color.BlackOpacity[30],
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    minHeight: 250,
    justifyContent: 'space-evenly',
    width: '100%',
    backgroundColor: Color.White[100],
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 35,
    paddingBottom: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default FlatPhotoUploadScreen;
