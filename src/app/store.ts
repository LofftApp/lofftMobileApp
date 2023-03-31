import {configureStore} from '@reduxjs/toolkit';
import {authenticationSlice} from '@Redux/authentication/authenticationSlice';
import userJourneyReducer from '@Redux/registration/userJourneySlice';
import imageUploadReducer from '@Redux/imageHandling/userImageUploadSlice';
import userReducer from '@Redux/user/usersSlice';
import flatsSlice from '@Redux/flat/flatsSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
    userDetails: userJourneyReducer,
    imageUpload: imageUploadReducer,
    user: userReducer,
    flats: flatsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
