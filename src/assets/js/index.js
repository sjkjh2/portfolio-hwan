import { addClass } from './module/utill';
import { removeClass } from './module/utill';
import { setupCopyText } from './module/utill';
import { refresh } from './module/utill';
import { topButtonHandler } from './module/moveUp';
import { menuHandler } from './module/Header';
import { gsapScrollHandler } from './module/gsapAnimation';
import { visualHandler } from './module/gsapAnimation';

setupCopyText();
refresh();
topButtonHandler();
menuHandler();
gsapScrollHandler();
visualHandler();

projectsHandler();
mainScrollHandler();

function projectsHandler() {
  const projectsWrap = document.querySelector('.projects');

  function linkHover(event, action) {
    let target = event.target.closest('.projects__link__tilt');

    if (!target) return;

    if (target.classList.contains('projects__link__tilt')) {
      if (action ==='mouseover') {
        addClass(target, '-active');
      } else if (action === 'mouseout') {
        removeClass(target, '-active');
      }
    }
  }

  projectsWrap.addEventListener('mouseover', (event) => {
    linkHover(event, 'mouseover');
  });

  projectsWrap.addEventListener('mouseout', (event) => {
    linkHover(event, 'mouseout');
  });
}

function mainScrollHandler() {
  const headerBarElem = document.querySelector('.header-scroll');
  const menuOpenBtn = document.querySelector('.header-menu__open')
  const visual = document.querySelector('.visual');
  let documentHeight;
  let visualBreakpoint;
  let windowInnerHeight;
  let maxScrollValue;

  function onResize() {
    windowInnerHeight = window.innerHeight;
    documentHeight = document.body.offsetHeight;
    maxScrollValue = documentHeight - windowInnerHeight;
    visualBreakpoint = visual.offsetHeight;
  }

  function headerProgress() {
    const scrollPer = scrollY / maxScrollValue;
    const currentScroll = scrollY + window.innerHeight;

    headerBarElem.style.height = scrollPer * 100 + '%';

    if (scrollY >= visualBreakpoint / 1.5) {
      addClass(headerBarElem, '-change');
    } else {
      removeClass(headerBarElem, '-change');
    }

    if (scrollY >= visualBreakpoint / 2) {
      addClass(menuOpenBtn, '-change');
    } else {
      removeClass(menuOpenBtn, '-change');
    }

    if (currentScroll * 1.1 >= documentHeight) {
      scrollTopMoveBtn();
    } else {
      
    }
  }

  window.addEventListener('scroll', () => {
    headerProgress();
  });
  

  window.addEventListener('resize', onResize);

  onResize()
}



