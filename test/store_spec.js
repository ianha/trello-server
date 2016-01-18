import { expect } from 'chai';
import makeStore from '../src/store'
import { INITIAL_STATE } from '../src/persistence'

describe('store', () => {
  it('is a store with the correct initial state', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(INITIAL_STATE);
  })
});