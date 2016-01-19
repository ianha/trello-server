import startServer from './src/server'
import makeStore from './src/store'
import { persist, STATE_FILE_PATH } from './src/persistence'

const store = makeStore();

store.subscribe(() => {
  persist(store.getState(), STATE_FILE_PATH);
})

startServer(store);