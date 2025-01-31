import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';

// Redux
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

//Components
import {CoreButton} from 'components/buttons/CoreButton';

//Styles
import {fontStyles} from 'styleSheets/fontStyles';
import {useSignOutMutation} from 'reduxFeatures/auth/authApi';
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';
import {RegistrationBackground, Trail} from 'assets';
import LofftHeaderPhoto from 'components/cards/LofftHeaderPhoto';
import ImageCarroussel from 'components/cards/ImageCarroussel';
import {size} from 'react-native-responsive-sizes';
import SettingsUserImage from 'components/images/SettingsUserImages';
import SettingsFlatImages from 'components/images/SettingsFlatImages';
const picUrl =
  'https://www.friendsoffriends.com/app/uploads/an-artists-farm-in-upstate-new-york-envisions-a-path-towards-food-sovereignty/Friends-of-Friends-SkyHighFarm-Tompkins-061.jpg.webp';
const flatImages = [
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=1258&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1585128792020-803d29415281?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const SettingsScreen = () => {
  const {data: currentUser} = useGetUserQuery();
  const [signOut] = useSignOutMutation();

  const userCredits = currentUser?.credits;

  const handleSignOut = () => {
    signOut();
  };
  const userPhotoUri = currentUser?.profile?.userPhotos?.[0] || picUrl;

  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
      <Trail height="100%" width="100%" style={styles.backgroundImageExtra} />
      <View style={CoreStyleSheet.headerContainer}>
        <Text style={fontStyles.headerLarge}>Profile and Settings</Text>
      </View>
      <View style={CoreStyleSheet.screenContainer}>
        <View style={styles.imagesContainer}>
          <SettingsUserImage userImageUri={picUrl} />
          <ImageCarroussel
            imageContainerHeight={90}
            imageContainerWidth={90}
            images={flatImages}
            snapToInterval={30}
          />
        </View>
      </View>

      {/* <Text style={fontStyles.headerLarge}>
          Current Credits: {userCredits}
        </Text> */}
      {/* <CoreButton
        value="Sign Out"
        style={styles.coreButtonStyle}
        onPress={handleSignOut}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImageExtra: {
    position: 'absolute',
    top: size(15),
    zIndex: -1,
    left: 0,
    opacity: 0.7,
  },
  imagesContainer: {
    marginTop: size(20),
    gap: size(30),
  },

  coreButtonStyle: {
    width: '40%',
    marginTop: 20,
  },
});

export default SettingsScreen;
