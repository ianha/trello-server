import { expect } from 'chai';
import { persist, getInitialState, INITIAL_STATE } from '../src/persistence';
import Immutable from 'immutable';
import { UUID } from '../src/util'
import fs from 'fs';

const TEST_PATH = './test/data/test_state.json';

describe('persistence', () => {
  it('get default state', () => {
    const state = getInitialState('/soms/random/file/path');
    expect(state).to.equal(INITIAL_STATE);
  });

  it('get state from file', () => {
    const state = getInitialState(TEST_PATH);
    const expectedState = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog',
          cards: [
            {
              cardId: 0,
              title: 'Mockup design',
              description: 'Mockup the first initial design'
            }
          ]
        }
      ]
    })
    expect(state).to.equal(expectedState);
  });

  it('persists state to file', () => {
    const filePath = `./test/data/${UUID()}.json`
    const state = Immutable.Map({ uuid: UUID() });

    persist(state, filePath, (err) => {
      if (err) {
        console.log("error! " + err);
        return;
      }

      try {
        const readState = getInitialState(filePath);
        expect(state).to.equal(readState);
      } catch (err) {
        console.log(err);
      }

      fs.unlink(filePath);
    })
  });
});
