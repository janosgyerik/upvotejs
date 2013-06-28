function gen(params) {
    var html = $('#templates .upvote').clone();
    $('#demo').append(html);
    return html.upvote(params);
}

function setUp() {
    //$('#demo').append(table);
}

QUnit.begin = setUp;

test('sanity', function() {
    ok(gen());
    gen({count: 2});
    gen({count: 3, upvoted: true});
    gen({count: 1, downvoted: true});
    gen({count: 7, starred: true});
});

test('upvote non-downvoted non-upvoted', function() {
    var obj = gen({count: 5});
    var count = obj.upvote('count');
    obj.upvote('upvote');
    equal(obj.upvote('count'), count + 1);
});

test('upvote downvoted', function() {
    var obj = gen({count: 5, downvoted: true});
    var count = obj.upvote('count');
    obj.upvote('upvote');
    equal(obj.upvote('count'), count + 2);
});

test('upvote upvoted', function() {
    var obj = gen({count: 5, upvoted: true});
    var count = obj.upvote('count');
    obj.upvote('upvote');
    equal(obj.upvote('count'), count - 1);
});

test('downvote non-downvoted non-upvoted', function() {
    var obj = gen({count: 5});
    var count = obj.upvote('count');
    obj.upvote('downvote');
    equal(obj.upvote('count'), count - 1);
});

test('downvote upvoted', function() {
    var obj = gen({count: 5, upvoted: true});
    var count = obj.upvote('count');
    obj.upvote('downvote');
    equal(obj.upvote('count'), count - 2);
});

test('downvote downvoted', function() {
    var obj = gen({count: 5, downvoted: true});
    var count = obj.upvote('count');
    obj.upvote('downvote');
    equal(obj.upvote('count'), count + 1);
});

test('star non-starred', function() {
    var obj = gen();
    obj.upvote('star');
    equal(obj.upvote('starred'), true);
});

test('star starred', function() {
    var obj = gen({starred: true});
    obj.upvote('star');
    equal(obj.upvote('starred'), false);
});

test('upvote indepently', function() {
    var obj1 = gen({count: 5});
    var count1 = obj1.upvote('count');
    var obj2 = gen({count: 5});
    var count2 = obj2.upvote('count');
    obj1.upvote('upvote');
    equal(obj1.upvote('count'), count1 + 1);
    equal(obj2.upvote('count'), count2);
});

test('click upvote', function() {
});

test('click downvote', function() {
});

test('click star', function() {
});
