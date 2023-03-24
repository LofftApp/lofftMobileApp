import {configureStore} from '@reduxjs/toolkit';
import userJourneyReducer from '@Redux/registration/userJourneySlice';
import imageUploadReducer from '@Redux/imageHandling/userImageUploadSlice';
import userReducer from '@Redux/user/usersSlice';
import flatsSlice from '@Redux/flat/flatsSlice';

const store = configureStore({
  reducer: {
    userDetails: userJourneyReducer,
    imageUpload: imageUploadReducer,
    user: userReducer,
    flats: flatsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
