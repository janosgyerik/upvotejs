/*!
 * jQuery Upvote - a voting plugin
 * ------------------------------------------------------------------
 *
 * jQuery Upvote is a plugin that generates a voting widget like
 * the one used on Stack Exchange sites.
 *
 * Licensed under Creative Commons Attribution 3.0 Unported
 * http://creativecommons.org/licenses/by/3.0/
 *
 * @version         0.1
 * @since           2013.06.19
 * @author          Janos Gyerik
 * @documentation   https://janosgyerik.github.io/jquery-upvote
 *
 * ------------------------------------------------------------------
 *
 *  <div id="topic" class="upvote">
 *    <a class="upvote"></a>
 *    <span class="count"></span>
 *    <a class="downvote"></a>
 *    <a class="star"></a>
 *  </div>
 *
 *  $('#topic').upvote();
 *  $('#topic').upvote({count: 5, upvoted: true});
 *
 */

;(function($) {
    "use strict";
    var namespace = 'upvote';
    var defaults = {  
        count: 0,
        upvoted: false,
        downvoted: false,
        starred: false
    }; 

    function init(options) {
        return this.each(function() {
            methods.destroy.call(this);

            var data = $.extend({}, defaults, options);

            var that = $(this);
            that.data(namespace, data);
            render(that);
            setupUI(that);
        });
    }

    function setupUI(that) {
        that.find('.upvote').addClass('upvote-enabled');
        that.find('.downvote').addClass('upvote-enabled');
        that.find('.star').addClass('upvote-enabled');
        that.find('.upvote').on('click.' + namespace, function() {
            that.upvote('upvote');
        });
        that.find('.downvote').on('click.' + namespace, function() {
            that.upvote('downvote');
        });
        that.find('.star').on('click.' + namespace, function() {
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

    function render(that) {
        var data = that.data(namespace);
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
        return this.data(namespace).count;
    }

    function upvote() {
        var data = this.data(namespace);
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
        var data = this.data(namespace);
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
        var data = this.data(namespace);
        data.starred = ! data.starred;
        render(this);
        return this;
    }

    function starred() {
        return this.data(namespace).starred;
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
            $(window).unbind('.' + namespace);
            $(this).removeClass('upvote-enabled');
            $(this).removeData(namespace);
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