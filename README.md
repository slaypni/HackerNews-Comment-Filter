Hacker News Comment Filter
==========================

This bookmarklet enables HN comment pages to filter comments based on queries.
It can be also used for threads such as "Ask HN: Who is hiring?".

In order to use this, copy the following code and enter it into the browser address bar while opening HN comment page.
```
javascript:(function(){var s=document.createElement('script');s.src='https://cdn.rawgit.com/slaypni/HackerNews-Comment-Filter/master/filter.js';(document.getElementsByTagName('head')[0]||document.body).appendChild(s);})();
```