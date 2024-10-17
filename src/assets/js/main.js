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
import stackItems from './data/stackData';
import StackList from './module/stackList';


setupCopyText();
refresh();
scrollTop();
menuHandler();
gsapScrollHandler();
mainVisualHandler();
mouseHoverHandler();

projectsHandler();
detectDeviceType();
// stackDataPush();

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

// function insertStackItems(arr, ele) {
//   const itemsHTML = arr.map(item => 
//     `
//     <li class="stack__item">
//       <img class="stack__item-logo" src="${item.logo}" alt="${item.alt}">
//       <span class="stack__item-flag">${item.flag}</span>
//     </li>
//     `
//   ).join('');

//   ele.insertAdjacentHTML('beforeend', itemsHTML);
// }

// function stackDataPush() {
//   const stackForward = document.querySelector('.stack__list--forward');
//   const stackReverse = document.querySelector('.stack__list--reverse');

//   insertStackItems(stackItems.forward, stackForward);
//   insertStackItems(stackItems.reverse, stackReverse);
// }



const stackListForward = new StackList(stackItems.forward, '.stack__list--forward');
stackListForward.render();

const stackListReverse = new StackList(stackItems.forward, '.stack__list--reverse');
stackListReverse.render();