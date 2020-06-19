const assert = require('chai').assert;

const load = w => require('../dist/upvotejs/upvotejs.vanilla.js')(w);

describe('loading UpvoteJS', () => {
  it('should throw if specified window does not have document', () => {
    assert.throws(() => load('foo'), 'UpvoteJS requires a window with a document');
  });
});
