// This is the API for storing data within firebase container storage system.
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';

if (__DEV__) {
  let host = 'localhost';
  // If using Mobile device set the host as local IP set host in App.js and wihtin the firebase.json for each method
  host = '192.168.0.105';
  storage().useEmulator(host, 9199);
}

const randomName = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const libraryImageUpload = async () => {
  const images = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: 5,
  });
  if (!images.didCancel) {
    try {
      await uploadUserImages(images);
    } catch (error) {
      console.log(error);
    }
  }
};

const uploadUserImages = async (images: any) => {
  images.assets.map(async (image: any) => {
    try {
      const approvedFileTypes = ['jpg', 'jpeg', 'png'];
      const fileType = image.uri.split('.')[1];
      if (approvedFileTypes.includes(fileType)) {
        const newFileName = randomName();
        const reference = await storage().ref(`${newFileName}.${fileType}`);
        await reference.putFile(image.uri);
      } else {
        throw new Error('Wrong File Type: ensure the file is jpg, jpeg or png');
      }
    } catch (error) {
      console.log(error);
    }
  });
};
