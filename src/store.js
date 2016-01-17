import reducer from './reducer';
import { createStore } from 'redux';

export default function makeStore() {
  return createStore(reducer);
}