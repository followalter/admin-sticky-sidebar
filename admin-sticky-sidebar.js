// makes the right sidebar on post.php sticky, if needed to the bottom ---------
function resizeHandler() {
  var sideEl = document.getElementById('side-sortables');
  var sidePosEl = document.getElementById('postbox-container-1');
  if (sideEl == null || sidePosEl == null) return;

  // get heights
  var sideHeight = sideEl.offsetHeight;
  var sideSpace = window.innerHeight - 50;
  var postBodyHeight = document.getElementById('post-body-content').offsetHeight;

  sidePosEl.style['margin-top'] = -postBodyHeight - 20 + 'px';

  // if the sidebar is larger than the available space
  if (sideHeight > sideSpace) {
    // console.log('bottom');

    // stick it to the bottom
    sidePosEl.style.top = sideSpace - sideHeight + 30 + 'px';
  } else {
    // console.log('top');

    // there is enough space, just let it stick to the top
    sidePosEl.style.top = '50px';
  }
}

// go back to previous scroll position if remaining on same post ---------------
function gotoPrevScroll() {
  var prev_scrollpos = localStorage.getItem('prev_scrollpos');
  var prev_url = localStorage.getItem('prev_url');

  // both vars exist and scrollpos is not 0
  if (prev_scrollpos && prev_url) {
    // if on same url as previously
    if (window.location.href == prev_url) {
      // scroll to previous position
      window.scrollTo(0, prev_scrollpos);
    }
  }
}

// listeners and callers
resizeHandler();

jQuery(window).on('resize', resizeHandler);

jQuery(window).load(function () {
  resizeHandler();
  new ResizeObserver(resizeHandler).observe(document.getElementById('side-sortables'));
  new ResizeObserver(resizeHandler).observe(document.getElementById('post-body-content'));

  gotoPrevScroll();
});

jQuery(window).on('beforeunload', function () {
  localStorage.setItem('prev_scrollpos', window.scrollY);
  localStorage.setItem('prev_url', window.location.href);
});
