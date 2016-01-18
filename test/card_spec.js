import { expect } from 'chai'
import * as coreLib from '../src/core'
import Immutable from 'immutable'
import sinon from 'sinon'
import * as util from '../src/util'

describe('transfer card logic', () => {
  it('transferCard() size 1 -> 0', () => {
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
          bucketId: 0,
          title: 'Backlog',
          cards: []
        },
        {
          bucketId: 1,
          title: 'Development',
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
      type: coreLib.TRANSFER_CARD,
      fromBucketId: 0,
      toBucketId: 1,
      cardId: 0,
      index: 0
    };

    const nextState = coreLib.transferCard(state, action);
    expect(nextState).to.equal(expectedNextState);
  });

  it('transferCard() size 2 -> 0', () => {
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
            },
            {
              cardId: 1,
              title: 'Mockup design 2',
              description: 'Mockup the first second design'
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
          bucketId: 0,
          title: 'Backlog',
          cards: [
            {
              cardId: 1,
              title: 'Mockup design 2',
              description: 'Mockup the first second design'
            }
          ]
        },
        {
          bucketId: 1,
          title: 'Development',
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
      type: coreLib.TRANSFER_CARD,
      fromBucketId: 0,
      toBucketId: 1,
      cardId: 0,
      index: 0
    };

    const nextState = coreLib.transferCard(state, action);
    expect(nextState).to.equal(expectedNextState);
  });

  it('transferCard() size 1 -> 1 prepend', () => {
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
          cards: [
            {
              cardId: 1,
              title: 'Mockup design 2',
              description: 'Mockup the first second design'
            }
          ]
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
          cards: [
            {
              cardId: 0,
              title: 'Mockup design',
              description: 'Mockup the first initial design'
            },
            {
              cardId: 1,
              title: 'Mockup design 2',
              description: 'Mockup the first second design'
            }
          ]
        }
      ]
    });
    const action = {
      type: coreLib.TRANSFER_CARD,
      fromBucketId: 0,
      toBucketId: 1,
      cardId: 0,
      index: 0
    };

    const nextState = coreLib.transferCard(state, action);
    expect(nextState).to.equal(expectedNextState);
  });

  it('transferCard() size 1 -> 1 postpend', () => {
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
          cards: [
            {
              cardId: 1,
              title: 'Mockup design 2',
              description: 'Mockup the first second design'
            }
          ]
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
          cards: [
            {
              cardId: 1,
              title: 'Mockup design 2',
              description: 'Mockup the first second design'
            },
            {
              cardId: 0,
              title: 'Mockup design',
              description: 'Mockup the first initial design'
            },
          ]
        }
      ]
    });
    const action = {
      type: coreLib.TRANSFER_CARD,
      fromBucketId: 0,
      toBucketId: 1,
      cardId: 0,
      index: 1
    };

    const nextState = coreLib.transferCard(state, action);
    expect(nextState).to.equal(expectedNextState);
  });

  it('transferCard() size 1 -> 2 middle', () => {
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
          cards: [
            {
              cardId: 1,
              title: 'Mockup design 2',
              description: 'Mockup the first second design'
            },
            {
              cardId: 2,
              title: 'Mockup design 3',
              description: 'Mockup the first third design'
            }
          ]
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
          cards: [
            {
              cardId: 1,
              title: 'Mockup design 2',
              description: 'Mockup the first second design'
            },
            {
              cardId: 0,
              title: 'Mockup design',
              description: 'Mockup the first initial design'
            },
            {
              cardId: 2,
              title: 'Mockup design 3',
              description: 'Mockup the first third design'
            }
          ]
        }
      ]
    });
    const action = {
      type: coreLib.TRANSFER_CARD,
      fromBucketId: 0,
      toBucketId: 1,
      cardId: 0,
      index: 1
    };

    const nextState = coreLib.transferCard(state, action);
    expect(nextState).to.equal(expectedNextState);
  });

  it('transferCard() bucket 1 -> 2 postpend', () => {
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
          cards: [
            {
              cardId: 1,
              title: 'Mockup design 2',
              description: 'Mockup the first second design'
            },
            {
              cardId: 2,
              title: 'Mockup design 3',
              description: 'Mockup the first third design'
            }
          ]
        },
        {
          bucketId: 2,
          title: 'Production',
          cards: [
            {
              cardId: 4,
              title: 'Mockup design 4',
              description: 'Final design'
            }
          ]
        },
      ]
    });
    const expectedNextState = Immutable.fromJS({
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
          cards: [
            {
              cardId: 1,
              title: 'Mockup design 2',
              description: 'Mockup the first second design'
            }
          ]
        },
        {
          bucketId: 2,
          title: 'Production',
          cards: [
            {
              cardId: 4,
              title: 'Mockup design 4',
              description: 'Final design'
            },
            {
              cardId: 2,
              title: 'Mockup design 3',
              description: 'Mockup the first third design'
            }
          ]
        },
      ]
    });
    const action = {
      type: coreLib.TRANSFER_CARD,
      fromBucketId: 1,
      toBucketId: 2,
      cardId: 2,
      index: 1
    };

    const nextState = coreLib.transferCard(state, action);
    expect(nextState).to.equal(expectedNextState);
  })
});

