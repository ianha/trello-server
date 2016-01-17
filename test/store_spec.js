import { expect } from 'chai';
import makeStore from '../src/store'
import { INITIAL_STATE } from '../src/core'

describe('store', () => {
  it('is a store with the correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(INITIAL_STATE);
  })
});