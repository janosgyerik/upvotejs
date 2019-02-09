// this file expects a 'create' function already defined

const gen = function() {
  var idcount = 0;
  return (params = {}) => {
    ++idcount;
    const id = params.id || ('u' + idcount);
    const jqdom = $('#templates div.upvotejs').clone();
    jqdom.attr('id', id);
    $('#tests').append(jqdom);
    params.callback = params.callback || (data => {});
    return create(id, params, jqdom);
  };
}();

const uiTester = obj => {
  const widget = $('#' + obj.id);
  const count = widget.find('.count');
  const upvote = widget.find('.upvote');
  const downvote = widget.find('.downvote');
  const star = widget.find('.star');

  return {
    count: () => parseInt(count.text(), 10),
    upvoted: () => upvote.hasClass('upvote-on'),
    downvoted: () => downvote.hasClass('downvote-on'),
    starred: () => star.hasClass('star-on'),
    upvote: () => upvote.click(),
    downvote: () => downvote.click(),
    star: () => star.click()
  };
};

QUnit.test('initialize from params', assert => {
  const obj = gen();
  assert.equal(obj.count(), 0);
  assert.equal(obj.upvoted(), false);
  assert.equal(obj.downvoted(), false);
  assert.equal(obj.starred(), false);

  assert.equal(gen({count: 17}).count(), 17);
  assert.equal(gen({upvoted: true}).upvoted(), true);
  assert.equal(gen({downvoted: true}).downvoted(), true);
  assert.equal(gen({starred: true}).starred(), true);

  assert.throws(() => gen({count: 'foo'}), 'throw if count param is not an integer');
  assert.throws(() => gen({upvoted: 'foo'}), 'throw if upvoted param is not a boolean');
  assert.throws(() => gen({downvoted: 'foo'}), 'throw if downvoted param is not a boolean');
  assert.throws(() => gen({starred: 'foo'}), 'throw if starred param is not a boolean');
  assert.throws(() => gen({callback: 'foo'}), 'throw if callback param is not a function');
  assert.throws(() => gen({upvoted: true, downvoted: true}), 'throw if upvoted=true and downvoted=true');
});

QUnit.test('initialize from dom', assert => {
  const v1 = Upvote.create('count-1');
  assert.equal(v1.count(), 1);
  assert.equal(v1.upvoted(), false);
  assert.equal(v1.downvoted(), false);
  assert.equal(v1.starred(), false);

  const v2 = Upvote.create('count-2-upvoted');
  assert.equal(v2.count(), 2);
  assert.equal(v2.upvoted(), true);
  assert.equal(v2.downvoted(), false);
  assert.equal(v2.starred(), false);

  const v3 = Upvote.create('count-3-upvoted-starred');
  assert.equal(v3.count(), 3);
  assert.equal(v3.upvoted(), true);
  assert.equal(v3.downvoted(), false);
  assert.equal(v3.starred(), true);

  const v4 = Upvote.create('count-4-downvoted');
  assert.equal(v4.count(), 4);
  assert.equal(v4.upvoted(), false);
  assert.equal(v4.downvoted(), true);
  assert.equal(v4.starred(), false);

  const v5 = Upvote.create('count-5-downvoted-starred');
  assert.equal(v5.count(), 5);
  assert.equal(v5.upvoted(), false);
  assert.equal(v5.downvoted(), true);
  assert.equal(v5.starred(), true);

  const vLarge = Upvote.create('count-456789');
  assert.equal(vLarge.count(), 456789);
  assert.equal(vLarge.upvoted(), false);
  assert.equal(vLarge.downvoted(), false);
  assert.equal(vLarge.starred(), false);

  const vNegativeLarge = Upvote.create('count-minus-456789');
  assert.equal(vNegativeLarge.count(), -456789);
  assert.equal(vNegativeLarge.upvoted(), false);
  assert.equal(vNegativeLarge.downvoted(), false);
  assert.equal(vNegativeLarge.starred(), false);

  assert.throws(() => Upvote.create('upvoted-downvoted'));
});

