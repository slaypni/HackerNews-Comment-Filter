
/*
==UserScript==
@name        Hacker News comment filter
@namespace   https://github.com/slaypni
@description Show HN comments that match queries
@version     0.1.0
@match       https://news.ycombinator.com/item?id=*
==/UserScript==
 */

(function() {
  var MIN_QUERY_LEN, filterComments, filterMatchedStyle, loadJquery, loadScript, nav, navInnerStyle, navStyle, queryStyle;

  MIN_QUERY_LEN = 3;

  navStyle = "position: fixed;\ntop: 0;\nleft: 0;\nwidth: 100%;\npadding: 10px 0;\nbackground-color: #644;\ndisplay: flex;\njustify-content: center;";

  navInnerStyle = "width: 84%;";

  queryStyle = "width: 100%;";

  filterMatchedStyle = "background-color: #ff8;";

  nav = "<div id='hn_comment_filter-nav' style=\"" + navStyle + "\">\n  <div id='hn_comment_filter-nav-inner' style=\"" + navInnerStyle + "\">\n    <input id='hn_comment_filter-query' type='text' style=\"" + queryStyle + "\" placeholder='Enter queries (e.g. machine learning, visa)'>\n  </div>\n</div>";

  loadScript = function(url, callback) {
    var s;
    s = document.createElement('script');
    s.src = url;
    s.onload = function() {
      return callback();
    };
    return document.getElementsByTagName('head')[0].appendChild(s);
  };

  loadJquery = function(callback) {
    return loadScript('//code.jquery.com/jquery-3.1.1.min.js', callback);
  };

  loadJquery(function() {
    return $(function() {
      $('body').css('padding-top', '44px').prepend(nav);
      return $('#hn_comment_filter-query').focus().keyup(function() {
        return filterComments();
      });
    });
  });

  filterComments = function() {
    var items, queries;
    queries = $('#hn_comment_filter-query').val().split(',').map(function(q) {
      return $.trim(q);
    }).filter(function(q) {
      return q.length >= MIN_QUERY_LEN;
    });
    $('.hn_comment_filter-matched').each(function() {
      return $(this).replaceWith(this.childNodes);
    });
    return items = $('.comment-tree .athing').each(function() {
      var comment, i, isMatched, item, len, q;
      item = $(this);
      isMatched = true;
      for (i = 0, len = queries.length; i < len; i++) {
        q = queries[i];
        comment = item.find('.comment');
        if (comment.text().match(new RegExp(q, 'i'))) {
          comment.html(function(_, h) {
            return h.replace(new RegExp("(" + q + ")(?!([^<]+)?>)", 'gi'), "<span class='hn_comment_filter-matched' style='" + filterMatchedStyle + "'>$1</span>");
          });
        } else {
          isMatched = false;
        }
      }
      if (!isMatched) {
        return item.hide();
      } else {
        return item.show();
      }
    });
  };

}).call(this);
