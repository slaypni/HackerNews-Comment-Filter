###
==UserScript==
@name        Hacker News comment filter
@namespace   https://github.com/slaypni
@description Show HN comments that match queries
@version     0.1.0
@match       https://news.ycombinator.com/item?id=*
==/UserScript==
###

MIN_QUERY_LEN = 3

navStyle = """
position: fixed;
top: 0;
left: 0;
width: 100%;
padding: 10px 0;
background-color: #644;
display: flex;
justify-content: center;
"""

navInnerStyle = """
width: 84%;
"""

queryStyle = """
width: 100%;
"""

filterMatchedStyle = """
background-color: #ff8;
"""

nav = """
<div id='hn_comment_filter-nav' style="#{navStyle}">
  <div id='hn_comment_filter-nav-inner' style="#{navInnerStyle}">
    <input id='hn_comment_filter-query' type='text' style="#{queryStyle}" placeholder='Enter queries (e.g. machine learning, visa)'>
  </div>
</div>
"""

loadScript = (url, callback) ->
  s = document.createElement 'script'
  s.src = url
  s.onload = ->
    callback()
  document.getElementsByTagName('head')[0].appendChild s

loadJquery = (callback) ->
  loadScript '//code.jquery.com/jquery-3.1.1.min.js', callback

loadJquery ->
  $ ->
    $('body')
    .css 'padding-top', '44px'
    .prepend nav
    $('#hn_comment_filter-query').focus().keyup ->
      filterComments()

filterComments = () ->
  queries = $('#hn_comment_filter-query').val().split(',')
  .map (q) ->
    $.trim q
  .filter (q) ->
    q.length >= MIN_QUERY_LEN
  $('.hn_comment_filter-matched').each ->
    $(@).replaceWith @.childNodes
  items = $('.comment-tree .athing').each ->
    item = $(@)
    isMatched = true
    for q in queries
      comment = item.find('.comment')
      if comment.text().match(new RegExp q, 'i')
        comment.html (_, h) -> h.replace (new RegExp "(#{q})(?!([^<]+)?>)", 'gi'), "<span class='hn_comment_filter-matched' style='#{filterMatchedStyle}'>$1</span>"
      else
        isMatched = false
    if not isMatched
      item.hide()
    else
      item.show()
