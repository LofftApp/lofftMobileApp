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
import authenticationReducer from 'redux/authentication/authenticationSlice';
import userJourneyReducer from 'redux/registration/userJourneySlice';
import imageUploadReducer from 'redux/imageHandling/userImageUploadSlice';
import userReducer from 'redux/user/usersSlice';
import flatsReducer from 'redux/flat/flatsSlice';
import advertReducer from 'redux/adverts/advertSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
};

const reducers: any = combineReducers({
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
