import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Slices (Reducers)
import authenticationReducer from 'reduxFeatures/authentication/authenticationSlice';
import userJourneyReducer from 'reduxFeatures/registration/userJourneySlice';
import imageUploadReducer from 'reduxFeatures/imageHandling/userImageUploadSlice';
import userReducer from 'reduxFeatures/user/usersSlice';
import flatsReducer from 'reduxFeatures/flat/flatsSlice';
import advertReducer from 'reduxFeatures/adverts/advertSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
};

const reducers = combineReducers({
  authentication: authenticationReducer,
  userDetails: userJourneyReducer,
  imageUpload: imageUploadReducer,
  user: userReducer,
  flats: flatsReducer,
  adverts: advertReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
