import {configureStore} from '@reduxjs/toolkit';
import userJourneyReducer from '@Redux/userRegistration/userJourneySlice';
import imageUploadReducer from '@Redux/userImageUpload/userImageUploadSlice';

export default configureStore({
  reducer: {
    userDetails: userJourneyReducer,
    imageUpload: imageUploadReducer,
  },
});
