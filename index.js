import startServer from './src/server'
import makeStore from './src/store'
import { persist } from './src/persistence'

const store = makeStore();

store.subscribe(() => {
  persist(store.getState());
})

startServer(store);