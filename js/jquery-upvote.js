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
        options = $.extend({}, defaults, options_);

        count = options.count;
        upvoted = options.upvoted;
        downvoted = options.downvoted;
        starred = options.starred;

        __render();

        return this;
    }

    function __render() {
        obj.find('.count').text(count);
        if (upvoted) {
            obj.find('.upvote').removeClass('off');
            obj.find('.upvote').addClass('on');
            obj.find('.downvote').removeClass('on');
            obj.find('.downvote').addClass('off');
        }
        else if (downvoted) {
            obj.find('.downvote').removeClass('off');
            obj.find('.downvote').addClass('on');
            obj.find('.upvote').removeClass('on');
            obj.find('.upvote').addClass('off');
        }
        if (starred) {
            obj.find('.star').removeClass('off');
            obj.find('.star').addClass('on');
        }
    }

    function _count() {
        return count;
    }

    function _upvote() {
        if (upvoted) {
            upvoted = false;
            --count;
        }
        else {
            upvoted = true;
            ++count;
            if (downvoted) {
                downvoted = false;
                ++count;
            }
        }
        __render();
        return this;
    }

    function _downvote() {
        if (downvoted) {
            downvoted = false;
            ++count;
        }
        else {
            downvoted = true;
            --count;
            if (upvoted) {
                upvoted = false;
                --count;
            }
        }
        __render();
        return this;
    }

    function _star() {
        // todo
        return this;
    }

    var methods = {
        init: _init,
        count: _count,
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
