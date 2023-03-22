import {configureStore} from '@reduxjs/toolkit';
import userJourneyReducer from '@Redux/registration/userJourneySlice';
import imageUploadReducer from '@Redux/imageHandling/userImageUploadSlice';

export default configureStore({
  reducer: {
    userDetails: userJourneyReducer,
    imageUpload: imageUploadReducer,
  },
});
