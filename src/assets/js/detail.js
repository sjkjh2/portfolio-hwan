import { addClass } from './module/utill';
import { removeClass } from './module/utill';
import { refresh } from './module/utill';
import { scrollTop } from './module/scrollTop';
import { menuHandler } from './module/Header';
// import Mouse from './module/MouseCursor';
import { mouseHoverHandler } from './module/MouseCursor';
import { gsapScrollHandler } from './module/gsapAnimation';

refresh();
scrollTop();
menuHandler();
mouseHoverHandler();
gsapScrollHandler();

detailVisual();

function detailVisual() {
  const visualImg = document.querySelector('.visual__img');
  let windowInnerHeight
  let documentHeight;
  let maxScrollValue;
  let visualBreakpoint;

  function onResize() {
    windowInnerHeight = window.innerHeight;
    documentHeight = document.body.offsetHeight;
    maxScrollValue = documentHeight - windowInnerHeight;
    visualBreakpoint = document.querySelector('.visual').offsetHeight;
  }

  function visualGrow() {
    const scrollY = window.scrollY;
    const scrollPer = scrollY / maxScrollValue;
    const scaleValue = 1 + scrollPer;

    if (scrollY <= visualBreakpoint) {
      visualImg.style.transform = `translate3d(-50%, -50%, 0) scale(${scaleValue})`;
    }
  }

  window.addEventListener('scroll', visualGrow);
  window.addEventListener('resize', onResize);

  onResize();
}