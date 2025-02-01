import {useNavigation} from '@react-navigation/native';
import ImageEditButton from 'components/buttons/ImageEditButton';
import {SettingsScreenNavigationProp} from 'navigationStacks/types';
import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';

const SettingsUserImage = ({userImageUri}: {userImageUri: string}) => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const handlePress = () => {
    navigation.navigate('EditProfileScreen');
  };
  return (
    <Pressable style={styles.imageContainer} onPress={handlePress}>
      <Image style={styles.profilePic} source={{uri: userImageUri}} />

      <ImageEditButton right={141} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    position: 'relative',
  },

  profilePic: {
    width: '35%',
    aspectRatio: 1,
    borderRadius: 12,
  },
});

export default SettingsUserImage;
