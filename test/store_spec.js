import { expect } from 'chai';
import makeStore from '../src/store'
import { INITIAL_STATE } from '../src/persistence'
import sinon from 'sinon'
import Immutable from 'immutable'
import * as persistence from '../src/persistence'

describe('store', () => {
  it('is a store with the correct initial state', () => {
    const initialState = Immutable.fromJS({
      buckets: []
    })
    sinon.stub(persistence, 'getInitialState', () => {
      return Immutable.fromJS({
        buckets: []
      })
    });
    const store = makeStore();
    expect(store.getState()).to.equal(INITIAL_STATE);
    persistence.getInitialState.restore();
  })
});