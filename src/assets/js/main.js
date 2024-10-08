import { addClass } from './module/utill';
import { removeClass } from './module/utill';
import { setupCopyText } from './module/utill';
import { refresh } from './module/utill';
import { scrollTop } from './module/scrollTop';
import { menuHandler } from './module/Header';
// import Mouse from './module/MouseCursor';
import { mouseHoverHandler } from './module/MouseCursor';
import { gsapScrollHandler } from './module/gsapAnimation';
import { mainVisualHandler } from './module/gsapAnimation';

setupCopyText();
refresh();
scrollTop();
menuHandler();
gsapScrollHandler();
mainVisualHandler();
mouseHoverHandler();

projectsHandler();
detectDeviceType();

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

function detectDeviceType() {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const visualInfo = document.querySelector('.visual__more-txt--info');
  
  if (isTouch && isMobile) {
    visualInfo.innerHTML = '화면을 터치해 보세요';
    // return 'Mobile/Tablet';
  } else {
    visualInfo.innerHTML = '마우스를 움직여 보세요';
    // return 'PC';
  }
}

// const mouse = new Mouse();