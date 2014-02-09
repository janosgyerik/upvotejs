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
 * @version         1.0.2
 * @since           2013.06.19
 * @author          Janos Gyerik
 * @homepage        https://janosgyerik.github.io/jquery-upvote
 * @twitter         twitter.com/janosgyerik
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
    var dot_namespace = '.' + namespace;
    var upvote_css = 'upvote';
    var dot_upvote_css = '.' + upvote_css;
    var upvoted_css = 'upvote-on';
    var dot_upvoted_css = '.' + upvoted_css;
    var downvote_css = 'downvote';
    var dot_downvote_css = '.' + downvote_css;
    var downvoted_css = 'downvote-on';
    var dot_downvoted_css = '.' + downvoted_css;
    var star_css = 'star';
    var dot_star_css = '.' + star_css;
    var starred_css = 'star-on';
    var dot_starred_css = '.' + starred_css;
    var count_css = 'count';
    var dot_count_css = '.' + count_css;
    var enabled_css = 'upvote-enabled';
    var dot_enabled_css = '.' + enabled_css;

    function init(options) {
        return this.each(function() {
            methods.destroy.call(this);

            var count = parseInt($(this).find(dot_count_css).text());
            count = isNaN(count) ? 0 : count;
            var initial = {
                id: $(this).attr('data-id'),
                count: count,
                upvoted: $(this).find(dot_upvoted_css).size(),
                downvoted: $(this).find(dot_downvoted_css).size(),
                starred: $(this).find(dot_starred_css).size(),
                callback: function() {}
            };

            var data = $.extend(initial, options);
            if (data.upvoted && data.downvoted) {
                data.downvoted = false;
            }

            var that = $(this);
            that.data(namespace, data);
            render(that);
            setupUI(that);
        });
    }

    function setupUI(that) {
        that.find(dot_upvote_css).addClass(enabled_css);
        that.find(dot_downvote_css).addClass(enabled_css);
        that.find(dot_star_css).addClass(enabled_css);
        that.find(dot_upvote_css).on('click.' + namespace, function() {
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
        this.find(dot_upvote_css).click();
    }

    function _click_downvote() {
        this.find(dot_downvote_css).click();
    }

    function _click_star() {
        this.find(dot_star_css).click();
    }

    function render(that) {
        var data = that.data(namespace);
        that.find(dot_count_css).text(data.count);
        if (data.upvoted) {
            that.find(dot_upvote_css).addClass(upvoted_css);
            that.find(dot_downvote_css).removeClass(downvoted_css);
        }
        else if (data.downvoted) {
            that.find(dot_upvote_css).removeClass(upvoted_css);
            that.find(dot_downvote_css).addClass(downvoted_css);
        }
        else {
            that.find(dot_upvote_css).removeClass(upvoted_css);
            that.find(dot_downvote_css).removeClass(downvoted_css);
        }
        if (data.starred) {
            that.find(dot_star_css).addClass(starred_css);
        }
        else {
            that.find(dot_star_css).removeClass(starred_css);
        }
    }

    function callback(that) {
        var data = that.data(namespace);
        data.callback(data);
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
        callback(this);
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
        callback(this);
        return this;
    }

    function star() {
        var data = this.data(namespace);
        data.starred = ! data.starred;
        render(this);
        callback(this);
        return this;
    }

    function count() {
        return this.data(namespace).count;
    }

    function upvoted() {
        return this.data(namespace).upvoted;
    }

    function downvoted() {
        return this.data(namespace).downvoted;
    }

    function starred() {
        return this.data(namespace).starred;
    }

    var methods = {
        init: init,
        count: count,
        upvote: upvote,
        upvoted: upvoted,
        downvote: downvote,
        downvoted: downvoted,
        starred: starred,
        star: star,
        _click_upvote: _click_upvote,
        _click_downvote: _click_downvote,
        _click_star: _click_star,
        destroy: destroy
    };

    function destroy() {
        return $(this).each(function() {
            $(window).unbind(dot_namespace);
            $(this).removeClass(enabled_css);
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
