import { addClass } from './utill';
import { removeClass } from './utill';

export function menuHandler() {
  const body = document.querySelector('body');
  const header = document.querySelector('.header');
  const headerMenu = document.querySelector('.header-menu');
  const mouseCursor = document.querySelector('.header-menu__cursor');
  const menuListWrap = document.querySelector('.header-menu__list');
  const menuItems = document.querySelectorAll('.header-menu__link');
  const menuBackgrounds = document.querySelectorAll('.header-menu__pic');
  const headerBarElem = document.querySelector('.header-scroll');
  const main = document.querySelector('.main');
  const visual = document.querySelector('.visual');
  let documentHeight;
  let visualBreakpoint;
  let windowInnerHeight;
  let maxScrollValue;
  let currentBackground;
  let cursorHandler;
  let menuOpenBtn;

  function headerScrollHandler() {
    function onResize() {
      windowInnerHeight = window.innerHeight;
      documentHeight = document.body.offsetHeight;
      maxScrollValue = documentHeight - windowInnerHeight;
      visualBreakpoint = visual.offsetHeight;
    }
  
    function headerProgress() {
      const scrollPer = scrollY / maxScrollValue;
      const currentScroll = scrollY + window.innerHeight;
      menuOpenBtn = document.querySelector('.header-menu__open');

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
  
      // if (currentScroll * 1.1 >= documentHeight) {
      //   scrollTopMoveBtn();
      // } else {
        
      // }
    }
  
    window.addEventListener('scroll', () => {
      headerProgress();
    });
    
  
    window.addEventListener('resize', onResize);
  
    onResize()
  }
  headerScrollHandler();

  function menuOpenedHandler() {
  
    function menuOpen(elem) {
      elem.setAttribute('aria-expanded', true);
      addClass(body, '-has-popup');
      addClass(headerMenu, '-opened');
      addClass(main, '-has-popup');
      removeClass(headerMenu, '-closed');
      linkMouseCursor();
    }
  
    function delayClass() {
      let start;
      function delay(time) {
        if (!start) start = time;
        const elapsed = time - start;
    
        if (elapsed >= 500) {
          removeClass(headerMenu, '-opened');
          removeClass(headerMenu, '-closed');
        } else {
          requestAnimationFrame(delay);
        }
      }
      requestAnimationFrame(delay);
    }
  
    function menuClosed() {
      removeClass(body, '-has-popup');
      if (menuOpenBtn) {
        menuOpenBtn.setAttribute('aria-expanded', false);
      }
  
      addClass(headerMenu, '-closed');
      delayClass();
  
      if (cursorHandler) {
        window.removeEventListener('mousemove', cursorHandler);
        cursorHandler = null;
      }
  
      removeClass(main, '-has-popup');
    }
  
    function menuOpenedControl(target, opacity, visibility, delay) {
      setTimeout(() => {
        target.style.opacity = opacity;
        target.style.visibility = visibility;
      }, delay);
    }
  
    function trapFocus() {
      const focusableElements = headerMenu.querySelectorAll('button, a, [tabindex]');
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];
  
      headerMenu.addEventListener('keydown', function(event) {
        const isTabPressed = (event.key === 'Tab' || event.keyCode === 9);
  
        if (!isTabPressed) return;
  
        if (event.shiftKey) { // Shift + Tab
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            event.preventDefault();
          }
        } else { // Tab
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            event.preventDefault();
          }
        }
      });
    }
  
    function delayLinkHandler(elem) {
      const url = elem.getAttribute('href');
      let start;
    
      function delayLink(time) {
        if (!start) start = time;
        const elapsed = time - start;
    
        if (elapsed >= 1100) {
          window.location.href = url;
        } else {
          requestAnimationFrame(delayLink);
        }
      }
      requestAnimationFrame(delayLink);
    }
  
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && headerMenu.classList.contains('-opened')) {
        menuOpenedControl(headerMenu, '0', 'hidden', 1200);
        menuClosed();
      }
    });
  
    header.addEventListener('click', (event) => {
      let target = event.target.closest('.header-menu__open, .header-menu__closed, .header-menu__link');
      
      if (!target) return;
      
      if (target.classList.contains('header-menu__closed')) {
        menuClosed();
        menuOpenedControl(headerMenu, '0', 'hidden', 1200);
      }
  
      if (target.classList.contains('header-menu__open')) {
        menuOpen(target);
        menuOpenBtn = target;
        menuOpenedControl(headerMenu, '1', 'visible', 0);
        trapFocus();
      }
  
      if (target.classList.contains('header-menu__link')) {
        console.log(target)
        event.preventDefault();
        menuClosed();
        delayLinkHandler(target);
      }
    });
  }
  menuOpenedHandler();

  function linkMouseCursor() {
    cursorHandler = function(event) {
      const cursorHalfWidth = mouseCursor.clientWidth / 2;
      const cursorHalfHeight = mouseCursor.clientHeight / 2;
  
      mouseCursor.style.transform = `
        translate(${event.clientX - cursorHalfWidth}px, ${event.clientY - cursorHalfHeight}px) 
      `;
    }
    headerMenu.addEventListener('mousemove', cursorHandler);
  }

  function linkMouseCursorClassHandler(action) {
    if (action === 'mouseover') {
      addClass(mouseCursor, '-grow');
    } else if (action === 'mouseout') {
      removeClass(mouseCursor, '-grow');
    }
  }

  function menuHoverHandler() {
    function addIndex(elem) {
      elem.forEach((elem, index) => {
        elem.dataset.index = index;
      })
    }
  
    function handlerMenuItem(event, action, currentBackground) {
      let target = event.target.closest('.header-menu__link');
  
      if (!target) return;
    
      if (target.classList.contains('header-menu__link')) {
        const index = target.dataset.index;
        const correspondingBackground = document.querySelector(`.header-menu__pic[data-index="${index}"]`);
        if (correspondingBackground) {
          if (action === 'mouseover' && currentBackground) {
            removeClass(currentBackground, '-visible');
          }
          if (action === 'mouseover') {
            addClass(correspondingBackground, '-visible');
          } else if (action === 'mouseout') {
            removeClass(currentBackground, '-visible');
          }
          return correspondingBackground;
        }
      }
      return null;
    }
  
    function menuActionHandler() {
      addIndex(menuItems);
      addIndex(menuBackgrounds);
  
      menuListWrap.addEventListener('mouseover', (event) => {
        currentBackground = handlerMenuItem(event, 'mouseover', currentBackground);
        linkMouseCursorClassHandler('mouseover');
      });
    
      menuListWrap.addEventListener('mouseout', (event) => {
        handlerMenuItem(event, 'mouseout', currentBackground);
        linkMouseCursorClassHandler('mouseout');
      });
    }
    menuActionHandler();
  }
  menuHoverHandler();
}
