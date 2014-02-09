var idcount = 0;
function gen(params) {
    ++idcount;
    var html = $('#templates .upvote').clone();
    $('#tests').append(html);
    if (!params) {
        params = {};
    }
    if (!params.id) {
        params.id = idcount;
    }
    if (!params.callback) {
        params.callback = function(data) {
            console.log(data);
        };
    }
    return html.upvote(params);
}

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

test('styles', function() {
    var styles = ['serverfault', 'unix', 'programmers'];
    for (var i in styles) {
        var style = 'upvote-' + styles[i];
        var obj1 = gen({count: 1, upvoted: 1});
        var obj2 = gen({count: 234, downvoted: 1, starred: 1});
        obj1.addClass(style);
        obj2.addClass(style);
    }
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
    ok(obj.upvote('starred'), 'should be starred');
});

test('star starred', function() {
    var obj = gen({starred: true});
    obj.upvote('star');
    ok(!obj.upvote('starred'), 'should not be starred');
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
    ok(obj1.upvote('starred'), 'first should be starred');
    ok(!obj2.upvote('starred'), 'second should not be starred');
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
    ok(obj.upvote('starred'));
});

test('preconfigured count=1 upvoted', function() {
    var obj = $('#count-1-upvoted').upvote();
    equal(obj.upvote('count'), 1);
    ok(obj.upvote('upvoted'), 'should be upvoted');
    ok(!obj.upvote('downvoted'), 'should not be downvoted');
});

test('preconfigured count=2 downvoted', function() {
    var obj = $('#count-2-downvoted').upvote();
    equal(obj.upvote('count'), 2);
    ok(obj.upvote('downvoted'), 'should be downvoted');
    ok(!obj.upvote('upvoted'), 'should not be upvoted');
});

test('preconfigured count=3 starred', function() {
    var obj = $('#count-3-starred').upvote();
    equal(obj.upvote('count'), 3);
    ok(obj.upvote('starred'), 'should be starred');
    ok(!obj.upvote('upvoted'), 'should not be upvoted');
    ok(!obj.upvote('downvoted'), 'should not be downvoted');
});

test('invalid configuration: upvoted + downvoted -> upvoted', function() {
    var obj = gen({upvoted: 1, downvoted: 1});
    ok(obj.upvote('upvoted'), 'shold be upvoted');
    ok(!obj.upvote('downvoted'), 'should not be downvoted');
});

test('preconfigured invalid: upvoted + downvoted -> upvoted', function() {
    var obj = $('#upvoted-downvoted').upvote();
    ok(obj.upvote('upvoted'), 'should be upvoted');
    ok(!obj.upvote('downvoted'), 'should not be downvoted');
});

test('callback', function() {
    var called_id = 0;
    var callback = function(data) {
        called_id = data.id;
    };
    var obj1 = gen({count: 177, id: 177, callback: callback});
    var obj2 = gen({count: 178, id: 178, callback: callback});
    obj1.upvote('upvote');
    equal(called_id, 177);
    obj2.upvote('upvote');
    equal(called_id, 178);
    obj1.upvote('upvote');
    equal(called_id, 177);
});
