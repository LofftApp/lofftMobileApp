// This is the API for storing data within firebase container storage system.
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import {
//   uploadImageToUserProfile,
//   uploadLibraryImagesToUserProfile,
//   deleteImageFromImageLibraryRef,
// } from './firestoreActions';
// import {addImageToAuth} from '@Firebase/firebaseApi';
import auth from '@react-native-firebase/auth';

if (__DEV__) {
  let host = 'localhost';
  // If using Mobile device set the host as local IP set host in App.js and wihtin the firebase.json for each method
  // host = '192.168.7.156';
  storage().useEmulator(host, 9199);
}

const randomName = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

// const saveImageLibrary = ({targetId, urls, targetDB}) => {
//   uploadLibraryImagesToUserProfile({targetId, urls, targetDB});
// };

export const libraryImageUpload = async ({limit}: any) => {
  const targetId = randomName();
  const results = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: limit,
  });
  if (!results.didCancel) {
    const response = await uploadUserImages({results, targetId});
    return response;
  }
};

const uploadUserImages = async ({results, targetId}: any) => {
  const urls = await Promise.all(
    results.assets.map(async (asset: any) => {
      const newFileName = randomName();
      const pathToFile = `${utils.FilePath.TEMP_DIRECTORY}/${asset.fileName}`;
      const reference = storage().ref(`${targetId}/${newFileName}.jpg`);
      await reference.putFile(pathToFile);
      const response = await reference.getDownloadURL();
      return {lofftId: targetId, images: response};
    }),
  );

  // if (path === 'userImage') {
  //   const image = saveProfileImage(targetId, urls[0]);
  //   return image;
  // } else if (path === 'imageLibrary') {
  //   saveImageLibrary({targetId, urls, targetDB});
  // }
};

// export const userImageUpload = async () => {
//   const results = await launchImageLibrary({mediaType: 'photo'});
//   const target = auth().currentUser.uid;
//   if (!results.didCancel) {
//     return uploadUserImages(results, target, 'userImage');
//   }
//   return false;
// };

// export const userTakePhoto = async () => {
//   const results = await launchCamera({mediaType: 'photo'});
//   const target = auth().currentUser.uid;
//   if (!results.didCancel) {
//     return uploadUserImages(results, target, 'userImage');
//   }
//   return false;
// };

// export const deleteLibraryImage = url => {
//   const user = auth().currentUser.uid;
//   const imageRef = storage().refFromURL(url);
//   imageRef.delete();
//   deleteImageFromImageLibraryRef(user, url);
// };