QUnit.test('UI updated from params', assert => {
  const obj = uiTester(gen());
  assert.equal(obj.count(), 0);
  assert.equal(obj.upvoted(), false);
  assert.equal(obj.downvoted(), false);
  assert.equal(obj.starred(), false);

  assert.equal(uiTester(gen({count: 17})).count(), 17);
  assert.equal(uiTester(gen({upvoted: true})).upvoted(), true);
  assert.equal(uiTester(gen({downvoted: true})).downvoted(), true);
  assert.equal(uiTester(gen({starred: true})).starred(), true);
});

QUnit.test('upvote non-downvoted non-upvoted', assert => {
  const count = 5;
  const obj = gen({count: count});
  assert.equal(obj.count(), count);
  obj.upvote();
  assert.equal(obj.count(), count + 1);
});

QUnit.test('upvote downvoted', assert => {
  const count = 6;
  const obj = gen({count: count, downvoted: true});
  assert.equal(obj.count(), count);
  obj.upvote();
  assert.equal(obj.count(), count + 2);
});

QUnit.test('upvote upvoted', assert => {
  const count = 7;
  const obj = gen({count: count, upvoted: true});
  assert.equal(obj.count(), count);
  obj.upvote();
  assert.equal(obj.count(), count - 1);
});

QUnit.test('downvote non-downvoted non-upvoted', assert => {
  const count = 5;
  const obj = gen({count: count});
  assert.equal(obj.count(), count);
  obj.downvote();
  assert.equal(obj.count(), count - 1);
});

QUnit.test('downvote upvoted', assert => {
  const count = 6;
  const obj = gen({count: count, upvoted: true});
  assert.equal(obj.count(), count);
  obj.downvote();
  assert.equal(obj.count(), count - 2);
});

QUnit.test('downvote downvoted', assert => {
  const count = 7;
  const obj = gen({count: count, downvoted: true});
  assert.equal(obj.count(), count);
  obj.downvote();
  assert.equal(obj.count(), count + 1);
});

QUnit.test('star non-starred', assert => {
  const obj = gen();
  obj.star();
  assert.ok(obj.starred(), 'should be starred');
});

QUnit.test('star starred', assert => {
  const obj = gen({starred: true});
  obj.star();
  assert.ok(!obj.starred(), 'should not be starred');
});

QUnit.test('upvote indepently', assert => {
  const count1 = 5;
  const v1 = gen({count: count1});
  const count2 = 5;
  const v2 = gen({count: count2});
  v1.upvote();
  assert.equal(v1.count(), count1 + 1);
  assert.equal(v2.count(), count2);
});

QUnit.test('downvote indepently', assert => {
  const count1 = 5;
  const v1 = gen({count: count1});
  const count2 = 5;
  const v2 = gen({count: count2});
  v1.downvote();
  assert.equal(v1.count(), count1 - 1);
  assert.equal(v2.count(), count2);
});

QUnit.test('star indepently', assert => {
  const v1 = gen();
  const v2 = gen();
  v1.star();
  assert.equal(v1.starred(), true);
  assert.equal(v2.starred(), false);
});

QUnit.test('call callback on value changes', assert => {
  var receivedPayload;
  const callback = payload => receivedPayload = payload;

  const obj1_id = 100;
  const obj1_origCount = 10;
  const obj1 = gen({id: obj1_id, count: obj1_origCount, callback: callback});

  const obj2_id = 200;
  const obj2_origCount = 20;
  const obj2 = gen({id: obj2_id, count: obj2_origCount, callback: callback});

  obj1.upvote();
  assert.deepEqual(receivedPayload, {
    id: obj1_id,
    action: 'upvote',
    newState: {
      count: obj1_origCount + 1,
      downvoted: false,
      upvoted: true,
      starred: false
    }
  });

  obj2.upvote();
  assert.deepEqual(receivedPayload, {
    id: obj2_id,
    action: 'upvote',
    newState: {
      count: obj2_origCount + 1,
      downvoted: false,
      upvoted: true,
      starred: false
    }
  });

  obj1.upvote();
  assert.deepEqual(receivedPayload, {
    id: obj1_id,
    action: 'unupvote',
    newState: {
      count: obj1_origCount,
      downvoted: false,
      upvoted: false,
      starred: false
    }
  });

  obj2.star();
  assert.deepEqual(receivedPayload, {
    id: obj2_id,
    action: 'star',
    newState: {
      count: obj2_origCount + 1,
      downvoted: false,
      upvoted: true,
      starred: true
    }
  });

  obj2.star();
  assert.deepEqual(receivedPayload, {
    id: obj2_id,
    action: 'unstar',
    newState: {
      count: obj2_origCount + 1,
      downvoted: false,
      upvoted: true,
      starred: false
    }
  });

  obj2.downvote();
  assert.deepEqual(receivedPayload, {
    id: obj2_id,
    action: 'downvote',
    newState: {
      count: obj2_origCount - 1,
      downvoted: true,
      upvoted: false,
      starred: false
    }
  });

  obj2.downvote();
  assert.deepEqual(receivedPayload, {
    id: obj2_id,
    action: 'undownvote',
    newState: {
      count: obj2_origCount,
      downvoted: false,
      upvoted: false,
      starred: false
    }
  });
});

