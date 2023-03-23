// makes the right sidebar on post.php sticky, if needed to the bottom ---------
function assResizeHandler() {
  // console.log('assResizeHandler');

  var submitEl = document.getElementById('submitdiv');
  if (submitEl === null) return;

  // elements available?
  var sideEl = document.getElementById('side-sortables');
  var sidePosEl = document.getElementById('postbox-container-1');
  if (sideEl === null || sidePosEl === null) return;

  // get heights
  var sideHeight = sideEl.offsetHeight;
  var sideSpace = window.innerHeight - 50;

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

  // also set margin top in case of weird elements oreder
  var postBody = document.getElementById('post-body-content');
  if (postBody === null) {
    sidePosEl.style['margin-top'] = '0';
  } else {
    sidePosEl.style['margin-top'] = -postBody.offsetHeight - 20 + 'px';
  }
}

// go back to previous scroll position if remaining on same post ---------------
function assGotoPrevScroll() {
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
assResizeHandler();

jQuery(window).on('resize', assResizeHandler);

jQuery(window).load(function () {
  // console.log('load');

  assResizeHandler();
  assGotoPrevScroll();

  // add listener to sidebar size
  var sideEl = document.getElementById('side-sortables');
  if (sideEl !== null) new ResizeObserver(assResizeHandler).observe(sideEl);

  // add listener to body size
  var bodyEl = document.getElementById('post-body-content');
  if (bodyEl !== null) new ResizeObserver(assResizeHandler).observe(bodyEl);
});

jQuery(window).on('beforeunload', function () {
  localStorage.setItem('prev_scrollpos', window.scrollY);
  localStorage.setItem('prev_url', window.location.href);
});
