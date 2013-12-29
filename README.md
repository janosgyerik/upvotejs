jQuery Upvote - a voting plugin
===============================
jQuery Upvote is a plugin that generates a voting widget like
the one used on Stack Exchange sites, for example:

+ http://stackoverflow.com/
+ http://serverfault.com/
+ http://unix.stackexchange.com/


Version
-------
```
@version         1.0.2
@since           2013.06.19
@author          Janos Gyerik
@homepage        https://janosgyerik.github.io/jquery-upvote
@twitter         twitter.com/janosgyerik
```


Required files
--------------
+ lib/jquery.upvote.js
+ lib/jquery.upvote.css
+ lib/images/sprites-stackoverflow.png


Options and their default values
--------------------------------
```js
id          : undefined
count       : 0
upvoted     : false
downvoted   : false
starred     : false
callback    : function() {}
```

If unspecified, most of these options will be set based on the passed in dom object:

- `id`: from `data-id` *attribute*, for example in `<div data-id="123">...</div>`. If there is no such attribute in the dom, the value will be left undefined.
- `count`: from `count` *class*, for example in `<div><span class="count">7</span>...</div>`. If there is no such class in the dom, the value will default to 0.
- `upvoted`: from `upvoted` *class*, for example in `<div>...<a class="upvote upvoted"></a>...</div>`. If there is no such class in the dom, the value will default to `false`.
- `downvoted`: from `downvoted` *class*, for example in `<div>...<a class="downvote downvoted"></a>...</div>`. If there is no such class in the dom, the value will default to `false`.
- `starred`: from `starred` *class*, for example in `<div>...<a class="star starred"></a>...</div>`. If there is no such class in the dom, the value will default to `false`.

The `id` parameter is not used for rendering.
It's useful when you implement a callback method,
so that you can identify to your server backend the object that is voted on.


Markup
------
Basic example:
```html
<div id="topic" class="upvote">
    <a class="upvote"></a>
    <span class="count">0</span>
    <a class="downvote"></a>
    <a class="star"></a>
</div>
```

Upvoted:
```html
<div id="topic" class="upvote">
    <a class="upvote upvote-on"></a>
    <span class="count">6</span>
    <a class="downvote"></a>
    <a class="star"></a>
</div>
```

Downvoted:
```html
<div id="topic" class="upvote">
    <a class="upvote"></a>
    <span class="count">4</span>
    <a class="downvote downvote-on"></a>
    <a class="star"></a>
</div>
```

Starred:
```html
<div id="topic" class="upvote">
    <a class="upvote"></a>
    <span class="count">5</span>
    <a class="downvote"></a>
    <a class="star star-on"></a>
</div>
```


Initialization examples
-----------------------
```js
$('#topic').upvote();
$('#topic').upvote({count: 5, upvoted: 1});
$('#topic').upvote({count: 5, downvoted: 1});
$('#topic').upvote({count: 5, upvoted: 1, starred: 1});

var callback = function(data) {
    $.ajax({
        url: '/vote',
        type: 'post',
        data: { id: data.id, up: data.upvoted, down: data.downvoted, star: data.starred }
    });
};
$('#topic-123').upvote({id: 123, callback: callback});
```


Methods
-------
```js
// Create, pick up initial values from HTML markup
$('#topic').upvote();

// Mutators
$('#topic').upvote('upvote');       // Upvote!
$('#topic').upvote('downvote');     // Downvote!
$('#topic').upvote('star');         // Star!

// Getters
$('#topic').upvote('count');        // Get the current vote count
$('#topic').upvote('upvoted');      // Get the upvoted state -> boolean
$('#topic').upvote('downvoted');    // Get the downvoted state -> boolean
$('#topic').upvote('starred');      // Get the starred state -> boolean
```


License
-------
Licensed under Creative Commons Attribution 3.0 Unported
http://creativecommons.org/licenses/by/3.0/


Donate
------
You can do it via [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SQTLZB5QCLR82). Thanks! :)
