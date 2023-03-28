// makes the right sidebar on post.php sticky, if needed to the bottom ---------
const assResizeHandler = () => {
  // console.log('assResizeHandler');

  let submitEl = document.getElementById('submitdiv');
  if (submitEl === null) return;

  document.body.classList.add('body--ass');

  // elements available?
  let sideEl = document.getElementById('side-sortables');
  let sidePosEl = document.getElementById('postbox-container-1');
  if (sideEl === null || sidePosEl === null) return;

  // get heights
  let sideHeight = sideEl.offsetHeight;
  let sideSpace = window.innerHeight - 50;

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
  let postBody = document.getElementById('post-body-content');
  if (postBody === null) {
    sidePosEl.style['margin-top'] = '0';
  } else {
    sidePosEl.style['margin-top'] = -postBody.offsetHeight - 20 + 'px';
  }
};

// go back to previous scroll position if remaining on same post ---------------
const assGotoPrevScroll = () => {
  let prevScrollpos = localStorage.getItem('prev_scrollpos');
  let prevUrl = localStorage.getItem('prev_url');

  // both vars exist and scrollpos is not 0
  if (prevScrollpos && prevUrl) {
    // if on same url as previously
    if (window.location.href == prevUrl) {
      // scroll to previous position
      window.scrollTo(0, prevScrollpos);
    }
  }
};

// listeners and callers
assResizeHandler();

jQuery(window).on('resize', assResizeHandler);

jQuery(window).on('load', () => {
  // console.log('load');

  assResizeHandler();
  assGotoPrevScroll();

  // add listener to sidebar size
  let sideEl = document.getElementById('side-sortables');
  if (sideEl !== null) new ResizeObserver(assResizeHandler).observe(sideEl);

  // add listener to body size
  let bodyEl = document.getElementById('post-body-content');
  if (bodyEl !== null) new ResizeObserver(assResizeHandler).observe(bodyEl);
});

jQuery(window).on('beforeunload', () => {
  localStorage.setItem('prev_scrollpos', window.scrollY);
  localStorage.setItem('prev_url', window.location.href);
});
