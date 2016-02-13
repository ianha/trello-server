import Immutable from 'immutable';
import fs from 'fs';

export const INITIAL_STATE = Immutable.fromJS({
  buckets: []
})
export const STATE_FILE_PATH = './data/state.json'

export function persist(state, path, callback = (err) => { if (err) throw err; }) {
  fs.writeFile(path, JSON.stringify(state.toJS()), callback);
}

// This method is synchronous, but that's OK as it's only called once
// and subsequently stored in memory after applicatio startup.
export function getInitialState(filePath) {
  try {
    const json = fs.readFileSync(filePath).toString();
    return Immutable.fromJS(JSON.parse(json));
  } catch (err) {
    return INITIAL_STATE;
  }
}