describe('move card logic', () => {
  it('moveCard() [0] -> [1]', () => {
    const state = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog',
          cards: [
            {
              cardId: 0,
              title: 'Mock up design',
              description: 'Mockup the first initial design'
            },
            {
              cardId: 1,
              title: 'Implement design',
              description: 'Implement the design'
            },
            {
              cardId: 2,
              title: 'Ship design',
              description: 'Ship to production'
            },
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
          bucketId: 0,
          title: 'Backlog',
          cards: [
            {
              cardId: 1,
              title: 'Implement design',
              description: 'Implement the design'
            },
            {
              cardId: 0,
              title: 'Mock up design',
              description: 'Mockup the first initial design'
            },
            {
              cardId: 2,
              title: 'Ship design',
              description: 'Ship to production'
            },
          ]
        },
        {
          bucketId: 1,
          title: 'Development',
          cards: []
        }
      ]
    });
    const action = {
      type: coreLib.MOVE_CARD,
      bucketId: 0,
      cardId: 0,
      index: 1
    };

    const nextState = coreLib.moveCard(state, action);
    expect(nextState).to.equal(expectedNextState);
  });

  it('moveCard() [0] -> [2]', () => {
    const state = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog',
          cards: [
            {
              cardId: 0,
              title: 'Mock up design',
              description: 'Mockup the first initial design'
            },
            {
              cardId: 1,
              title: 'Implement design',
              description: 'Implement the design'
            },
            {
              cardId: 2,
              title: 'Ship design',
              description: 'Ship to production'
            },
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
          bucketId: 0,
          title: 'Backlog',
          cards: [
            {
              cardId: 1,
              title: 'Implement design',
              description: 'Implement the design'
            },
            {
              cardId: 2,
              title: 'Ship design',
              description: 'Ship to production'
            },
            {
              cardId: 0,
              title: 'Mock up design',
              description: 'Mockup the first initial design'
            },
          ]
        },
        {
          bucketId: 1,
          title: 'Development',
          cards: []
        }
      ]
    });
    const action = {
      type: coreLib.MOVE_CARD,
      bucketId: 0,
      cardId: 0,
      index: 2
    };

    const nextState = coreLib.moveCard(state, action);
    expect(nextState).to.equal(expectedNextState);
  });

  it('moveCard() [1] -> [0]', () => {
    const state = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog',
          cards: [
            {
              cardId: 0,
              title: 'Mock up design',
              description: 'Mockup the first initial design'
            },
            {
              cardId: 1,
              title: 'Implement design',
              description: 'Implement the design'
            },
            {
              cardId: 2,
              title: 'Ship design',
              description: 'Ship to production'
            },
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
          bucketId: 0,
          title: 'Backlog',
          cards: [
            {
              cardId: 1,
              title: 'Implement design',
              description: 'Implement the design'
            },
            {
              cardId: 0,
              title: 'Mock up design',
              description: 'Mockup the first initial design'
            },
            {
              cardId: 2,
              title: 'Ship design',
              description: 'Ship to production'
            },
          ]
        },
        {
          bucketId: 1,
          title: 'Development',
          cards: []
        }
      ]
    });
    const action = {
      type: coreLib.MOVE_CARD,
      bucketId: 0,
      cardId: 1,
      index: 0
    };

    const nextState = coreLib.moveCard(state, action);
    expect(nextState).to.equal(expectedNextState);
  });

  it('moveCard() [1] -> [2]', () => {
    const state = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog',
          cards: [
            {
              cardId: 0,
              title: 'Mock up design',
              description: 'Mockup the first initial design'
            },
            {
              cardId: 1,
              title: 'Implement design',
              description: 'Implement the design'
            },
            {
              cardId: 2,
              title: 'Ship design',
              description: 'Ship to production'
            },
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
          bucketId: 0,
          title: 'Backlog',
          cards: [
            {
              cardId: 0,
              title: 'Mock up design',
              description: 'Mockup the first initial design'
            },
            {
              cardId: 2,
              title: 'Ship design',
              description: 'Ship to production'
            },
            {
              cardId: 1,
              title: 'Implement design',
              description: 'Implement the design'
            },
          ]
        },
        {
          bucketId: 1,
          title: 'Development',
          cards: []
        }
      ]
    });
    const action = {
      type: coreLib.MOVE_CARD,
      bucketId: 0,
      cardId: 1,
      index: 2
    };

    const nextState = coreLib.moveCard(state, action);
    expect(nextState).to.equal(expectedNextState);
  });

  it('moveCard() [2] -> [0]', () => {
    const state = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog',
          cards: [
            {
              cardId: 0,
              title: 'Mock up design',
              description: 'Mockup the first initial design'
            },
            {
              cardId: 1,
              title: 'Implement design',
              description: 'Implement the design'
            },
            {
              cardId: 2,
              title: 'Ship design',
              description: 'Ship to production'
            },
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
          bucketId: 0,
          title: 'Backlog',
          cards: [
            {
              cardId: 2,
              title: 'Ship design',
              description: 'Ship to production'
            },
            {
              cardId: 0,
              title: 'Mock up design',
              description: 'Mockup the first initial design'
            },
            {
              cardId: 1,
              title: 'Implement design',
              description: 'Implement the design'
            },
          ]
        },
        {
          bucketId: 1,
          title: 'Development',
          cards: []
        }
      ]
    });
    const action = {
      type: coreLib.MOVE_CARD,
      bucketId: 0,
      cardId: 2,
      index: 0
    };

    const nextState = coreLib.moveCard(state, action);
    expect(nextState).to.equal(expectedNextState);
  });

  it('moveCard() [2] -> [1]', () => {
    const state = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog',
          cards: [
            {
              cardId: 0,
              title: 'Mock up design',
              description: 'Mockup the first initial design'
            },
            {
              cardId: 1,
              title: 'Implement design',
              description: 'Implement the design'
            },
            {
              cardId: 2,
              title: 'Ship design',
              description: 'Ship to production'
            },
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
          bucketId: 0,
          title: 'Backlog',
          cards: [
            {
              cardId: 0,
              title: 'Mock up design',
              description: 'Mockup the first initial design'
            },
            {
              cardId: 2,
              title: 'Ship design',
              description: 'Ship to production'
            },
            {
              cardId: 1,
              title: 'Implement design',
              description: 'Implement the design'
            },
          ]
        },
        {
          bucketId: 1,
          title: 'Development',
          cards: []
        }
      ]
    });
    const action = {
      type: coreLib.MOVE_CARD,
      bucketId: 0,
      cardId: 2,
      index: 1
    };

    const nextState = coreLib.moveCard(state, action);
    expect(nextState).to.equal(expectedNextState);
  });
});

