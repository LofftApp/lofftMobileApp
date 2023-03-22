import {configureStore} from '@reduxjs/toolkit';
import userJourneyReducer from '@Redux/registration/userJourneySlice';
import imageUploadReducer from '@Redux/imageHandling/userImageUploadSlice';
import userReducer from '@Redux/user/usersSlice';
import flatsSlice from '@Redux/flat/flatsSlice';

export default configureStore({
  reducer: {
    userDetails: userJourneyReducer,
    imageUpload: imageUploadReducer,
    user: userReducer,
    flats: flatsSlice,
  },
});
