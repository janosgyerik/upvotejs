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
            render(this);
            setupUI(this);
        });
    }

    function setupUI(this_) {
        var that = $(this_);
        that.find('.upvote').on('click.upvote', function() {
            that.upvote('upvote');
        });
        that.find('.downvote').on('click.upvote', function() {
            that.upvote('downvote');
        });
        that.find('.star').on('click.upvote', function() {
            that.upvote('star');
        });
    }

    function _click_upvote() {
        this.find('.upvote').click();
    }

    function _click_downvote() {
        this.find('.downvote').click();
    }

    function _click_star() {
        this.find('.star').click();
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
            that.find('.upvote').addClass('upvoted');
            that.find('.downvote').removeClass('downvoted');
        }
        else if (data.downvoted) {
            that.find('.upvote').removeClass('upvoted');
            that.find('.downvote').addClass('downvoted');
        }
        else {
            that.find('.upvote').removeClass('upvoted');
            that.find('.downvote').removeClass('downvoted');
        }
        if (data.starred) {
            that.find('.star').addClass('starred');
        }
        else {
            that.find('.star').removeClass('starred');
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

    var methods = {
        init: init,
        count: count,
        upvote: upvote,
        downvote: downvote,
        starred: starred,
        star: star,
        _click_upvote: _click_upvote,
        _click_downvote: _click_downvote,
        _click_star: _click_star,
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
