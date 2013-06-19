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
    ok(1);
    //obj.upvote();
    //deepEqual(obj.mxfilter('get_filters'), {});
    //obj.mxfilter('click_section_item', 'datatype', 'Humidity');
    //notDeepEqual(obj.mxfilter('get_filters'), {});
});

test('upvote non-downvoted non-upvoted', function() {
    var obj = gen();
});

test('upvote downvoted', function() {
});

test('upvote upvoted', function() {
});

test('star non-starred', function() {
});

test('star starred', function() {
});