describe('card logic', () => {
  it('addCard()', () => {
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
          cards: [
            {
              cardId: 0,
              title: 'New card',
              description: 'New card description'
            }
          ]
        }
      ]
    });
    const action = {
      type: coreLib.ADD_CARD,
      bucketId: 0,
      title: 'New card',
      description: 'New card description'
    };

    sinon.stub(util, 'UUID', () => {
      return 0;
    });

    const nextState = coreLib.addCard(state, action);
    expect(nextState).to.equal(expectedNextState);
    util.UUID.restore();
  });

  it('deleteCard()', () => {
    const state = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog',
          cards: [
            {
              cardId: 0,
              title: 'New card',
              description: 'New card description'
            }
          ]
        }
      ]
    });
    const expectedNextState = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog',
          cards: []
        }
      ]
    });
    const action = {
      type: coreLib.DELETE_CARD,
      bucketId: 0,
      cardId: 0
    };

    const nextState = coreLib.deleteCard(state, action);
    expect(nextState).to.equal(expectedNextState);
  });

  it('updateCard()', () => {
    const state = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog',
          cards: [
            {
              cardId: 0,
              title: 'Title',
              description: 'Description'
            }
          ]
        }
      ]
    });
    const expectedNextState = Immutable.fromJS({
      buckets: [
        {
          bucketId: 0,
          title: 'Backlog',
          cards: [
            {
              cardId: 0,
              title: 'Title 2',
              description: 'Description 2'
            }
          ]
        }
      ]
    });
    const action = {
      type: coreLib.UPDATE_CARD,
      bucketId: 0,
      cardId: 0,
      fields: {
        title: 'Title 2',
        description: 'Description 2'
      }
    };

    const nextState = coreLib.updateCard(state, action);
    expect(nextState).to.equal(expectedNextState);
  })
});
