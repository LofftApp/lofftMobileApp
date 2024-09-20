import {persistStore} from 'redux-persist';
import {store} from 'reduxCore/store';

export const persister: any =
  process.env.NODE_ENV === 'test' ? null : persistStore(store);

export const clearPersister = () => {
  console.log('clearPersister called');
  persister.purge();
};
