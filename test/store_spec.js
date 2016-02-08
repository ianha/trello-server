import { expect } from 'chai';
import makeStore from '../src/store'
import { INITIAL_STATE } from '../src/persistence'
import sinon from 'sinon'
import { Map } from 'immutable'
import * as persistence from '../src/persistence'

describe('store', () => {
  it('is a store with the correct initial state', () => {
    const initialState = Map()
    sinon.stub(persistence, 'getInitialState', () => {
      return Map()
    });
    const store = makeStore();
    expect(store.getState()).to.equal(INITIAL_STATE);
    persistence.getInitialState.restore();
  })
});