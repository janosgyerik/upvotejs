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
@version         0.1
@since           2013.06.19
@author          Janos Gyerik
@documentation   https://janosgyerik.github.io/jquery-upvote
@twitter         twitter.com/janosgyerik
```


Required files
--------------
+ lib/jquery.upvote.js
+ lib/jquery.upvote.css
+ lib/images/sprites.png


Options
-------
```js
count       : 0
upvoted     : false
downvoted   : false
starred     : false
```


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
    <a class="upvote upvoted"></a>
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
    <a class="downvote downvoted"></a>
    <a class="star"></a>
</div>
```

Starred:
```html
<div id="topic" class="upvote">
    <a class="upvote"></a>
    <span class="count">5</span>
    <a class="downvote"></a>
    <a class="star starred"></a>
</div>
```


Initialization examples
-----------------------
```js
$('#topic').upvote();
$('#topic').upvote({count: 5, upvoted: 1});
$('#topic').upvote({count: 5, downvoted: 1});
$('#topic').upvote({count: 5, upvoted: 1, starred: 1});
```


Methods
-------
```js
$('#topic').upvote('upvote');       // Upvote!
$('#topic').upvote('downvote');     // Downvote!
$('#topic').upvote('count');        // Get the current vote count
$('#topic').upvote('star');         // Star!
$('#topic').upvote('starred');      // Get the current starred state
```


License
-------
Licensed under Creative Commons Attribution 3.0 Unported
http://creativecommons.org/licenses/by/3.0/


Donate
------
You can do it via [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SQTLZB5QCLR82). Thanks! :)
