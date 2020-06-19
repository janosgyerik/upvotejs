if (typeof(require) !== 'undefined') {
  var Setup = require('./lib/setup.js').Setup;
  jQuery = Setup.jQuery;
  Upvote = Setup.Upvote;
  require('../dist/upvotejs/upvotejs.jquery.js');

  $ = Setup.jQuery;
}

const create = (id, params, jqdom) => {
  const jq = jqdom.upvote(params);
  return {
    id: id,
    count: () => jq.upvote('count'),
    upvote: () => jq.upvote('upvote'),
    upvoted: () => jq.upvote('upvoted'),
    downvote: () => jq.upvote('downvote'),
    downvoted: () => jq.upvote('downvoted'),
    star: () => jq.upvote('star'),
    starred: () => jq.upvote('starred'),
    destroy: () => jq.upvote('destroy')
  };
};

Setup.create = create;

const gen = Setup.Utils.gen(create);
Setup.Tests.run(Setup, gen);

const assert = Setup.chai.assert;

describe('multiple objects from DOM selector', () => {
  it('should create and destroy widgets for DOM selector', () => {
    for (let i = 0; i < 5; i++) {
      const jqdom = Setup.Utils.addNewDom();
      jqdom.addClass('custom');
    }

    assert.equal($('.custom').length, 5);
    assert.equal($('.custom.upvotejs-enabled').length, 0);
    $('.custom').upvote();
    assert.equal($('.custom.upvotejs-enabled').length, 5);

    $('.custom').eq(2).upvote('upvote');
    assert.equal($('.custom').eq(2).upvote('count'), 1);
    $('.custom').eq(2).upvote('downvote');
    assert.equal($('.custom').eq(2).upvote('count'), -1);

    $('.custom').upvote('destroy');
    assert.equal($('.custom.upvotejs-enabled').length, 0);

    $('.custom').eq(0).attr('id', null);
    assert.throws(() => $('.custom').upvote());
    assert.equal($('.custom.upvotejs-enabled').length, 0);
  });

  it('should abort creating widgets if any fail in DOM selector', () => {
    for (let i = 0; i < 5; i++) {
      const jqdom = Setup.Utils.addNewDom();
      jqdom.addClass('custom2');
    }

    $('.custom2').eq(2).attr('id', null);
    assert.throws(() => $('.custom2').upvote());

    assert.equal($('.custom2').length, 5);
    assert.equal($('.custom2.upvotejs-enabled').length, 0);
  });
});

describe('calling non-existent method', () => {
  it('should raise an error', () => {
    const obj = gen({count: 3});
    const jq = $('#' + obj.id);
    assert.equal(jq.upvote('count'), 3);
    jq.upvote('upvote');
    assert.equal(jq.upvote('count'), 4);
    assert.throws(() => jq.upvote('foo'));
  });
});
