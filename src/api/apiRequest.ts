import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const lofftRequest = async () => {
  const token = await EncryptedStorage.getItem('token');

  const apiRequest = axios.create({
    headers: {
      ContentType: 'application/json',
      Authorization: token,
    },
  });
  return apiRequest;
};

export {lofftRequest};
