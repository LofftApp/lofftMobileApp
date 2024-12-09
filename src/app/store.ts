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
import authReducer from 'reduxFeatures/auth/authSlice';
import newUserReducer from 'reduxFeatures/registration/newUserSlice';
import imageUploadReducer from 'reduxFeatures/imageHandling/imageUploadSlice';
import {lofftApi} from 'reduxFeatures/api/lofftApi';
import applicationsReducer from 'reduxFeatures/applications/applicationSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  blacklist: [lofftApi.reducerPath],
};

const rootReducer = combineReducers({
  auth: authReducer,
  newUser: newUserReducer,
  imageUpload: imageUploadReducer,
  applications: applicationsReducer,
  [lofftApi.reducerPath]: lofftApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = configureStore({
  reducer: persistedReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(lofftApi.middleware),
});

export const setupStoreForTesting = (
  preloadedState?: Partial<ReturnType<typeof rootReducer>>,
) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(lofftApi.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof setupStore;
export type AppStoreForTesting = ReturnType<typeof setupStoreForTesting>;
export type AppDispatch = AppStore['dispatch'];
