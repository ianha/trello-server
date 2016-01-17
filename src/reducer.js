import * as coreLib from './core'

export default function reducer(state = coreLib.INITIAL_STATE, action) {
  switch (state.type) {
    case coreLib.ADD_CARD:
      return coreLib.addCard(state, action);
    case coreLib.CREATE_BUCKET:
      return coreLib.createBucket(state, action);
    case coreLib.DELETE_BUCKET:
      return coreLib.deleteBucket(state, action);
    case coreLib.DELETE_CARD:
      return coreLib.deleteCard(state, action);
    case coreLib.MOVE_BUCKET:
      return coreLib.moveBucket(state, action);
    case coreLib.MOVE_CARD:
      return coreLib.moveCard(state, action);
    case coreLib.TRANSFER_CARD:
      return coreLib.transferCard(state, action);
    case coreLib.UPDATE_BUCKET:
      return coreLib.updateBucket(state, action);
    case coreLib.UPDATE_CARD:
      return coreLib.updateCard(state, action);
    default:
      return state;
  }
}