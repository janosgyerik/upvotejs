if (typeof(require) !== 'undefined') {
  var Setup = require('./lib/setup.js').Setup;
}

const create = (id, params) => {
  return Setup.Upvote.create(id, params);
};

Setup.create = create;

const gen = Setup.Utils.gen(create);
Setup.Tests.run(Setup, gen);

const assert = Setup.chai.assert;

describe('for other kind of invalid parameters', () => {
  it('should throw', () => {
    assert.throws(() => gen({id: 'nonexistent'}), /element with ID "nonexistent" must exist in the DOM/);
  });
});

describe('when destroy is called twice', () => {
  it('should throw', () => {
    const obj = gen();
    obj.destroy();
    assert.throws(() => obj.destroy());
  });
});
