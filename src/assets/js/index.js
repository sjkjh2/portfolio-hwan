import { addClass } from './module/utill';
import { removeClass } from './module/utill';
import { setupCopyText } from './module/utill';
import { refresh } from './module/utill';
import { topButtonHandler } from './module/moveUp';
import { menuHandler } from './module/Header';
import { gsapScrollHandler } from './module/gsapAnimation';
import { mainVisualHandler } from './module/gsapAnimation';

setupCopyText();
refresh();
topButtonHandler();
menuHandler();
gsapScrollHandler();
mainVisualHandler();

projectsHandler();

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