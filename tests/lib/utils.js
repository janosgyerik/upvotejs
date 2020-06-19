const Utils = (window, $) => {
  const document = window.document;
  $(document.body).append('<div id="sandbox" style="display: none">');

  const newId = function() {
    var idcount = 0;
    return () => {
      ++idcount;
      return 'ujs-' + idcount;
    };
  }();

  const newDom = (params = {}) => {
    const jqdom = $(`
        <div class="upvotejs">
          <a class="upvote"></a>
          <span class="count"></span>
          <a class="downvote"></a>
          <a class="star"></a>
        </div>
        `);

    const id = params.id || newId();
    jqdom.attr('id', id);

    if (params.count !== undefined) {
      jqdom.find('.count').text(params.count);
    }
    if (params.upvoted) {
      jqdom.find('.upvote').addClass('upvote-on');
    }
    if (params.downvoted) {
      jqdom.find('.downvote').addClass('downvote-on');
    }
    if (params.starred) {
      jqdom.find('.star').addClass('star-on');
    }
    if (params.skin) {
      jqdom.addClass('upvotejs-' + params.skin);
    }

    return jqdom;
  };

  const addNewDom = params => {
    const jqdom = newDom(params);
    $('#sandbox').append(jqdom);
    return jqdom;
  };

  const gen = create => function() {
    return (params = {}) => {
      const jqdom = params.id ? $('#' + params.id) : addNewDom(params);
      const id = params.id || jqdom.attr('id');

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

  const data = obj => {
    return {
      count: obj.count(),
      upvoted: obj.upvoted(),
      downvoted: obj.downvoted(),
      starred: obj.starred()
    };
  };

  return {
    newId: newId,
    newDom: newDom,
    addNewDom: addNewDom,
    gen: gen,
    uiTester: uiTester,
    data: data
  };
};

if (typeof module !== 'undefined' && module.exports) {
  exports.Utils = Utils;
}
