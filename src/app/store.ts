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
  blacklist: [lofftApi.reducerPath, authReducer.name],
};

const reducers = combineReducers({
  auth: authReducer,
  newUser: newUserReducer,
  imageUpload: imageUploadReducer,
  applications: applicationsReducer,
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
