import {persistStore} from 'redux-persist';
import {setupStore} from 'reduxCore/store';

export const persister: any =
  process.env.NODE_ENV === 'test' ? null : persistStore(setupStore());

export const clearPersister = () => {
  console.log('clearPersister called');
  persister.purge();
};
