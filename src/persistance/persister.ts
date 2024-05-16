import {persistStore} from 'redux-persist';
import {store} from 'reduxCore/store';

export const persister: any = persistStore(store);

export const clearPersister = () => {
  console.log('clearPersister called');
  persister.purge();
};
