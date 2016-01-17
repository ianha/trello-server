import { expect } from 'chai'
import * as coreLib from '../src/core'
import Immutable from 'immutable'

describe('bucket logic', () => {
  it('coreLib.moveBucket() index 1 -> 0', () => {
    const state = Immutable.fromJS({
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
        },
        {
          bucketId: 1,
          title: 'Development',
          cards: []
        }
      ]
    });
    const expectedNextState = Immutable.fromJS({
      buckets: [
        {
          bucketId: 1,
          title: 'Development',
          cards: []
        },
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
    });
    const action = {
      type: coreLib.MOVE_BUCKET,
      bucketId: 1,
      index: 0
    };

    const nextState = coreLib.moveBucket(state, action);
    expect(nextState).to.equal(expectedNextState);
  });

  it('coreLib.moveBucket() index 0 -> 1', () => {
    const state = Immutable.fromJS({
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
        },
        {
          bucketId: 1,
          title: 'Development',
          cards: []
        }
      ]
    });
    const expectedNextState = Immutable.fromJS({
      buckets: [
        {
          bucketId: 1,
          title: 'Development',
          cards: []
        },
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
    });
    const action = {
      type: coreLib.MOVE_BUCKET,
      bucketId: 0,
      index: 1
    };

    const nextState = coreLib.moveBucket(state, action);
    expect(nextState).to.equal(expectedNextState);
  });

  it('coreLib.moveBucket() index [0] -> [1]', () => {
    const state = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog',
          cards: []
        },
        {
          bucketId: 1,
          title: 'Development',
          cards: []
        },
        {
          bucketId: 2,
          title: 'Production',
          cards: []
        }
      ]
    });
    const expectedNextState = Immutable.fromJS({
      buckets: [
        {
          bucketId: 1,
          title: 'Development',
          cards: []
        },
        {
          bucketId: 0,
          title: 'Backlog',
          cards: []
        },
        {
          bucketId: 2,
          title: 'Production',
          cards: []
        }
      ]
    });
    const action = {
      type: coreLib.MOVE_BUCKET,
      bucketId: 0,
      index: 1
    };

    const nextState = coreLib.moveBucket(state, action);
    expect(nextState).to.equal(expectedNextState);
  });

  it('coreLib.moveBucket() index [0] -> [2]', () => {
    const state = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog',
          cards: []
        },
        {
          bucketId: 1,
          title: 'Development',
          cards: []
        },
        {
          bucketId: 2,
          title: 'Production',
          cards: []
        }
      ]
    });
    const expectedNextState = Immutable.fromJS({
      buckets: [
        {
          bucketId: 1,
          title: 'Development',
          cards: []
        },
        {
          bucketId: 2,
          title: 'Production',
          cards: []
        },
        {
          bucketId: 0,
          title: 'Backlog',
          cards: []
        },
      ]
    });
    const action = {
      type: coreLib.MOVE_BUCKET,
      bucketId: 0,
      index: 2
    };

    const nextState = coreLib.moveBucket(state, action);
    expect(nextState).to.equal(expectedNextState);
  });

  it('coreLib.moveBucket() index [1] -> [0]', () => {
    const state = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog',
          cards: []
        },
        {
          bucketId: 1,
          title: 'Development',
          cards: []
        },
        {
          bucketId: 2,
          title: 'Production',
          cards: []
        }
      ]
    });
    const expectedNextState = Immutable.fromJS({
      buckets: [
        {
          bucketId: 1,
          title: 'Development',
          cards: []
        },
        {
          bucketId: 0,
          title: 'Backlog',
          cards: []
        },
        {
          bucketId: 2,
          title: 'Production',
          cards: []
        },
      ]
    });
    const action = {
      type: coreLib.MOVE_BUCKET,
      bucketId: 1,
      index: 0
    };

    const nextState = coreLib.moveBucket(state, action);
    expect(nextState).to.equal(expectedNextState);
  });

  it('coreLib.moveBucket() index [1] -> [2]', () => {
    const state = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog',
          cards: []
        },
        {
          bucketId: 1,
          title: 'Development',
          cards: []
        },
        {
          bucketId: 2,
          title: 'Production',
          cards: []
        }
      ]
    });
    const expectedNextState = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog',
          cards: []
        },
        {
          bucketId: 2,
          title: 'Production',
          cards: []
        },
        {
          bucketId: 1,
          title: 'Development',
          cards: []
        }
      ]
    });
    const action = {
      type: coreLib.MOVE_BUCKET,
      bucketId: 1,
      index: 2
    };

    const nextState = coreLib.moveBucket(state, action);
    expect(nextState).to.equal(expectedNextState);
  });

  it('coreLib.moveBucket() index [2] -> [0]', () => {
    const state = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog',
          cards: []
        },
        {
          bucketId: 1,
          title: 'Development',
          cards: []
        },
        {
          bucketId: 2,
          title: 'Production',
          cards: []
        }
      ]
    });
    const expectedNextState = Immutable.fromJS({
      buckets: [
        {
          bucketId: 2,
          title: 'Production',
          cards: []
        },
        {
          bucketId: 0,
          title: 'Backlog',
          cards: []
        },
        {
          bucketId: 1,
          title: 'Development',
          cards: []
        }
      ]
    });
    const action = {
      type: coreLib.MOVE_BUCKET,
      bucketId: 2,
      index: 0
    };

    const nextState = coreLib.moveBucket(state, action);
    expect(nextState).to.equal(expectedNextState);
  });

  it('coreLib.moveBucket() index [2] -> [1]', () => {
    const state = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog',
          cards: []
        },
        {
          bucketId: 1,
          title: 'Development',
          cards: []
        },
        {
          bucketId: 2,
          title: 'Production',
          cards: []
        }
      ]
    });
    const expectedNextState = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog',
          cards: []
        },
        {
          bucketId: 2,
          title: 'Production',
          cards: []
        },
        {
          bucketId: 1,
          title: 'Development',
          cards: []
        }
      ]
    });
    const action = {
      type: coreLib.MOVE_BUCKET,
      bucketId: 2,
      index: 1
    };

    const nextState = coreLib.moveBucket(state, action);
    expect(nextState).to.equal(expectedNextState);
  });

  it('createBucket()', () => {
    const state = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog',
          cards: []
        }
      ]
    });
    const expectedNextState = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog',
          cards: []
        },
        {
          bucketId: 1,
          title: 'Development',
          cards: []
        }
      ]
    });
    const action = {
      type: coreLib.CREATE_BUCKET,
      bucketId: 1,
      title: 'Development'
    };

    const nextState = coreLib.createBucket(state, action);
    expect(nextState).to.equal(expectedNextState);
  });

  it('deleteBucket()', () => {
    const state = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog',
          cards: []
        }
      ]
    });
    const expectedNextState = Immutable.fromJS({
      buckets: []
    });
    const action = {
      type: coreLib.DELETE_BUCKET,
      bucketId: 0
    };

    const nextState = coreLib.deleteBucket(state, action);
    expect(nextState).to.equal(expectedNextState);
  });

  it('updateBucket()', () => {
    const state = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog',
          cards: []
        }
      ]
    });
    const expectedNextState = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog 2',
          cards: []
        }
      ]
    });
    const action = {
      type: coreLib.UPDATE_BUCKET,
      bucketId: 0,
      fields: {
        title: 'Backlog 2'
      }
    };

    const nextState = coreLib.updateBucket(state, action);
    expect(nextState).to.equal(expectedNextState);
  });
});
