function gen(params) {
    var html = $('#templates .upvote').clone();
    $('#tests').append(html);
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

test('sanity2', function() {
    ok(gen());
    var obj = gen({count: 17});
    obj.upvote('upvote');
});

test('demo', function() {
    $('#demo1').upvote({count: 1, upvoted: 1});
    $('#demo2').upvote({count: 2, downvoted: 1});
    $('#demo3').upvote({count: 3, starred: 1});
    ok(1);
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

test('downvote indepently', function() {
    var obj1 = gen({count: 5});
    var count1 = obj1.upvote('count');
    var obj2 = gen({count: 5});
    var count2 = obj2.upvote('count');
    obj1.upvote('downvote');
    equal(obj1.upvote('count'), count1 - 1);
    equal(obj2.upvote('count'), count2);
});

test('star indepently', function() {
    var obj1 = gen({count: 5});
    var starred1 = obj1.upvote('starred');
    var obj2 = gen({count: 5});
    var starred2 = obj2.upvote('starred');
    obj1.upvote('star');
    equal(obj1.upvote('starred'), true);
    equal(obj2.upvote('starred'), false);
});

test('click upvote', function() {
    var obj = gen({count: 5});
    var count = obj.upvote('count');
    obj.upvote('_click_upvote');
    equal(obj.upvote('count'), count + 1);
});

test('click downvote', function() {
    var obj = gen({count: 5});
    var count = obj.upvote('count');
    obj.upvote('_click_downvote');
    equal(obj.upvote('count'), count - 1);
});

test('click star', function() {
    var obj = gen({count: 5});
    obj.upvote('_click_star');
    equal(obj.upvote('starred'), true);
});
