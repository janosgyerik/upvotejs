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

QUnit.test('create multiple objects from DOM selector', assert => {
  for (let i = 0; i < 5; i++) {
    const id = 'jq-' + i;
    const jqdom = $('#templates div.upvote').clone();
    jqdom.attr('id', id);
    jqdom.addClass('custom');
    $('#tests').append(jqdom);
  }
  assert.equal($('.custom').length, 5);
  assert.equal($('.custom.upvote-enabled').length, 0);
  $('.custom').upvote();
  assert.equal($('.custom.upvote-enabled').length, 5);

  $('.custom').upvote('destroy');
  assert.equal($('.custom.upvote-enabled').length, 0);

  $('.custom').eq(0).attr('id', null);
  assert.throws(() => $('.custom').upvote());
  assert.equal($('.custom.upvote-enabled').length, 4);
});
