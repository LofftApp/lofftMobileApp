// This is the API for storing data within firebase container storage system.
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';

if (__DEV__) {
  let host = 'localhost';
  // If using Mobile device set the host as local IP set host in App.js and wihtin the firebase.json for each method
  // host = '192.168.100.134';
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
  });
  if (!images.didCancel) {
    uploadUserImages(images);
  }
};

const uploadUserImages = async (image: any) => {
  console.log(image.assets[0].fileName);
  const newFileName = randomName();
  const pathToFile = `${utils.FilePath.TEMP_DIRECTORY}/${image.fileName}`;
  const reference = storage().ref(`${newFileName}.jpg`);
  reference.putFile(pathToFile);
  // await reference.putFile(pathToFile);
};
