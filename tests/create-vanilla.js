const create = (id, params) => {
  return Upvote.create(id, params);
};

QUnit.test('throw exception if destroy is called twice', assert => {
  const obj = gen();
  obj.destroy();
  assert.throws(() => obj.destroy());
});
