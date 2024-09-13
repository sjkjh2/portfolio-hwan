import MouseFollower from "mouse-follower";
import gsap from 'gsap';
import { addClass } from './utill';
import { removeClass } from './utill';


// export function mouseHandler() {
//   constructor() {
//     this.targetClassName = {
//       active: '.js-hover-active',
//       img: '.js-hover-img',
//       play: '.js-hover-play',
//       view: '.js-hover-view',
//       see: '.js-hover-see',
//       disable: '.js-hover-disable',
//     };
//     this.init();
//   }

//   init() {
//     MouseFollower.registerGSAP(gsap);

//     const cursor = new MouseFollower({
//       className: 'js-mouse',
//       innerClassName: 'js-mouse__inner',
//       mediaClassName: 'js-mouse__cursor',
//       mediaBoxClassName: 'js-mouse__img',
//       textClassName: 'js-mouse__txt',
//       speed: 0.5,
//       skewing: 0.8,
//       visible: true,
//       stateDetection: {
//         '-click': 'a, .portfolio-swiper__navi',
//         '-spotlight': this.targetClassName.active,
//         '-media': this.targetClassName.img,
//         '-play': this.targetClassName.play,
//         '-disable': this.targetClassName.disable,
//       },
//     });

//     if ('ontouchstart' in window) {
//       const wrap = document.querySelector('.wrap');

//       addClass(wrap, 'touchmode');
//     }

//     window.addEventListener('touchstart', () => {
//       cursor.addState('-touched');
//     });
//   }
  
//   function menuHoverHandler() {
//     const menuListWrap = document.querySelector('.header-menu__list');
//     const menuItems = document.querySelectorAll('.header-menu__link');
//     const menuBackgrounds = document.querySelectorAll('.header-menu__pic');
//     let currentBackground;
  
//     function addIndex(elem) {
//       elem.forEach((elem, index) => {
//         elem.dataset.index = index;
//       })
//     }
  
//     function handlerMenuItem(event, action, currentBackground) {
//       let target = event.target.closest('.header-menu__link');
//       if (!target) return;
    
//       const index = target.dataset.index;
//       const correspondingBackground = document.querySelector(`.header-menu__pic[data-index="${index}"]`);

//       if (correspondingBackground) {
//         if (action === 'mouseover' && currentBackground) {
//           removeClass(currentBackground, '-visible');
//         }
//         if (action === 'mouseover') {
//           correspondingBackground.classList.add('-visible');
//         } else if (action === 'mouseout') {
//           removeClass(currentBackground, '-visible');
//         }
//         return correspondingBackground;
//       }
//       return null;
//     }
  
//     function menuActionHandler = ()=> {
//       addIndex(menuItems);
//       addIndex(menuBackgrounds);
  
//       menuListWrap.addEventListener('mouseover', (event) => {
//         currentBackground = handlerMenuItem(event, 'mouseover', currentBackground);
//       });
    
//       menuListWrap.addEventListener('mouseout', (event) => {
//         handlerMenuItem(event, 'mouseout', currentBackground);
//       });
//     }
//     menuActionHandler();
//   }
//   menuHoverHandler();
// }


export default class Mouse {
  constructor() {
    this.targetClassName = {
      active: '.js-hover-active',
      img: '.js-hover-img',
      play: '.js-hover-play',
      view: '.js-hover-view',
      see: '.js-hover-see',
      disable: '.js-hover-disable',
    };
    this.init();
  }

  init() {
    MouseFollower.registerGSAP(gsap);

    const cursor = new MouseFollower({
      className: 'js-mouse',
      innerClassName: 'js-mouse__inner',
      mediaClassName: 'js-mouse__cursor',
      mediaBoxClassName: 'js-mouse__img',
      textClassName: 'js-mouse__txt',
      speed: 0.5,
      skewing: 0.8,
      visible: true,
      stateDetection: {
        '-click': 'a, .portfolio-swiper__navi',
        '-spotlight': this.targetClassName.active,
        '-media': this.targetClassName.img,
        '-play': this.targetClassName.play,
        '-disable': this.targetClassName.disable,
      },
    });

    if ('ontouchstart' in window) {
      document.querySelector('.wrap').classList.add('touchmode');
    }

    window.addEventListener('touchstart', () => {
      cursor.addState('-touched');
    });
  }
}

// function mouseHoverHandler() {
//   const menuListWrap = document.querySelector('.header-menu__list');
//   const menuItems = document.querySelectorAll('.header-menu__link');
//   const menuBackgrounds = document.querySelectorAll('.header-menu__pic');
//   let currentBackground;

//   const addIndex = (elems) => {
//     elems.forEach((elem, index) => {
//       elem.dataset.index = index;
//     });
//   };

//   const handlerMenuItem = (event, action) => {
//     const target = event.target.closest('.header-menu__link');
//     if (!target) return null;
  
//     const index = target.dataset.index;
//     const correspondingBackground = document.querySelector(`.header-menu__pic[data-index="${index}"]`);
  
//     if (correspondingBackground) {
//       if (action === 'mouseover' && currentBackground) {
//         currentBackground.classList.remove('-visible');
//       }
//       if (action === 'mouseover') {
//         correspondingBackground.classList.add('-visible');
//       } else if (action === 'mouseout') {
//         currentBackground.classList.remove('-visible');
//       }
//       return correspondingBackground;
//     }
//     return null;
//   };

//   const menuActionHandler = () => {
//     addIndex(menuItems);
//     addIndex(menuBackgrounds);

//     menuListWrap.addEventListener('mouseover', (event) => {
//       currentBackground = handlerMenuItem(event, 'mouseover');
//     });
  
//     menuListWrap.addEventListener('mouseout', (event) => {
//       handlerMenuItem(event, 'mouseout');
//     });
//   };
  
//   menuActionHandler();
// }
