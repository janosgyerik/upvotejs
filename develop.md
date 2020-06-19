Develop
=======

Practical tips and notes for working on this package.

Setup
-----

Install dependencies:

    npm install

Verify that all automated tests are passing:

    npm test

Optionally, open the unit tests in a browser:

    open tests/vanilla.html
    open tests/jquery.html


Importing from another new Stack Exchange site
----------------------------------------------

Visit the site you want to import from.

Toggle an upvote or downvote to activate the color of the site,
and inspect the source of the image using your favorite browser Developer Console.

Look at computed CSS properties, and find the value of `filter`.

Copy that value and add a CSS entry following this pattern:

    div.upvote-abc a.upvote.upvote-on, div.upvote-abc a.downvote-on {
      filter: ...
    }

Updating to new style
---------------------

Sometimes the Stack Exchange sites get a facelift.
These were the steps I took last time I need to update the styles, in late 2018.

Inspect the source of any upvote icon on stackoverflow.com

Find the `background-image`, for example https://cdn.sstatic.net/Img/unified/sprites.svg?v=e5e58ae7df45 for Stack Overflow as of today.

Download the background image into `lib/images/sprites-stackoverflow.svg`

Review and update CSS attributes as necessary, typically:

- `width`
- `height`
- `font-size`
- `font-family`
- `color`
- `margin`
- `background-position`
- `filter`

Publishing the jQuery plugin
----------------------------

See https://plugins.jquery.com/docs/publish/

Published at https://plugins.jquery.com/upvote/
