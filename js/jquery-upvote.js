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

    function init(options) {
        return this.each(function() {
            methods.destroy.call(this);

            this.data = $.extend({}, defaults, options);

            var that = $(this);
            that.data(this.data);
        });
    }

    function __render() {
        return;
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

    function count() {
        return this.data('count');
    }

    function upvote() {
        var data = this.data();
        if (data.upvoted) {
            data.upvoted = false;
            --data.count;
        }
        else {
            data.upvoted = true;
            ++data.count;
            if (data.downvoted) {
                data.downvoted = false;
                ++data.count;
            }
        }
        __render();
        return this;
    }

    function downvote() {
        var data = this.data();
        if (data.downvoted) {
            data.downvoted = false;
            ++data.count;
        }
        else {
            data.downvoted = true;
            --data.count;
            if (data.upvoted) {
                data.upvoted = false;
                --data.count;
            }
        }
        __render();
        return this;
    }

    function star() {
        var data = this.data();
        data.starred = ! data.starred;
        __render();
        return this;
    }

    function starred() {
        return this.data('starred');
    }

    var methods = {
        init: init,
        count: count,
        upvote: upvote,
        downvote: downvote,
        starred: starred,
        star: star,
        destroy: destroy
    };

    function destroy() {
        return $(this).each(function() {
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
