import {configureStore} from '@reduxjs/toolkit';
import userJourneyReducer from '@Redux/userRegistration/userJourneySlice';

export default configureStore({
  reducer: {
    userDetails: userJourneyReducer,
  },
});
