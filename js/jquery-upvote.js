/*!
 * jQuery Upvote Plugin v0.1
 *
 * A voting widget based on Stack Exchange sites.
 *
 * Date: Wed Jun 19 21:06:05 CEST 2013
 * Requires: jQuery v2.x
 *
 * Copyright 2013, Janos Gyerik
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
*/

(function($) {
    "use strict";
    var defaults = {  
        template_selector: '.templates .upvote',
        count: 0,
        upvoted: false,
        downvoted: false,
        starred: false
    }; 

    var obj;
    var options;

    var count;
    var upvoted;
    var downvoted;
    var starred;

    function _init(options_) {
        obj = this;
        options = $.extend(defaults, options_);

        count = options.count;
        upvoted = options.upvoted;
        downvoted = options.downvoted;
        starred = options.starred;

        return this;
    }

    function _upvote() {
        // todo
        return this;
    }

    function _downvote() {
        // todo
        return this;
    }

    function _star() {
        // todo
        return this;
    }

    var methods = {
        init: _init,
        upvote: _upvote,
        downvote: _downvote,
        star: _star,
        destroy: _destroy
    };

    function _destroy() {
        return this.each(function() {
            $(window).unbind('.upvote');
            //var $this = $(this), data = $this.data('upvote');
            ////data.upvote.remove();
            ////$this.removeData('upvote');
        });
    }

    $.fn.upvote = function(method) {  
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method ' + method + ' does not exist on jQuery.upvote');
        }
    };  
})(jQuery);
