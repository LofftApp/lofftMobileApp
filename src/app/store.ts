import {configureStore} from '@reduxjs/toolkit';

// Slice imports
import userJourneyReducer from '@Redux/registration/userJourneySlice';
import imageUploadReducer from '@Redux/imageHandling/userImageUploadSlice';
import userReducer from '@Redux/user/usersSlice';
import flatsReducer from '@Redux/flat/flatsSlice';
import applicationsReducer from '@Redux/applications/applicationsSlice';

export const store = configureStore({
  reducer: {
    userDetails: userJourneyReducer,
    imageUpload: imageUploadReducer,
    user: userReducer,
    flats: flatsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
