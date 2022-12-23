import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// Screens 📺
import ScreenBackButton from '@Components/coreComponents/ScreenTemplates/ScreenBackButton';

// Components 🪢
import HeadlineContainer from '@Components/containers/HeadlineContainer';
import LofftIcon from '@Components/lofftIcons/LofftIcon';
import UserJourneyContinue from '@Redux/userRegistration/UserJourneyContinue';
import PaginationBar from '@Components/bars/PaginationBar';

// Styles 🖼️
import {fontStyles} from '@StyleSheets/fontStyles';
import Color from '@StyleSheets/lofftColorPallet.json';

// Helpers 🤝
import {navigationHelper} from '@Helpers/navigationHelper';

const FlatPhotoUploadScreen = ({navigation}: any) => {
  return (
    <ScreenBackButton>
      <HeadlineContainer
        headlineText="Show us how the flat looks like."
        subDescription="Describe your flat in a short text. This can be edited later!"
      />

      <TouchableOpacity style={styles.imageUploadButton}>
        <LofftIcon name="upload" size={30} color={Color.Lavendar[100]} />
        <Text style={[fontStyles.headerSmall, styles.uploadText]}>
          Upload pitcutes
        </Text>
      </TouchableOpacity>
      <TextInput
        multiline={true}
        style={styles.textInput}
        placeholder="Tell us about your lofft."
      />
      <View style={styles.bottomContainer}>
        <PaginationBar />
        <UserJourneyContinue
          value="Take me to Lofft"
          onPress={(targetScreen: any) =>
            navigationHelper(navigation, targetScreen)
          }
        />
      </View>
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
});

export default FlatPhotoUploadScreen;
