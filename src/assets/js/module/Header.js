import { addClass } from './utill';
import { removeClass } from './utill';

export function menuHandler() {
  const body = document.querySelector('body');
  const header = document.querySelector('.header');
  const logo = document.querySelector('.header-logo');
  const headerMenu = document.querySelector('.header-menu');
  // const mouseCursor = document.querySelector('.header-menu__cursor');
  const headerBarElem = document.querySelector('.header-scroll');
  const main = document.querySelector('.main');
  const visual = document.querySelector('.visual');
  let documentHeight;
  let visualBreakpoint;
  let windowInnerWidth;
  let windowInnerHeight;
  let maxScrollValue;
  // let cursorHandler;
  let menuOpenBtn;
  let menuOpenBtnOffsetTop;
  let logoOffsetTop;
  let headerOffsetHeight;

  console.log(window.innerWidth);

  function headerScrollHandler() {
    menuOpenBtn = document.querySelector('.header-menu__open');
    let prevWindowWidth = window.innerWidth;

    function onResize() {
      // 현재 창 크기와 문서 높이 등 필요한 값 업데이트
      windowInnerWidth = window.innerWidth;
      windowInnerHeight = window.innerHeight;
      documentHeight = document.body.offsetHeight;
      maxScrollValue = documentHeight - windowInnerHeight;
      visualBreakpoint = visual.offsetHeight;
      menuOpenBtnOffsetTop = menuOpenBtn.offsetTop;
      logoOffsetTop = logo.offsetTop;
      headerOffsetHeight = header.offsetHeight;
  
      // 1200px 이상에서 이하로, 혹은 이하에서 이상으로 변경 시 값 리셋
      if ((prevWindowWidth > 1200 && windowInnerWidth <= 1200) || (prevWindowWidth <= 1200 && windowInnerWidth > 1200)) {
        headerBarElem.style.height = '';
        headerBarElem.style.width = '';
        removeClass(headerBarElem, '-change');
        removeClass(menuOpenBtn, '-change');
        removeClass(logo, '-change');
        removeClass(header, '-change');
      }
  
      prevWindowWidth = windowInnerWidth; // 현재 창 너비 저장
    }
  
    function headerProgress() {
      const scrollPer = scrollY / maxScrollValue;
  
      if (windowInnerWidth > 1200) {
        headerBarElem.style.height = scrollPer * 100 + '%';
  
        if (scrollY >= visualBreakpoint / 1.2) {
          addClass(headerBarElem, '-change');
        } else {
          removeClass(headerBarElem, '-change');
        }
  
        if (scrollY >= visualBreakpoint - menuOpenBtnOffsetTop) {
          addClass(menuOpenBtn, '-change');
        } else {
          removeClass(menuOpenBtn, '-change');
        }
  
        if (scrollY >= visualBreakpoint - logoOffsetTop) {
          addClass(logo, '-change');
        } else {
          removeClass(logo, '-change');
        }
      } else {
        headerBarElem.style.width = scrollPer * 100 + '%';
  
        if (scrollY >= 1) {
          addClass(header, '-change');
        } else {
          removeClass(header, '-change');
        }
      }
    }
  
    // 스크롤 이벤트와 리사이즈 이벤트 리스너 추가
    window.addEventListener('scroll', headerProgress);
    window.addEventListener('resize', onResize);
  
    onResize(); // 초기화 시 호출
  }
  headerScrollHandler();

  function menuOpenedHandler() {
  
    function menuOpen(elem) {
      elem.setAttribute('aria-expanded', true);
      addClass(body, '-has-popup');
      addClass(headerMenu, '-opened');
      addClass(main, '-has-popup');
      removeClass(headerMenu, '-closed');
      // linkMouseCursor();
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
  
      // if (cursorHandler) {
      //   window.removeEventListener('mousemove', cursorHandler);
      //   cursorHandler = null;
      // }
  
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
      
      setTimeout(() => {
        window.location.href = url;
      }, 1100);
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

  // function linkMouseCursor() {
  //   cursorHandler = function(event) {
  //     const cursorHalfWidth = mouseCursor.clientWidth / 2;
  //     const cursorHalfHeight = mouseCursor.clientHeight / 2;
  
  //     mouseCursor.style.transform = `
  //       translate(${event.clientX - cursorHalfWidth}px, ${event.clientY - cursorHalfHeight}px) 
  //     `;
  //   }
  //   headerMenu.addEventListener('mousemove', cursorHandler);
  // }

  // function linkMouseCursorClassHandler(action) {
  //   if (action === 'mouseover') {
  //     addClass(mouseCursor, '-grow');
  //   } else if (action === 'mouseout') {
  //     removeClass(mouseCursor, '-grow');
  //   }
  // }

  
}
