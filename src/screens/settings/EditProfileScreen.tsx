import React from 'react';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//Hooks
import {useUserType} from 'reduxFeatures/user/useUserType';

//Components
import {RegistrationBackground} from 'assets';
import SettingsCard from 'components/cards/SettingsCard';
import BackButton from 'components/buttons/BackButton';

//Styles
import {CoreStyleSheet} from 'styleSheets/CoreDesignStyleSheet';

//Helpers
import {size} from 'react-native-responsive-sizes';

//Types
import {SettingsScreenNavigationProp} from 'navigationStacks/types';
import {useNewUserDetails} from 'reduxFeatures/registration/useNewUserDetails';

const EditProfileScreen = () => {
  const {isLessor} = useUserType();
  const {resetNewUserState} = useNewUserDetails(isLessor);

  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const editTenantProfile = [
    {
      id: 1,
      title: 'Match Tags',
      subtitle: 'Boost your profile to find the perfect flat',
      onPress: () => {
        navigation.navigate('NewUserNavigator', {
          screen: 'AboutUserFlatScreen',
          params: {edit: true},
        });
        resetNewUserState();
      },
      icon: 'annotation-heart',
    },
    {
      id: 2,
      title: 'Personal Information',
      subtitle: 'Name and date of birth',
      onPress: () => {
        navigation.navigate('NewUserNavigator', {
          screen: 'NameProfileScreen',
          params: {edit: true},
        });
        resetNewUserState();
      },
      icon: 'user-edit',
    },
    {
      id: 3,
      title: 'Gender Identity',
      subtitle: 'To get you closer to the right community',
      onPress: () => {
        navigation.navigate('NewUserNavigator', {
          screen: 'GenderIdentityScreen',
          params: {edit: true},
        });
        resetNewUserState();
      },
      icon: 'face-wink',
    },
    {
      id: 4,
      title: 'Search Preferences',
      subtitle: 'City, budget, and more',
      onPress: () => {
        navigation.navigate('NewUserNavigator', {
          screen: 'SelectCityScreen',
          params: {edit: true},
        });
        resetNewUserState();
      },
      icon: 'search-sm',
    },
    {
      id: 5,
      title: 'Languages',
      subtitle: 'The languages spoken in the flat',
      onPress: () => {
        navigation.navigate('NewUserNavigator', {
          screen: 'LanguageSelectionScreen',
          params: {edit: true},
        });
        resetNewUserState();
      },
      icon: 'home-smile',
    },
  ];

  const editLessorProfile = editTenantProfile.slice(1, 3);

  return (
    <SafeAreaView style={CoreStyleSheet.safeAreaViewShowContainer}>
      <BackButton title="Edit Profile" onPress={navigation.goBack} />

      <RegistrationBackground
        height="100%"
        width="100%"
        style={CoreStyleSheet.backgroundImage}
      />

      <View style={CoreStyleSheet.screenContainer}>
        <View style={styles.mainContainer}>
          <FlatList
            data={isLessor ? editLessorProfile : editTenantProfile}
            renderItem={({item}) => (
              <SettingsCard settingsData={item} hasArrowIds={[1, 2, 3, 4, 5]} />
            )}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.cardsContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    gap: size(24),
  },

  backgroundImageExtra: {
    position: 'absolute',
    top: size(-25),
    zIndex: -1,
    left: 0,
    opacity: 0.7,
  },
  imagesContainer: {
    gap: size(20),
  },

  cardsContainer: {
    alignItems: 'center',
  },

  coreButtonStyle: {
    width: '40%',
    marginTop: 20,
  },
});

export default EditProfileScreen;
