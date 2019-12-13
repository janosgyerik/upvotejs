UpvoteJS
========

[![Build Status](https://travis-ci.org/janosgyerik/upvotejs.svg?branch=master)](https://travis-ci.org/janosgyerik/upvotejs)

`UpvoteJS` is a JavaScript package to create a voting widget that looks like
the one used on [Stack][stackoverflow] [Exchange][superuser] [sites][serverfault].
For example, like this:

![Screenshot featuring stackoverflow.com, superuser.com, serverfault.com][feature]

Using the package
-----------------

There are different ways to use the package, depending on your use case.

### Create a "read-only" widget in HTML

That is, have a nicely rendered widget based on HTML markup alone,
to simply represent some state, that cannot be modified by user action.
In this mode, no JavaScript is needed, and the counter, the upvote/downvote arrows
and the star are rendered based on the HTML markup alone.

Include the stylesheet in your page's `<head>` element, for example:

    <link rel="stylesheet" href="dist/upvotejs/upvotejs.css">

Make sure the image `upvotejs.svg` is present in the same directory as the `upvotejs.css` file.

Include this basic HTML boilerplate for each vote:

    <div id="the-id" class="upvotejs">
        <a class="upvote"></a>
        <span class="count">0</span>
        <a class="downvote"></a>
        <a class="star"></a>
    </div>

Customize the boilerplate with values appropriate for the vote you want to display:

- Set the correct value for `.count`
- For upvoted state, add class `upvote-on` for `.upvote`
- For downvoted state, add class `downvote-on` for `.downvote`
- For starred state, add class `star-on` for `.star`

With only HTML code, the widget is read-only, the voting and star buttons are not clickable.

### Create an interactive widget

That is, enable user interactions to upvote, downvote, or star,
modifying the state of the counter.
However, storing the state on some backend is still out of scope in this mode.

Include the JavaScript sources in your page's `<head>` element, for example:

    <script src="dist/upvotejs/upvotejs.vanilla.js"></script>

Create the Upvote widget controller:

    Upvote.create('id');

Where `id` is the ID of the widget in the DOM.

With this step, the controls of the widget will become clickable, upvoting and downvoting will update the count and indicate toggled state, so will the star, and consistent state will be enforced.

With HTML and JavaScript code alone, the state of the widget will not be persisted in any storage.

### Save the state of the widget to some backend

In order to save the state of the widget in response to user action,
pass a callback handler when creating the widget, for example:

    Upvote.create('id', {callback: your_callback_handler});

On any change to the state of the widget (vote up, vote down, or star),
the callback handler will be called, with a JSON object as parameter,
with fields:

- `id`: the id of the DOM object, the same value that was used when creating with `Upvote.create`

- `action`: the user action that triggered the state change.
  Possible values: `upvote`, `unupvote`, `downvote`, `undownvote`, `star`, `unstar`

- `newState`: a JSON object with fields:
  - `count`: the current vote count
  - `upvoted`: `true` if the widget is in upvoted state
  - `downvoted`: `true` if the widget is in downvoted state
  - `starred`: `true` if the widget is in starred state

Note that `upvoted` and `downvoted` will never be `true` at the same time.

An example payload:

    {
      id: 'my-vote',
      action: 'upvote',
      newState: {
        count: 123,
        upvoted: true,
        downvoted: false,
        starred: true
      }
    }

Using this data object, it is up to your implementation of `your_callback_handler` to actually implement writing the new state on some backend, for example with a `POST` or `PATCH` call to a storage service to update the user's vote.

### Using with jQuery

It's possible to use the package through jQuery, if you prefer (though not clear why).

Include the following in `<head>`:

    <link rel="stylesheet" href="dist/upvotejs/upvotejs.css">
    <script src="dist/upvotejs/upvotejs.vanilla.js"></script>
    <script src="dist/upvotejs/upvotejs.jquery.js"></script>

Make sure the image `upvotejs.svg` is present in the same directory as the `upvotejs.css` file.

Initialization examples:

    $('#topic').upvote();
    $('#topic').upvote({count: 5, upvoted: true});
    $('#topic').upvote({count: 5, downvoted: true});
    $('#topic').upvote({count: 5, upvoted: true, starred: true});

    var callback = function(data) {
        $.ajax({
            url: '/vote',
            type: 'post',
            data: data
        });
    };
    $('#topic-123').upvote({id: 123, callback: callback});

Methods:

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

API reference
-------------

Files:

- `upvotejs.css` and `upvotejs.svg` are required for styling, and both must be in the same directory
- `upvotejs.vanilla.js` is required for interactive use

Create an Upvote widget controller using `Upvote.create`:

    const widget = Upvote.create(id, params = {});

An element in the DOM must exist with the specified `id`, and have a basic markup like this:

    <div id="the-id" class="upvotejs">
        <a class="upvote"></a>
        <span class="count">0</span>
        <a class="downvote"></a>
        <a class="star"></a>
    </div>

The widget will be parameterized based on the markup of the DOM element:

- The count is read from the value of `.count`
- The state is considered upvoted if `.upvote` has `upvote-on` class.
- The state is considered downvoted if `.downvote` has `downvote-on` class.
- The state is considered starred if `.star` has `star-on` class.

An exception will be thrown in case of invalid DOM markup:

- If a DOM element with the specified `id` doesn't exist
- If the DOM element with `id` is already used by another Upvote widget controller
- If the DOM element doesn't have all required components
- If both upvoted and downvoted state are detected at the same time

The state values can be overridden explicitly using the `param` object, with fields:

- `count` - the vote count to set, must be an integer
- `upvoted` - a boolean to set upvoted state
- `downvoted` - a boolean to set downvoted state
- `starred` - a boolean to set starred state
- `callback` - a function that will be called on any state change

An exception will be thrown in case of invalid parameters:

- If the parameter types don't match expected values
- If `upvoted` and `downvoted` are both `true`

### Properties

An instance of an Upvote widget controller has the following properties:

- `id`: the `id` of the controller
- `count()`: get the current count
- `upvote()`: toggle upvoted state
- `upvoted()`: get the upvoted state
- `downvote()`: toggle downvoted state
- `downvoted()`: get the downvoted state
- `star()`: toggle starred state
- `starred()`: get the starred state

### Event handling

The widget controller, on its creation, overwrites the `onclick` property of the selected DOM.

On `destroy`, the widget controller resets `onclick` to `null`.

Sponsors
--------

Contributions from users and sponsors help make UpvoteJS possible.
We accept donations via [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SQTLZB5QCLR82). Thanks! :)

License
-------

<a rel="license" href="http://creativecommons.org/licenses/by/3.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/3.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution 3.0 Unported License</a>.

[stackoverflow]: http://stackoverflow.com/
[superuser]: http://superuser.com/
[serverfault]: http://serverfault.com/
[feature]: images/feature.png
Fri Dec 13 17:41:16 CET 2019
