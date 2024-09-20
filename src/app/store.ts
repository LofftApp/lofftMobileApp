import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {
  persistReducer,
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
import {lofftApi} from 'reduxFeatures/api/lofftApi';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  blacklist: [lofftApi.reducerPath, advertReducer.name],
};

const reducers = combineReducers({
  authentication: authenticationReducer,
  userDetails: userJourneyReducer,
  imageUpload: imageUploadReducer,
  user: userReducer,
  flats: flatsReducer,
  adverts: advertReducer,
  [lofftApi.reducerPath]: lofftApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(lofftApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
