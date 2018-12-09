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
    starred: () => jq.upvote('starred')
  };
};
