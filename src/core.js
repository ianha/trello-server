import { Map, List } from 'immutable';
import * as util from './util';

export const INITIAL_STATE = Map();

export const TRANSFER_CARD = 'TRANSFER_CARD'
export const MOVE_CARD = 'MOVE_CARD'
export const ADD_CARD = 'ADD_CARD'
export const DELETE_CARD = 'DELETE_CARD'
export const UPDATE_CARD = 'UPDATE_CARD'
export const MOVE_BUCKET = 'MOVE_BUCKET'
export const UPDATE_BUCKET = 'UPDATE_BUCKET'
export const CREATE_BUCKET = 'CREATE_BUCKET'
export const DELETE_BUCKET = 'DELETE_BUCKET'

export function transferCard(state, action) {
  const fromBucket = state.get('buckets').find(x => x.get('bucketId') === action.fromBucketId)
  const card = fromBucket.get('cards').find(x => x.get('cardId') === action.cardId);

  return state
    .update('buckets', buckets => {
      const fromBucketIndex = buckets.findIndex(b => b.get('bucketId') === action.fromBucketId)
      return buckets.update(fromBucketIndex, bucket => {
        return bucket.set('cards', bucket.get('cards').filterNot(c => c.get('cardId') === action.cardId))
      })
    })
    .update('buckets', buckets => {
      const toBucketIndex = buckets.findIndex(b => b.get('bucketId') === action.toBucketId)
      return buckets.update(toBucketIndex, bucket => {
        return bucket.set('cards', bucket.get('cards').splice(action.index, 0, card))
      })
    })
}

export function moveBucket(state, action) {
  const idx = state.get('buckets').findIndex(x => x.get('bucketId') === action.bucketId)
  const bucket = state.get('buckets').get(idx)
  return state
    .update('buckets', buckets => {
      return buckets.delete(idx).splice(action.index, 0, bucket)
    })
}

export function moveCard(state, action) {
  return state
    .update('buckets', buckets => {
      const bucketIndex = buckets.findIndex(b => b.get('bucketId') === action.bucketId)
      return buckets.update(bucketIndex, bucket => {
        const idx = bucket.get('cards').findIndex(x => x .get('cardId') === action.cardId)
        const card = bucket.get('cards').get(idx)
        return bucket.set('cards', bucket.get('cards').delete(idx).splice(action.index, 0, card))
      })
    });
}

function createCardFromAction(action) {
  return Map({
    title: action.title,
    description: action.description,
    cardId: util.UUID()
  });
}

export function addCard(state, action = {}) {
  return state
    .update('buckets', buckets => {
      const bucketIndex = buckets.findIndex(b => b.get('bucketId') === action.bucketId)
      return buckets.update(bucketIndex, bucket => {
        return bucket.set('cards', bucket.get('cards').push(createCardFromAction(action)))
      });
    });
}

export function deleteCard(state, action) {
  return state
    .update('buckets', buckets => {
      const bucketIndex = buckets.findIndex(b => b.get('bucketId') === action.bucketId)
      return buckets.update(bucketIndex, bucket => {
        const idx = bucket.get('cards').findIndex(x => x .get('cardId') === action.cardId)
        return bucket.set('cards', bucket.get('cards').delete(idx))
      });
    });
}

function createBucketFromAction(action) {
  return Map({
    bucketId: util.UUID(),
    title: action.title,
    cards: List()
  });
}
export function createBucket(state, action) {
  return state
    .update('buckets', buckets => {
      return buckets.push(createBucketFromAction(action));
    })
}

export function deleteBucket(state, action) {
  return state
    .update('buckets', buckets => {
      const bucketIndex = state.get('buckets').findIndex(b => b.get('bucketId') === action.bucketId)
      return buckets.delete(bucketIndex);
    });
}

export function updateBucket(state, action) {
  return state
    .update('buckets', buckets => {
      const bucketIndex = state.get('buckets').findIndex(b => b.get('bucketId') === action.bucketId)
      return buckets.update(bucketIndex, bucket => {
        return bucket.merge(action.fields)
      })
    });
}

export function updateCard(state, action) {
  const bucketIndex = state.get('buckets').findIndex(b => b.get('bucketId') === action.bucketId)
  const cardIndex = state.get('buckets').get(bucketIndex).get('cards').findIndex(x => x .get('cardId') === action.cardId)

  return state
    .update('buckets', buckets => {
      return buckets.update(bucketIndex, bucket => {
        return bucket.update('cards', cards => {
          return cards.update(cardIndex, card => {
            return card.merge(action.fields)
          })
        });
      })
    });
}
