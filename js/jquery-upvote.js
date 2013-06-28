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

            this.ui = methods.createUI.call(this);

            var that = $(this);
            that.data(this.data);
            render(this);
        });
    }

    function render(this_) {
        var that, data;
        if (this_ instanceof jQuery) {
            that = this_;
            data = this_.data();
        }
        else {
            that = $(this_);
            data = this_.data;
        }
        that.find('.count').text(data.count);
        if (data.upvoted) {
            that.find('.upvote').removeClass('off');
            that.find('.upvote').addClass('on');
            that.find('.downvote').removeClass('on');
            that.find('.downvote').addClass('off');
        }
        else if (data.downvoted) {
            that.find('.downvote').removeClass('off');
            that.find('.downvote').addClass('on');
            that.find('.upvote').removeClass('on');
            that.find('.upvote').addClass('off');
        }
        if (data.starred) {
            that.find('.star').removeClass('off');
            that.find('.star').addClass('on');
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
        render(this);
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
        render(this);
        return this;
    }

    function star() {
        var data = this.data();
        data.starred = ! data.starred;
        render(this);
        return this;
    }

    function starred() {
        return this.data('starred');
    }

    function createUI() {
        var that = $(this);
        return that;
    }

    var methods = {
        init: init,
        count: count,
        upvote: upvote,
        downvote: downvote,
        starred: starred,
        star: star,
        createUI: createUI,
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
