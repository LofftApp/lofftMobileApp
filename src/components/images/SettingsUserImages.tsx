import {useNavigation} from '@react-navigation/native';
import {NoAvatarImage} from 'assets';
import ImageEditButton from 'components/buttons/ImageEditButton';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';
import {useLoadImages} from 'hooks/useLoadImages';
import {SettingsScreenNavigationProp} from 'navigationStacks/types';
import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {size} from 'react-native-responsive-sizes';

const SettingsUserImage = ({userImageUri}: {userImageUri?: string}) => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const {height} = useWindowDimensions();

  const {loadingStatuses} = useLoadImages(userImageUri ? [userImageUri] : []);

  const handlePress = () => {
    navigation.navigate('NewUserNavigator', {
      screen: 'UserImageUploadScreen',
      params: {edit: true},
    });
  };

  return (
    <Pressable style={styles.imageContainer} onPress={handlePress}>
      <View style={styles.loadingContainer}>
        {!loadingStatuses[0] && <LoadingButtonIcon size="large" />}
      </View>
      <View style={styles.profilePicWrapper}>
        <Image
          style={[
            styles.profilePic,
            {height: height * 0.18, width: height * 0.18},
          ]}
          source={userImageUri ? {uri: userImageUri} : NoAvatarImage}
          blurRadius={!loadingStatuses[0] ? 30 : 0}
        />

        <Pressable style={styles.editButtonContainer}>
          <ImageEditButton />
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  profilePicWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profilePic: {
    aspectRatio: 1,
    borderRadius: 12,
    resizeMode: 'cover',
  },

  editButtonContainer: {
    position: 'absolute',
    bottom: size(5),
    right: size(5),
    zIndex: 2,
  },

  loadingContainer: {
    position: 'absolute',
    top: size(55),
    zIndex: 1,
  },
});

export default SettingsUserImage;