QUnit.test('update model updates UI', assert => {
  const obj = gen();
  const ui = uiTester(obj);

  obj.upvote();
  assert.equal(ui.count(), 1);
  assert.equal(ui.upvoted(), true);

  obj.downvote();
  assert.equal(ui.count(), -1);
  assert.equal(ui.upvoted(), false);
  assert.equal(ui.downvoted(), true);

  obj.upvote();
  assert.equal(ui.count(), 1);
  assert.equal(ui.upvoted(), true);
  assert.equal(ui.downvoted(), false);

  obj.star();
  assert.equal(ui.starred(), true);
  obj.star();
  assert.equal(ui.starred(), false);
});

QUnit.test('update UI updates model', assert => {
  const obj = gen();
  const ui = uiTester(obj);

  ui.upvote();
  assert.equal(obj.count(), 1);
  assert.equal(obj.upvoted(), true);

  ui.downvote();
  assert.equal(obj.count(), -1);
  assert.equal(obj.upvoted(), false);
  assert.equal(obj.downvoted(), true);

  ui.upvote();
  assert.equal(obj.count(), 1);
  assert.equal(obj.upvoted(), true);
  assert.equal(obj.downvoted(), false);

  ui.star();
  assert.equal(obj.starred(), true);
  ui.star();
  assert.equal(obj.starred(), false);
});

QUnit.test('cannot associate multiple models to the same id', assert => {
  const orig = gen();
  assert.throws(() => gen({id: orig.id}));
});

QUnit.test('widget stops responding to clicks after destroyed', assert => {
  const obj = gen({count: 99});
  const ui = uiTester(obj);

  ui.upvote();
  assert.equal(ui.count(), 100);
  ui.upvote();
  assert.equal(ui.count(), 99);

  obj.destroy();
  ui.upvote();
  assert.equal(ui.count(), 99);
  assert.throws(() => obj.upvote());
  assert.throws(() => obj.downvote());
  assert.throws(() => obj.star());
  assert.throws(() => obj.count());
  assert.throws(() => obj.upvoted());
  assert.throws(() => obj.downvoted());
  assert.throws(() => obj.starred());

  const reused = gen({id: obj.id});
  assert.equal(reused.count(), 99);
  ui.upvote();
  assert.equal(reused.count(), 100);
});

QUnit.test('all sub-elements (upvote/downvote/count/star) are optional in the HTML markup', assert => {
  ['upvote', 'downvote', 'count', 'star'].forEach(cls => {
    const obj0 = gen();
    obj0.destroy();
    const jqdom = $('#' + obj0.id);
    jqdom.find('.' + cls).remove();
    const obj = create(obj0.id, {}, jqdom);

    assert.equal(obj.count(), 0);
    obj.upvote();
    assert.equal(obj.count(), 1);
    assert.equal(obj.upvoted(), true);
    obj.downvote();
    assert.equal(obj.count(), -1);
    assert.equal(obj.downvoted(), true);
    assert.equal(obj.upvoted(), false);
    obj.downvote();
    assert.equal(obj.count(), 0);
    assert.equal(obj.downvoted(), false);
    obj.star();
    assert.equal(obj.starred(), true);
    obj.star();
    assert.equal(obj.starred(), false);
  });
});
