import {useNavigation} from '@react-navigation/native';
import {NoAvatarImage} from 'assets';
import ImageEditButton from 'components/buttons/ImageEditButton';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';
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

const SettingsUserImage = ({
  userImageUri,
  isLoading,
}: {
  userImageUri?: string;
  isLoading?: boolean;
}) => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const {width, height} = useWindowDimensions();

  const handlePress = () => {
    navigation.navigate('NewUserNavigator', {
      screen: 'UserImageUploadScreen',
      params: {edit: true},
    });
  };
  return (
    <Pressable style={styles.imageContainer} onPress={handlePress}>
      <View style={styles.loadingContainer}>
        {isLoading && <LoadingButtonIcon size="large" />}
      </View>
      {userImageUri ? (
        <Image
          style={[styles.profilePic, {height: height * 0.15}]}
          source={{uri: userImageUri}}
          blurRadius={isLoading ? 30 : 0}
        />
      ) : (
        <Image
          style={[styles.noProfilePic, {height: height * 0.15}]}
          source={NoAvatarImage}
          blurRadius={isLoading ? 30 : 0}
        />
      )}

      <ImageEditButton right={width * 0.303} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    position: 'relative',
  },

  profilePic: {
    aspectRatio: 1,
    borderRadius: 12,
  },
  noProfilePic: {
    aspectRatio: 1,
    borderRadius: 12,
    width: '33%',
    height: '33%',
  },
  loadingContainer: {
    position: 'absolute',
    top: size(50),

    zIndex: 1,
  },
});

export default SettingsUserImage;
