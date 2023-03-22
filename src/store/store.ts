import {compose, createStore, applyMiddleware} from 'redux';

import {rootReducer} from './reducers';

export const store = createStore(rootReducer);
