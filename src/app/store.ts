import {configureStore} from '@reduxjs/toolkit';
import userJourneyReducer from '@Redux/userRegistration/userJourneySlice';
import imageUploadReducer from '@Redux/userImageUpload/userImageUploadSlice';
import flatHandlingReducer from '@Redux/flatHandling/flatHandlingSlice';

export default configureStore({
  reducer: {
    userDetails: userJourneyReducer,
    imageUpload: imageUploadReducer,
    flatDetails: flatHandlingReducer,
  },
});
