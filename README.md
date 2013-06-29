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
+ jquery.upvote.js
+ jquery.upvote.css
+ images/sprites.png


Options
-------
```js
count       : 0
upvoted     : false
downvoted   : false
starred     : false
```


Usage
-----
```html
<div id="topic"></div>
```

```js
$('#topic').upvote();
```


Functions
---------
```js
$('#topic').upvote('count');        // Get the current vote count
```


License
-------
Licensed under Creative Commons Attribution 3.0 Unported
http://creativecommons.org/licenses/by/3.0/


Donate
------
You can do it via [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SQTLZB5QCLR82). Thanks! :)
