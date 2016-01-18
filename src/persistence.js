import { Map } from 'immutable';
export const INITIAL_STATE = Map();

export function persist(state) {
  // persist to durable store
}

export function getInitialState() {
  // get from persistence store
  return INITIAL_STATE;
}