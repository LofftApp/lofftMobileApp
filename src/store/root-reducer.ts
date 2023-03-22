import {combineReducers} from 'redux';
import {userReducer} from './user/user.reducer';

export const rootReducer = combineReducers({
  // Add reducers here
  user: userReducer,
});
