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

    function init(dom, options) {
        return dom.each(function() {
            methods.destroy.call(this);

            var count = parseInt($(this).find(dot_count_css).text(), 10);
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

            var $this = $(this);
            $this.data(namespace, data);
            render($this);
            setupUI($this);
        });
    }

    function setupUI($this) {
        $this.find(dot_upvote_css).addClass(enabled_css);
        $this.find(dot_downvote_css).addClass(enabled_css);
        $this.find(dot_star_css).addClass(enabled_css);
        $this.find(dot_upvote_css).on('click.' + namespace, function() {
            $this.upvote('upvote');
        });
        $this.find('.downvote').on('click.' + namespace, function() {
            $this.upvote('downvote');
        });
        $this.find('.star').on('click.' + namespace, function() {
            $this.upvote('star');
        });
    }

    function _click_upvote($this) {
        $this.find(dot_upvote_css).click();
    }

    function _click_downvote($this) {
        $this.find(dot_downvote_css).click();
    }

    function _click_star($this) {
        $this.find(dot_star_css).click();
    }

    function render($this) {
        var data = $this.data(namespace);
        $this.find(dot_count_css).text(data.count);
        if (data.upvoted) {
            $this.find(dot_upvote_css).addClass(upvoted_css);
            $this.find(dot_downvote_css).removeClass(downvoted_css);
        } else if (data.downvoted) {
            $this.find(dot_upvote_css).removeClass(upvoted_css);
            $this.find(dot_downvote_css).addClass(downvoted_css);
        } else {
            $this.find(dot_upvote_css).removeClass(upvoted_css);
            $this.find(dot_downvote_css).removeClass(downvoted_css);
        }
        if (data.starred) {
            $this.find(dot_star_css).addClass(starred_css);
        } else {
            $this.find(dot_star_css).removeClass(starred_css);
        }
    }

    function callback($this) {
        var data = $this.data(namespace);
        data.callback(data);
    }

    function upvote($this) {
        var data = $this.data(namespace);
        if (data.upvoted) {
            data.upvoted = false;
            --data.count;
        } else {
            data.upvoted = true;
            ++data.count;
            if (data.downvoted) {
                data.downvoted = false;
                ++data.count;
            }
        }
        render($this);
        callback($this);
        return $this;
    }

    function downvote($this) {
        var data = $this.data(namespace);
        if (data.downvoted) {
            data.downvoted = false;
            ++data.count;
        } else {
            data.downvoted = true;
            --data.count;
            if (data.upvoted) {
                data.upvoted = false;
                --data.count;
            }
        }
        render($this);
        callback($this);
        return $this;
    }

    function star($this) {
        var data = $this.data(namespace);
        data.starred = ! data.starred;
        render($this);
        callback($this);
        return $this;
    }

    function count($this) {
        return $this.data(namespace).count;
    }

    function upvoted($this) {
        return $this.data(namespace).upvoted;
    }

    function downvoted($this) {
        return $this.data(namespace).downvoted;
    }

    function starred($this) {
        return $this.data(namespace).starred;
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
        var args;
        if (methods[method]) {
            args = Array.prototype.slice.call(arguments, 1);
            args.unshift(this);
            return methods[method].apply(this, args);
        }
        if (typeof method === 'object' || ! method) {
            args = Array.prototype.slice.call(arguments);
            args.unshift(this);
            return methods.init.apply(this, args);
        }
        $.error('Method ' + method + ' does not exist on jQuery.upvote');
    };  
})(jQuery);
